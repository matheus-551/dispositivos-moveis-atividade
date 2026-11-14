import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from '../components/Button';
import Field from '../components/Field';
import { auth } from '../services/firebase';
import { sharedStyles } from '../styles';

export default function AuthScreen({
  register,
  form,
  busy,
  message,
  onChangeField,
  onSubmit,
  onToggleRegister,
  onBackToLogin,
}) {
  const alert = auth ? message : 'Configure o Firebase no arquivo .env.';

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          {register && (
            <Pressable accessibilityRole="button" onPress={onBackToLogin}>
              <Text style={styles.back}>‹ Voltar ao login</Text>
            </Pressable>
          )}
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>▧</Text>
          </View>
          <Text style={styles.hero}>{register ? 'Criar nova conta' : 'Galeria de Imagens'}</Text>
          <Text style={sharedStyles.subtitle}>
            {register ? 'Preencha os dados para se cadastrar.' : 'Firebase + Cloudinary'}
          </Text>
          <View style={styles.card}>
            {!register && (
              <>
                <Text style={sharedStyles.title}>Entrar na sua conta</Text>
                <Text style={sharedStyles.description}>
                  Acesse para visualizar suas imagens no Cloudinary.
                </Text>
              </>
            )}
            {!!alert && (
              <Text accessibilityRole="alert" style={sharedStyles.message}>
                {alert}
              </Text>
            )}
            {register && (
              <Field
                label="Nome completo"
                value={form.name}
                onChangeText={(value) => onChangeField('name', value)}
                autoCapitalize="words"
              />
            )}
            <Field
              label="E-mail"
              value={form.email}
              onChangeText={(value) => onChangeField('email', value)}
              keyboardType="email-address"
              autoComplete="email"
            />
            <Field
              label="Senha"
              password
              value={form.password}
              onChangeText={(value) => onChangeField('password', value)}
            />
            {register && (
              <Field
                label="Confirmar senha"
                password
                value={form.confirm}
                onChangeText={(value) => onChangeField('confirm', value)}
              />
            )}
            <Button
              title={register ? 'Cadastrar' : 'Entrar'}
              busy={busy}
              disabled={!auth}
              onPress={onSubmit}
            />
            <Text style={styles.divider}>{register ? 'Já tem uma conta?' : 'Não tem uma conta?'}</Text>
            <Button
              title={register ? 'Fazer login' : 'Cadastrar'}
              outline
              disabled={busy}
              onPress={onToggleRegister}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 22 },
  container: { maxWidth: 460, width: '100%', alignSelf: 'center' },
  logo: {
    alignSelf: 'center',
    backgroundColor: '#165DFF',
    width: 100,
    height: 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIcon: { color: 'white', fontSize: 60 },
  hero: { fontSize: 29, fontWeight: '800', textAlign: 'center', color: '#0A1022' },
  card: { backgroundColor: 'white', padding: 24, borderRadius: 24 },
  divider: { textAlign: 'center', marginVertical: 18, color: '#536687' },
  back: { color: '#165DFF', marginBottom: 24, fontSize: 17 },
});
