import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

export default function Button({ title, onPress, busy, outline, danger, disabled }) {
  const unavailable = busy || disabled;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={unavailable}
      onPress={onPress}
      style={[
        styles.button,
        outline && styles.outline,
        danger && styles.danger,
        unavailable && styles.disabled,
      ]}
    >
      {busy ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.label, outline && styles.outlineLabel]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#165DFF',
    minHeight: 51,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  outline: {
    backgroundColor: 'white',
    borderColor: '#165DFF',
    borderWidth: 1,
  },
  danger: {
    backgroundColor: '#FF3E49',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  outlineLabel: {
    color: '#165DFF',
  },
});
