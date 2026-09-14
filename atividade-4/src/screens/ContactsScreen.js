import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { auth } from '../services/firebase';
import { listarContatos } from '../services/api';

import { styles, colors } from '../styles';

export default function ContactsScreen({ navigation }) {
  const [contatos, setContatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarContatos = useCallback(async () => {
    try {
      if (!auth.currentUser) {
        return;
      }

      const data = await listarContatos(
        auth.currentUser.uid
      );

      setContatos(data);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar os contatos.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarContatos();
    }, [carregarContatos])
  );

  function atualizarLista() {
    setRefreshing(true);
    carregarContatos();
  }

  function renderContato({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('ContactDetails', {
            contato: item,
          })
        }
      >
        <Text style={styles.cardTitle}>
          {item.nome}
        </Text>

        <Text style={styles.cardText}>
          📞 {item.telefone}
        </Text>

        <Text style={styles.cardText}>
          📍 {item.cidade}
        </Text>
      </TouchableOpacity>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />

        <Text style={{ marginTop: 15 }}>
          Carregando contatos...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Text style={styles.title}>
            Meus Contatos
          </Text>

          <Text style={styles.subtitle}>
            {contatos.length} contato(s)
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ContactForm')
          }
          style={{
            backgroundColor: colors.primary,
            width: 45,
            height: 45,
            borderRadius: 23,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 25 }}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      {contatos.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ fontSize: 50 }}>👤</Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              marginTop: 15,
            }}
          >
            Nenhum contato ainda
          </Text>

          <Text
            style={{
              color: colors.secondary,
              textAlign: 'center',
              marginTop: 8,
              marginBottom: 20,
            }}
          >
            Adicione seu primeiro contato para começar.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('ContactForm')
            }
          >
            <Text style={styles.buttonText}>
              Adicionar contato
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={contatos}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderContato}
          contentContainerStyle={{ padding: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={atualizarLista}
            />
          }
        />
      )}
    </View>
  );
}
