import { useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import useAuth from '../hooks/useAuth';
import AuthScreen from './AuthScreen';
import GalleryScreen from './GalleryScreen';

const emptyForm = { name: '', email: '', password: '', confirm: '' };

export default function HomeScreen() {
  const { user, starting, busy, message, setMessage, submit, logout } = useAuth();
  const [register, setRegister] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function clearPasswords() {
    setForm((current) => ({ ...current, password: '', confirm: '' }));
  }

  function toggleRegister() {
    setRegister((current) => !current);
    setMessage('');
    clearPasswords();
  }

  function backToLogin() {
    setRegister(false);
    setMessage('');
  }

  async function submitForm() {
    if (await submit({ ...form, register })) {
      clearPasswords();
    }
  }

  async function logoutUser() {
    if (await logout()) {
      setRegister(false);
    }
  }

  if (starting) {
    return <ActivityIndicator style={styles.loading} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.page, user && styles.galleryPage]}>
        {user ? (
          <GalleryScreen
            key={user.uid}
            user={user}
            message={message}
            setMessage={setMessage}
            onLogout={logoutUser}
          />
        ) : (
          <AuthScreen
            register={register}
            form={form}
            busy={busy}
            message={message}
            onChangeField={updateField}
            onSubmit={submitForm}
            onToggleRegister={toggleRegister}
            onBackToLogin={backToLogin}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1 },
  page: { flex: 1, backgroundColor: '#EFF5FF' },
  galleryPage: { backgroundColor: '#165DFF' },
});
