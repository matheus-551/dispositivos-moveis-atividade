import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Field({ label, password, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.field}>
      <TextInput
        accessibilityLabel={label}
        placeholder={label}
        placeholderTextColor="#657593"
        autoCapitalize="none"
        style={styles.input}
        secureTextEntry={password && !visible}
        {...props}
      />
      {password && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Alternar visibilidade da senha"
          onPress={() => setVisible((current) => !current)}
        >
          <Text style={styles.toggle}>{visible ? 'Ocultar' : 'Mostrar'}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: '#F6F8FC',
    borderWidth: 1,
    borderColor: '#DCE5F4',
    borderRadius: 10,
    minHeight: 55,
    marginBottom: 14,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#233554',
  },
  toggle: {
    color: '#165DFF',
  },
});
