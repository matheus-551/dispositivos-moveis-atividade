import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const config = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};
export const auth = Object.values(config).every(Boolean) ? initializeAuth(initializeApp(config), { persistence: getReactNativePersistence(AsyncStorage) }) : null;
export function errorMessage(e) {
  return ({'auth/invalid-credential':'E-mail ou senha inválidos.', 'auth/email-already-in-use':'E-mail já cadastrado.', 'auth/weak-password':'Use pelo menos 6 caracteres.', 'auth/invalid-email':'E-mail inválido.', 'auth/network-request-failed':'Verifique sua conexão.'})[e.code] || 'Não foi possível concluir. Tente novamente.';
}
