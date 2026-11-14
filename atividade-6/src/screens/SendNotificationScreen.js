import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { listUsers } from '../api/users';
import { sendPush } from '../services/notifications';
import useSession from '../hooks/useSession';
import Button from '../components/Button';
import Field from '../components/Field';
import Notice from '../components/Notice';
import Page from '../components/Page';
import UserPicker from '../components/UserPicker';
import { styles } from '../styles';
import { isValidPushToken } from '../utils/pushToken';

export default function SendNotificationScreen() {
  const { user, setUser } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  async function load() {
    setLoading(true);
    setLoadError('');
    try {
      setUsers(await listUsers());
      setSelected(null);
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    if (user)
      listUsers()
        .then((data) => {
          if (active) setUsers(data);
        })
        .catch((error) => {
          if (active) setLoadError(error.message);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    return () => {
      active = false;
    };
  }, [user]);
  if (!user) return <Redirect href="/login" />;

  async function submit() {
    setSuccess(false);
    setMessage('');
    if (!selected || !title.trim() || !body.trim())
      return setMessage('Selecione um usuário e preencha título e mensagem.');
    setBusy(true);
    try {
      await sendPush(selected.token, title.trim(), body.trim());
      setSuccess(true);
      setMessage(
        'Notificação aceita pelo Expo para envio. A entrega depende do dispositivo e das credenciais.',
      );
      setTitle('');
      setBody('');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Page>
      <View style={[styles.row, { marginBottom: 28 }]}>
        <Feather name="bell" size={24} color="#1468ef" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 21, fontWeight: '700' }}>Enviar Notificação</Text>
          <Text style={styles.muted}>Envie uma notificação push para um usuário</Text>
        </View>
        <Pressable
          disabled={busy}
          accessibilityLabel="Sair da conta"
          onPress={() => {
            setUser(null);
            router.replace('/login');
          }}
        >
          <Feather name="log-out" size={22} color="#687386" />
        </Pressable>
      </View>
      <Notice text={user.warning} />
      <View style={[styles.row, { marginBottom: 10 }]}>
        <Text style={styles.label}>Selecionar usuário</Text>
        <Pressable onPress={load} disabled={loading || busy}>
          <Text style={styles.link}>Atualizar</Text>
        </Pressable>
      </View>
      {loading ? (
        <ActivityIndicator color="#1468ef" />
      ) : (
        <>
          <Notice text={loadError} />
          {!loadError && users.length === 0 && (
            <Text style={styles.muted}>Nenhum usuário cadastrado.</Text>
          )}
          <UserPicker
            users={users}
            selected={selected}
            onSelect={setSelected}
            open={open}
            setOpen={setOpen}
          />
        </>
      )}
      <View style={{ height: 20 }} />
      <Field
        label="Título"
        icon="type"
        placeholder="Digite o título da notificação"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />
      <Field
        label="Mensagem"
        icon="message-circle"
        placeholder="Digite a mensagem da notificação"
        value={body}
        onChangeText={setBody}
        multiline
        maxLength={200}
      />
      <Text style={[styles.muted, { textAlign: 'right' }]}>{body.length}/200</Text>
      <View style={styles.info}>
        <Text style={{ color: '#3867a5', fontSize: 12 }}>
          ⓘ{'  '}O token do usuário selecionado será usado automaticamente
        </Text>
      </View>
      <Notice text={message} success={success} />
      <Button
        title="➤  Enviar notificação"
        onPress={submit}
        busy={busy}
        disabled={loading || !!loadError || !selected || !isValidPushToken(selected.token)}
      />
      <Text style={[styles.muted, { marginTop: 20, textAlign: 'center' }]}>
        Conectado como {user.nome}
      </Text>
    </Page>
  );
}
