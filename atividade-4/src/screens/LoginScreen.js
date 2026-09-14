import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../services/firebase';
import { styles, colors } from '../styles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Informe e-mail e senha.');
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        senha
      );

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
    } catch (error) {
      let mensagem = 'Não foi possível realizar o login.';

      if (error.code === 'auth/invalid-credential') {
        mensagem = 'E-mail ou senha inválidos.';
      }

      if (error.code === 'auth/user-not-found') {
        mensagem = 'Usuário não encontrado.';
      }

      Alert.alert('Erro', mensagem);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 30 }}>👤</Text>
          </View>

          <Text style={styles.title}>Bem-vindo de volta!</Text>

          <Text style={styles.subtitle}>
            Faça login para acessar seus contatos.
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{ alignItems: 'center', marginTop: 15 }}
        >
          <Text>
            Não tem uma conta?{' '}
            <Text style={styles.link}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
