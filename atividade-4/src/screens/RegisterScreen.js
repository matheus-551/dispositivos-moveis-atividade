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
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../services/firebase';
import { styles } from '../styles';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!email || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não são iguais.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert(
        'Atenção',
        'A senha deve possuir pelo menos 6 caracteres.'
      );
      return;
    }

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        senha
      );

      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso!'
      );
    } catch (error) {
      let mensagem = 'Não foi possível criar a conta.';

      if (error.code === 'auth/email-already-in-use') {
        mensagem = 'Este e-mail já está cadastrado.';
      }

      if (error.code === 'auth/invalid-email') {
        mensagem = 'Informe um e-mail válido.';
      }

      if (error.code === 'auth/weak-password') {
        mensagem = 'A senha é muito fraca.';
      }

      Alert.alert('Erro', mensagem);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <Text style={[styles.title, { marginTop: 50 }]}>
          Criar sua conta
        </Text>

        <Text style={styles.subtitle}>
          Cadastre-se com seu e-mail e senha para começar.
        </Text>

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

        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Cadastrar
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ alignItems: 'center', marginTop: 10 }}
        >
          <Text>
            Já tem uma conta?{' '}
            <Text style={styles.link}>Entrar</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
