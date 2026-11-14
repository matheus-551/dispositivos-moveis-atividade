import { Image, StyleSheet, Text, View } from 'react-native';

import Button from './Button';

export default function ImageTile({ image, onDelete }) {
  return (
    <View style={styles.tile}>
      <Image source={{ uri: image.url }} accessibilityLabel={image.name} style={styles.image} />
      <Text numberOfLines={1} style={styles.filename}>{image.name}</Text>
      <Button title="Excluir" danger onPress={onDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: { flex: 1, maxWidth: '50%', backgroundColor: 'white', padding: 7, borderRadius: 12 },
  image: { width: '100%', aspectRatio: 1.2, borderRadius: 9, backgroundColor: '#DFE7F3' },
  filename: { fontSize: 14, fontWeight: '600', marginVertical: 8 },
});
