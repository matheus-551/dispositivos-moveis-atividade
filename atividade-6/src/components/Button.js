import { ActivityIndicator, Pressable, Text } from 'react-native';

import { styles } from '../styles';

export default function Button({ title, onPress, busy, disabled }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={busy || disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, (busy || disabled || pressed) && { opacity: 0.6 }]}
    >
      {busy ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>{title}</Text>}
    </Pressable>
  );
}
