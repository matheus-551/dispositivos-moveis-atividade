import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import MaterialIcons from '@react-native-vector-icons/material-icons';

const contacts = [
  {
    id: '1',
    name: 'Marcos Andrade',
    phone: '81 988553424',
    email: 'mand@gmail.com',
  },
  {
    id: '2',
    name: 'Patrícia Tavares',
    phone: '81 998765332',
    email: 'patricia@gmail.com',
  },
  {
    id: '3',
    name: 'Rodrigo Antunes',
    phone: '81 987765525',
    email: 'rodrigo@gmail.com',
  },
];

export default function ContactsScreen({ navigation }) {

  function handleAddContact() {
    navigation.navigate('ContactForm');
  }

  function handleContact(contact) {
    navigation.navigate('ContactForm', {
      contact: contact,
    });
  }

  function renderContact({ item }) {
    return (
      <TouchableOpacity
        style={styles.contact}
        onPress={() => handleContact(item)}
      >

        <MaterialIcons
          name="account-circle"
          size={48}
          color="#2588C8"
        />

        <View style={styles.contactInfo}>

          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.phone}>
            {item.phone}
          </Text>

        </View>

        <MaterialIcons
          name="chevron-right"
          size={28}
          color="#888"
        />

      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    height: 58,
    backgroundColor: '#2575E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },

  contact: {
    minHeight: 70,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
  },

  contactInfo: {
    flex: 1,
    marginLeft: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },

  phone: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
});