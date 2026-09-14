import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {
  excluirContato,
} from '../services/api';

import { styles, colors } from '../styles';

export default function ContactDetailsScreen({
  navigation,
  route,
}) {
  const [contato, setContato] = useState(
    route.params.contato
  );

  const [loading, setLoading] = useState(false);

  function editar() {
    navigation.navigate('ContactForm', {
      contato,
    });
  }

  function confirmarExclusao() {
    Alert.alert(
      'Excluir contato?',
      'Tem certeza que deseja excluir este contato? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: excluir,
        },
      ]
    );
  }

  async function excluir() {
    try {
      setLoading(true);

      await excluirContato(contato.id);

      Alert.alert(
        'Sucesso',
        'Contato excluído com sucesso!'
      );

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível excluir o contato.'
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
      <View
        style={{
          alignItems: 'center',
          marginBottom: 30,
        }}
      >
        <View
          style={{
            width: 75,
            height: 75,
            borderRadius: 40,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 25,
              fontWeight: '700',
            }}
          >
            {contato.nome
              ?.charAt(0)
              .toUpperCase()}
          </Text>
        </View>

        <Text
          style={[
            styles.title,
            { marginTop: 15 },
          ]}
        >
          {contato.nome}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          📞 Telefone
        </Text>

        <Text style={styles.cardTitle}>
          {contato.telefone}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          📍 Cidade
        </Text>

        <Text style={styles.cardTitle}>
          {contato.cidade}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          📝 Anotação
        </Text>

        <Text style={styles.cardTitle}>
          {contato.anotacao || 'Sem anotação'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={editar}
      >
        <Text style={styles.buttonText}>
          Editar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.dangerButton}
        onPress={confirmarExclusao}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={{
              color: '#fff',
              fontWeight: '700',
            }}
          >
            Excluir
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
