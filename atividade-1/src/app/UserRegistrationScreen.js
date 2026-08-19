import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import MaterialIcons from '@react-native-vector-icons/material-icons';

export default function UserRegistrationScreen({
  navigation,
}) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleSave() {
    Alert.alert(
      'Sucesso',
      'Usuário cadastrado!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>

        <Text style={styles.label}>
          Nome
        </Text>

        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>
          CPF
        </Text>

        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />

        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>
          Senha
        </Text>

        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>
            Salvar
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
  },

  form: {
    padding: 24,
  },

  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },

  input: {
    height: 42,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#AAA',
    paddingHorizontal: 10,
    marginBottom: 12,
  },

  saveButton: {
    height: 45,
    backgroundColor: '#2575E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});