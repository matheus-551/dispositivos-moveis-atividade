import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { styles } from '../styles';

export default function Field({ label, icon, password, ...props }) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, props.multiline && { alignItems: 'flex-start' }]}>
        <Feather
          name={icon}
          size={18}
          color="#7d879a"
          style={{ marginTop: props.multiline ? 3 : 0 }}
        />
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor="#8992a3"
          style={[styles.input, props.multiline && { minHeight: 88, textAlignVertical: 'top' }]}
          secureTextEntry={password && !visible}
          {...props}
        />
        {password && (
          <Pressable
            accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
            onPress={() => setVisible((current) => !current)}
            hitSlop={10}
          >
            <Feather name={visible ? 'eye-off' : 'eye'} size={18} color="#7d879a" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
