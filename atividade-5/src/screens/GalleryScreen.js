import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import DeleteImageModal from '../components/DeleteImageModal';
import ImageTile from '../components/ImageTile';
import useGallery from '../hooks/useGallery';
import { sharedStyles } from '../styles';

export default function GalleryScreen({ user, message, setMessage, onLogout }) {
  const { images, cursor, loading, deleting, load, remove } = useGallery(user, setMessage);
  const [selected, setSelected] = useState(null);

  function closeModal() {
    if (!deleting) {
      setSelected(null);
    }
  }

  async function confirmDelete() {
    if (selected && (await remove(selected.publicId))) {
      setSelected(null);
    }
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>▧</Text>
        <View style={styles.headerLabels}>
          <Text style={styles.headerTitle}>Minhas Imagens</Text>
          <Text style={styles.headerSubtitle}>Cloudinary</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={onLogout}>
          <Text style={styles.logout}>↪ Sair</Text>
        </Pressable>
      </View>
      <View style={styles.gallery}>
        {!!message && (
          <Text accessibilityRole="alert" style={sharedStyles.message}>
            {message}
          </Text>
        )}
        <FlatList
          data={images}
          numColumns={2}
          keyExtractor={(image) => image.publicId}
          columnWrapperStyle={styles.columns}
          contentContainerStyle={styles.content}
          refreshing={loading}
          onRefresh={() => load()}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator />
            ) : (
              <View>
                <Text style={sharedStyles.subtitle}>Nenhuma imagem para exibir.</Text>
                <Button title="Atualizar" onPress={() => load()} />
              </View>
            )
          }
          ListFooterComponent={
            cursor ? <Button title="Carregar mais" busy={loading} onPress={() => load(cursor)} /> : null
          }
          renderItem={({ item }) => <ImageTile image={item} onDelete={() => setSelected(item)} />}
        />
      </View>
      <DeleteImageModal
        image={selected}
        busy={deleting}
        onConfirm={confirmDelete}
        onClose={closeModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 20 },
  headerIcon: { fontSize: 32, color: 'white' },
  headerLabels: { flex: 1 },
  headerTitle: { color: 'white', fontSize: 23, fontWeight: '700' },
  headerSubtitle: { color: '#C7D8FF' },
  logout: { color: 'white', fontWeight: '700' },
  gallery: {
    flex: 1,
    backgroundColor: '#F1F6FF',
    padding: 14,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  columns: { gap: 12 },
  content: { gap: 12, paddingBottom: 20 },
});
