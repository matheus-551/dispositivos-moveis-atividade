import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import MaterialIcons from '@react-native-vector-icons/material-icons';

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
    navigation.navigate('Contacts');
  }

  function handleRegister() {
    navigation.navigate('UserRegistration');
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        LOGIN
      </Text>

      <View style={styles.form}>

        <MaterialIcons
          name="account-circle"
          size={90}
          color="#111"
          style={styles.icon}
        />

        <Text style={styles.label}>
          login
        </Text>

        <TextInput
          style={styles.input}
          value={login}
          onChangeText={setLogin}
        />

        <Text style={styles.label}>
          senha
        </Text>

        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>
            Cadastre-se
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: 100,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 8,
    color: '#111',
  },

  form: {
    width: '70%',
    marginTop: 60,
  },

  icon: {
    alignSelf: 'center',
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },

  input: {
    height: 42,
    borderWidth: 1,
    borderColor: '#AAA',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  loginButton: {
    height: 45,
    backgroundColor: '#2575E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  registerButton: {
    height: 45,
    backgroundColor: '#FF2020',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});