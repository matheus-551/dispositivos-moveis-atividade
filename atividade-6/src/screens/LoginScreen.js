import { useState } from 'react';
import { Text, View } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { login, updateToken } from '../api/users';
import { getPushToken } from '../services/notifications';
import useSession from '../hooks/useSession';
import Button from '../components/Button';
import Field from '../components/Field';
import Heading from '../components/Heading';
import Notice from '../components/Notice';
import Page from '../components/Page';
import { styles } from '../styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { cadastrado } = useLocalSearchParams();
  const { setUser } = useSession();

  async function submit() {
    if (!email.trim() || !senha) return setError('Informe o e-mail e a senha.');
    setBusy(true);
    setError('');
    try {
      const user = await login(email.trim().toLowerCase(), senha);
      let warning = '';
      try {
        const token = await getPushToken();
        await updateToken(user.email, token);
        user.token = token;
      } catch (error) {
        warning = `Login realizado. O token não foi atualizado: ${error.message}`;
      }
      setUser({ ...user, warning });
      router.replace('/enviar');
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Page>
      <Heading title="Login" subtitle="Acesse sua conta" />
      <Notice
        text={cadastrado ? 'Cadastro realizado! Entre com seu e-mail e senha.' : ''}
        success
      />
      <Field
        label="E-mail"
        icon="mail"
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />
      <Field
        label="Senha"
        icon="lock"
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        password
        autoComplete="current-password"
      />
      <Notice text={error} />
      <Button title="Entrar" onPress={submit} busy={busy} />
      <View style={styles.footer}>
        <Text style={styles.muted}>Não tem uma conta?</Text>
        <Link href="/" style={styles.link}>
          Criar conta
        </Link>
      </View>
    </Page>
  );
}
