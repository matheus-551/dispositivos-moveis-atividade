import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { signOut } from 'firebase/auth';

import { auth } from '../services/firebase';
import { styles, colors } from '../styles';

export default function ProfileScreen() {
  async function sair() {
    try {
      await signOut(auth);

      Alert.alert(
        'Sucesso',
        'Você saiu da aplicação.'
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível sair da aplicação.'
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <View
          style={{
            alignItems: 'center',
            marginTop: 40,
            marginBottom: 40,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 30 }}>
              👤
            </Text>
          </View>

          <Text
            style={[
              styles.title,
              { marginTop: 15 },
            ]}
          >
            Perfil
          </Text>

          <Text style={styles.subtitle}>
            {auth.currentUser?.email}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            Alert.alert(
              'Meus dados',
              `E-mail: ${auth.currentUser?.email}`
            )
          }
        >
          <Text style={styles.cardTitle}>
            👤 Meus dados
          </Text>

          <Text style={styles.cardText}>
            Visualizar informações da conta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dangerButton}
          onPress={sair}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: '700',
            }}
          >
            Sair da conta
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
