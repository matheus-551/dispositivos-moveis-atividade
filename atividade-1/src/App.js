import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MaterialIcons from '@react-native-vector-icons/material-icons';

import LoginScreen from './app/LoginScreen';
import ContactsScreen from './app/ContactsScreen';
import UserRegistrationScreen from './app/UserRegistrationScreen';
import ContactFormScreen from './app/ContactFormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2575E8',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Contacts"
          component={ContactsScreen}
          options={({ navigation }) => ({
            title: 'Lista de Contatos',
            headerRight: () => (
              <MaterialIcons
                name="add"
                size={32}
                color="#FFF"
                onPress={() => navigation.navigate('ContactForm')}
              />
            ),
          })}
        />

        <Stack.Screen
          name="UserRegistration"
          component={UserRegistrationScreen}
          options={({ navigation }) => ({
            title: 'Usuário',

            headerLeft: () => (
              <MaterialIcons
                name="arrow-back"
                size={30}
                color="#FFF"
                onPress={() => navigation.navigate('Login')}
              />
            ),
          })}
        />
        
        <Stack.Screen
          name="ContactForm"
          component={ContactFormScreen}
          options={({ navigation }) => ({
            title: 'Contato',

            headerLeft: () => (
              <MaterialIcons
                name="arrow-back"
                size={30}
                color="#FFF"
                onPress={() => navigation.navigate('Contacts')}
              />
            ),
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}