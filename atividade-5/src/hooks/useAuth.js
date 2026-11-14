import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '../services/firebase';
import { getAuthErrorMessage } from '../utils/authErrors';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [starting, setStarting] = useState(Boolean(auth));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!auth) {
      return;
    }

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setStarting(false);
    });
  }, []);

  async function submit({ register, name, email, password, confirm }) {
    setMessage('');

    if (!email.trim() || !password || (register && (!name.trim() || !confirm))) {
      setMessage('Preencha todos os campos.');
      return false;
    }

    if (register && password !== confirm) {
      setMessage('As senhas não são iguais.');
      return false;
    }

    if (register && password.length < 6) {
      setMessage('Use pelo menos 6 caracteres na senha.');
      return false;
    }

    setBusy(true);
    let created = false;

    try {
      if (register) {
        const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
        created = true;
        await updateProfile(result.user, { displayName: name.trim() });
        setMessage('Conta criada com sucesso!');
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }

      return true;
    } catch (error) {
      setMessage(
        created
          ? 'Conta criada, mas não foi possível salvar o nome.'
          : getAuthErrorMessage(error),
      );
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      setMessage('');
      return true;
    } catch {
      setMessage('Não foi possível sair.');
      return false;
    }
  }

  return { user, starting, busy, message, setMessage, submit, logout };
}
