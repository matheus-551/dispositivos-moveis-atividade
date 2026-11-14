import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

import { firebaseApp } from './firebaseConfig';

export const auth = firebaseApp
  ? initializeAuth(firebaseApp, { persistence: getReactNativePersistence(AsyncStorage) })
  : null;
