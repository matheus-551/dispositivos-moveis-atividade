import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000',
  timeout: 10000,
});

export async function listarContatos(userId) {
  const response = await api.get('/contatos', {
    params: {
      userId,
    },
  });

  return response.data;
}

export async function buscarContato(id) {
  const response = await api.get(`/contatos/${id}`);

  return response.data;
}

export async function criarContato(contato) {
  const response = await api.post('/contatos', contato);

  return response.data;
}

export async function atualizarContato(id, contato) {
  const response = await api.put(`/contatos/${id}`, contato);

  return response.data;
}

export async function excluirContato(id) {
  const response = await api.delete(`/contatos/${id}`);

  return response.data;
}
