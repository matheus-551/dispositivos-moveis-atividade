import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, Text } from 'react-native';

import { styles } from '../styles';
import { isValidPushToken } from '../utils/pushToken';

export default function UserPicker({ users, selected, onSelect, open, setOpen }) {
  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Selecionar usuário"
        accessibilityState={{ expanded: open }}
        style={styles.inputRow}
        onPress={() => setOpen((current) => !current)}
      >
        <Feather name="user" size={18} color="#788295" />
        <Text style={[styles.muted, { flex: 1 }]}>{selected?.nome || 'Escolha um usuário'}</Text>
        <Feather name={open ? 'chevron-up' : 'chevron-down'} size={18} color="#788295" />
      </Pressable>
      {open && (
        <ScrollView
          style={{
            maxHeight: 220,
            borderWidth: 1,
            borderColor: '#dce1e9',
            backgroundColor: 'white',
            borderRadius: 8,
          }}
          nestedScrollEnabled
        >
          {users.map((item, index) => (
            <Pressable
              key={`${item.email}-${index}`}
              style={styles.option}
              onPress={() => {
                onSelect(item);
                setOpen(false);
              }}
            >
              <Text>{item.nome}</Text>
              <Text style={styles.muted}>
                {item.email}
                {!isValidPushToken(item.token) ? ' · sem token válido' : ''}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </>
  );
}
