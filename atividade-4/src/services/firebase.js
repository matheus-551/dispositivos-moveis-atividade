import { Platform } from 'react-native';
import { initializeApp, getApps, getApp } from 'firebase/app';

import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCUxl9qa4s_QghPNZ7pTpJ1VNV73TkEJS4',
  authDomain: 'atividade-04-b3b09.firebaseapp.com',
  projectId: 'atividade-04-b3b09',
  storageBucket: 'atividade-04-b3b09.firebasestorage.app',
  messagingSenderId: '668152171786',
  appId: '1:668152171786:web:37f33c43cb6f0353813ef3',
  measurementId: "G-E70G7VSG6S"
};

const app = getApps().length 
  ? getApp() 
  : initializeApp(firebaseConfig); 
    
export const auth = Platform.OS === 'web' 
  ? getAuth(app) 
  : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage), });
