import { Modal, StyleSheet, Text, View } from 'react-native';

import { sharedStyles } from '../styles';
import Button from './Button';

export default function DeleteImageModal({ image, busy, onConfirm, onClose }) {
  return (
    <Modal transparent visible={Boolean(image)} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={sharedStyles.title}>Excluir imagem?</Text>
          <Text style={sharedStyles.description}>
            Deseja excluir “{image?.name}”? Essa ação não poderá ser desfeita.
          </Text>
          <Button title="Excluir" danger busy={busy} onPress={onConfirm} />
          <Button title="Cancelar" outline disabled={busy} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0008',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  dialog: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
  },
});
