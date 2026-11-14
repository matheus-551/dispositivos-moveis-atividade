import { Text } from 'react-native';

import { styles } from '../styles';

export default function Notice({ text, success }) {
  return text ? (
    <Text
      accessibilityRole="alert"
      style={[styles.notice, success && { backgroundColor: '#e8f7ee', color: '#207744' }]}
    >
      {text}
    </Text>
  ) : null;
}
