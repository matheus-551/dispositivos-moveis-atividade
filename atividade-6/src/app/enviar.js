import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { listUsers } from '../api';
import { sendPush, validToken } from '../notifications';
import { useSession } from '../session';
import { Page, Field, Button, Notice, s } from '../ui';
export default function Enviar() {
  const { user, setUser } = useSession(), router = useRouter();
  const [users, setUsers] = useState([]), [selected, setSelected] = useState(null), [open, setOpen] = useState(false), [loading, setLoading] = useState(true), [loadError, setLoadError] = useState('');
  const [title, setTitle] = useState(''), [body, setBody] = useState(''), [busy, setBusy] = useState(false), [message, setMessage] = useState(''), [success, setSuccess] = useState(false);
  async function load() { setLoading(true); setLoadError(''); try { setUsers(await listUsers()); setSelected(null); } catch (e) { setLoadError(e.message); } finally { setLoading(false); } }
  useEffect(() => {
    let active = true;
    if (user) listUsers().then(data => { if (active) setUsers(data); }).catch(e => { if (active) setLoadError(e.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [user]);
  if (!user) return <Redirect href="/login" />;
  async function submit() {
    setSuccess(false); setMessage('');
    if (!selected || !title.trim() || !body.trim()) return setMessage('Selecione um usuário e preencha título e mensagem.');
    setBusy(true);
    try { await sendPush(selected.token, title.trim(), body.trim()); setSuccess(true); setMessage('Notificação aceita pelo Expo para envio. A entrega depende do dispositivo e das credenciais.'); setTitle(''); setBody(''); } catch (e) { setMessage(e.message); } finally { setBusy(false); }
  }
  return <Page><View style={[s.row, { marginBottom: 28 }]}><Feather name="bell" size={24} color="#1468ef" /><View style={{ flex: 1 }}><Text style={{ fontSize: 21, fontWeight: '700' }}>Enviar Notificação</Text><Text style={s.muted}>Envie uma notificação push para um usuário</Text></View><Pressable disabled={busy} accessibilityLabel="Sair da conta" onPress={() => { setUser(null); router.replace('/login'); }}><Feather name="log-out" size={22} color="#687386" /></Pressable></View><Notice text={user.warning} /><View style={[s.row, { marginBottom: 10 }]}><Text style={s.label}>Selecionar usuário</Text><Pressable onPress={load} disabled={loading || busy}><Text style={s.link}>Atualizar</Text></Pressable></View>{loading ? <ActivityIndicator color="#1468ef" /> : <><Notice text={loadError} />{!loadError && users.length === 0 && <Text style={s.muted}>Nenhum usuário cadastrado.</Text>}<Pressable accessibilityRole="button" accessibilityLabel="Selecionar usuário" accessibilityState={{ expanded: open }} style={s.inputRow} onPress={() => setOpen(!open)}><Feather name="user" size={18} color="#788295" /><Text style={[s.muted, { flex: 1 }]}>{selected?.nome || 'Escolha um usuário'}</Text><Feather name={open ? 'chevron-up' : 'chevron-down'} size={18} color="#788295" /></Pressable>{open && <ScrollView style={{ maxHeight: 220, borderWidth: 1, borderColor: '#dce1e9', backgroundColor: 'white', borderRadius: 8 }} nestedScrollEnabled>{users.map((item, index) => <Pressable key={`${item.email}-${index}`} style={s.option} onPress={() => { setSelected(item); setOpen(false); }}><Text>{item.nome}</Text><Text style={s.muted}>{item.email}{!validToken(item.token) ? ' · sem token válido' : ''}</Text></Pressable>)}</ScrollView>}</>}<View style={{ height: 20 }} /><Field label="Título" icon="type" placeholder="Digite o título da notificação" value={title} onChangeText={setTitle} maxLength={100} /><Field label="Mensagem" icon="message-circle" placeholder="Digite a mensagem da notificação" value={body} onChangeText={setBody} multiline maxLength={200} /><Text style={[s.muted, { textAlign: 'right' }]}>{body.length}/200</Text><View style={s.info}><Text style={{ color: '#3867a5', fontSize: 12 }}>ⓘ  O token do usuário selecionado será usado automaticamente</Text></View><Notice text={message} success={success} /><Button title="➤  Enviar notificação" onPress={submit} busy={busy} disabled={loading || !!loadError || !selected || !validToken(selected.token)} /><Text style={[s.muted, { marginTop: 20, textAlign: 'center' }]}>Conectado como {user.nome}</Text></Page>;
}
