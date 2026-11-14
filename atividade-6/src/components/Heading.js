import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { styles } from '../styles';

export default function Heading({ title, subtitle }) {
  return (
    <View style={styles.heading}>
      <View style={styles.logo}>
        <Feather name="bell" size={32} color="white" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.muted}>{subtitle}</Text>
    </View>
  );
}
