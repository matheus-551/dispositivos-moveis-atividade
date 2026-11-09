import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { register } from '../api';
import { getPushToken } from '../notifications';
import { Page, Heading, Field, Button, Notice, s } from '../ui';
export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState(''), [email, setEmail] = useState(''), [senha, setSenha] = useState('');
  const [token, setToken] = useState(''), [tokenError, setTokenError] = useState(''), [getting, setGetting] = useState(true), [busy, setBusy] = useState(false), [error, setError] = useState('');
  async function capture() { setGetting(true); setTokenError(''); try { setToken(await getPushToken()); } catch (e) { setTokenError(e.message); } finally { setGetting(false); } }
  useEffect(() => {
    let active = true;
    getPushToken().then(value => { if (active) setToken(value); }).catch(e => { if (active) setTokenError(e.message); }).finally(() => { if (active) setGetting(false); });
    return () => { active = false; };
  }, []);
  async function submit() {
    setError('');
    if (!nome.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || senha.length < 6) return setError('Preencha o nome, um e-mail válido e uma senha com pelo menos 6 caracteres.');
    if (!token) return setError('Capture o token do aparelho antes de cadastrar.');
    setBusy(true);
    try { await register({ nome: nome.trim(), email: email.trim().toLowerCase(), senha, token }); router.replace({ pathname: '/login', params: { cadastrado: '1' } }); } catch (e) { setError(e.message); } finally { setBusy(false); }
  }
  return <Page><Heading title="Cadastro" subtitle="Crie sua conta para começar" /><Field label="Nome" icon="user" placeholder="Digite seu nome" value={nome} onChangeText={setNome} autoComplete="name" /><Field label="E-mail" icon="mail" placeholder="Digite seu e-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoComplete="email" /><Field label="Senha" icon="lock" placeholder="Digite sua senha" value={senha} onChangeText={setSenha} password autoComplete="new-password" /><Field label="Token do aparelho" icon="smartphone" placeholder={getting ? 'Obtendo token…' : 'Token indisponível'} value={token} editable={false} /><Text style={s.muted}>Token capturado automaticamente do seu dispositivo.</Text><Notice text={tokenError} />{!token && <Pressable onPress={capture} disabled={getting}><Text style={[s.link, { marginVertical: 12 }]}>Tentar obter token novamente</Text></Pressable>}<Notice text={error} /><Button title="Cadastrar" onPress={submit} busy={busy} disabled={getting || !token} /><View style={s.footer}><Text style={s.muted}>Já tem conta?</Text><Link href="/login" style={s.link}>Entrar</Link></View></Page>;
}
