import { useState } from 'react';
import { Text, View } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { login, updateToken } from '../api';
import { getPushToken } from '../notifications';
import { useSession } from '../session';
import { Page, Heading, Field, Button, Notice, s } from '../ui';
export default function Login() {
  const [email, setEmail] = useState(''), [senha, setSenha] = useState(''), [busy, setBusy] = useState(false), [error, setError] = useState('');
  const router = useRouter(), { cadastrado } = useLocalSearchParams(), { setUser } = useSession();
  async function submit() {
    if (!email.trim() || !senha) return setError('Informe o e-mail e a senha.');
    setBusy(true); setError('');
    try {
      const user = await login(email.trim().toLowerCase(), senha);
      let warning = '';
      try { const token = await getPushToken(); await updateToken(user.email, token); user.token = token; } catch (e) { warning = `Login realizado. O token não foi atualizado: ${e.message}`; }
      setUser({ ...user, warning }); router.replace('/enviar');
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }
  return <Page><Heading title="Login" subtitle="Acesse sua conta" /><Notice text={cadastrado ? 'Cadastro realizado! Entre com seu e-mail e senha.' : ''} success /><Field label="E-mail" icon="mail" placeholder="Digite seu e-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoComplete="email" /><Field label="Senha" icon="lock" placeholder="Digite sua senha" value={senha} onChangeText={setSenha} password autoComplete="current-password" /><Notice text={error} /><Button title="Entrar" onPress={submit} busy={busy} /><View style={s.footer}><Text style={s.muted}>Não tem uma conta?</Text><Link href="/" style={s.link}>Criar conta</Link></View></Page>;
}
