import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {
  criarContato,
  atualizarContato,
} from '../services/api';

import { auth } from '../services/firebase';
import { styles } from '../styles';

export default function ContactFormScreen({
  navigation,
  route,
}) {
  const contato = route.params?.contato;
  const editando = !!contato;

  const [nome, setNome] = useState(
    contato?.nome || ''
  );

  const [telefone, setTelefone] = useState(
    contato?.telefone || ''
  );

  const [cidade, setCidade] = useState(
    contato?.cidade || ''
  );

  const [anotacao, setAnotacao] = useState(
    contato?.anotacao || ''
  );

  const [loading, setLoading] = useState(false);

  async function salvar() {
    if (!nome || !telefone || !cidade) {
      Alert.alert(
        'Atenção',
        'Preencha nome, telefone e cidade.'
      );

      return;
    }

    try {
      setLoading(true);

      const dados = {
        nome: nome.trim(),
        telefone: telefone.trim(),
        cidade: cidade.trim(),
        anotacao: anotacao.trim(),
        userId: auth.currentUser.uid,
      };

      if (editando) {
        await atualizarContato(
          contato.id,
          dados
        );

        Alert.alert(
          'Sucesso',
          'Contato atualizado com sucesso!'
        );
      } else {
        await criarContato(dados);

        Alert.alert(
          'Sucesso',
          'Contato cadastrado com sucesso!'
        );
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Erro',
        editando
          ? 'Não foi possível atualizar o contato.'
          : 'Não foi possível cadastrar o contato.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        {editando
          ? 'Editar Contato'
          : 'Novo Contato'}
      </Text>

      <Text style={styles.subtitle}>
        {editando
          ? 'Altere os dados do contato.'
          : 'Informe os dados do novo contato.'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome *"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone *"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Cidade *"
        value={cidade}
        onChangeText={setCidade}
      />

      <TextInput
        style={[
          styles.input,
          {
            height: 110,
            textAlignVertical: 'top',
            paddingTop: 15,
          },
        ]}
        placeholder="Anotação (opcional)"
        value={anotacao}
        onChangeText={setAnotacao}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={salvar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Salvar
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
