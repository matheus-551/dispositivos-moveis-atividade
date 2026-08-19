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

export default function ContactFormScreen({
  navigation,
  route,
}) {
  const contact = route.params?.contact;

  const [nome, setNome] = useState(
    contact?.name || ''
  );

  const [email, setEmail] = useState(
    contact?.email || ''
  );

  const [telefone, setTelefone] = useState(
    contact?.phone || ''
  );

  const editing = !!contact;

  function handleSave() {
    Alert.alert(
      'Sucesso',
      editing
        ? 'Contato alterado com sucesso!'
        : 'Contato cadastrado com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  }

  function handleDelete() {
    Alert.alert(
      'Excluir contato',
      `Deseja excluir ${nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
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
          Email
        </Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>
          Telefone
        </Text>

        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>
            {editing ? 'Alterar' : 'Salvar'}
          </Text>
        </TouchableOpacity>

        {editing && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>
              Excluir
            </Text>
          </TouchableOpacity>
        )}

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

  deleteButton: {
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