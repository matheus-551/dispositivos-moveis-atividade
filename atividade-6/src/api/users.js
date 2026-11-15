import { supabaseKey, supabaseUrl } from '../config/supabase';

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/usuario${path}`, {
      ...options,
      signal: controller.signal,
      headers: { apikey: supabaseKey, 'Content-Type': 'application/json', ...options.headers },
    });
    const body = await response.text();
    let data;
    try {
      data = body ? JSON.parse(body) : null;
    } catch {
      throw new Error('Resposta inválida do servidor.');
    }
    if (!response.ok) {
      if (data?.code === '23505') throw new Error('Este e-mail já está cadastrado.');
      throw new Error(data?.message || `Falha na API (${response.status}).`);
    }
    return data;
  } catch (error) {
    if (error.name === 'AbortError')
      throw new Error('O servidor demorou a responder. Tente novamente.');
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function login(email, senha) {
  const query = new URLSearchParams({
    select: 'nome,email,token',
    email: `eq.${email}`,
    senha: `eq.${senha}`,
    limit: '1',
  });
  const users = await request(`?${query}`);
  if (!users?.length) throw new Error('E-mail ou senha incorretos.');
  return users[0];
}
export const register = (user) => request('', { method: 'POST', body: JSON.stringify(user) });
export const listUsers = () => request('?select=nome,email,token&order=nome.asc');
export const updateToken = (email, token) =>
  request(`?${new URLSearchParams({ email: `eq.${email}` })}`, {
    method: 'PATCH',
    body: JSON.stringify({ token }),
  });
