import React, {useEffect,useState,} from 'react';
import {ScrollView,StyleSheet,View} from 'react-native';
import {
  Appbar,
  Button,
  Chip,
  Divider,
  RadioButton,
  Text,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getCategories} from '../api/api';

export default function FilterScreen({
  navigation,
  route,
}) {
  const {
    category: initialCategory = '',
    sortBy: initialSortBy = '',
    order: initialOrder = '',
  } = route.params || {};

  const [categories, setCategories] =
    useState([]);

  const [category, setCategory] =
    useState(initialCategory);

  const [sort, setSort] =
    useState(
      getInitialSort(
        initialSortBy,
        initialOrder
      )
    );

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(
        'Erro ao carregar categorias:',
        error
      );
    }
  }

  function applyFilters() {
    let sortBy = '';
    let order = '';

    if (sort === 'lowest') {
      sortBy = 'price';
      order = 'asc';
    }

    if (sort === 'highest') {
      sortBy = 'price';
      order = 'desc';
    }

    if (sort === 'popular') {
      sortBy = 'rating';
      order = 'desc';
    }
    navigation.popTo('Home', {
      filters: {
        category,
        sortBy,
        order,
      },
    });
  }

  function clearFilters() {
    setCategory('');
    setSort('recent');
  }

  function closeFilters() {
    navigation.goBack();
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={[
        'top',
        'left',
        'right',
        'bottom',
      ]}
    >
      <Appbar.Header>
        <Appbar.Content
          title="Filtros"
        />

        <Appbar.Action
          icon="close"
          onPress={closeFilters}
        />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >

        <Text variant="titleMedium">
          Categorias
        </Text>

        <View style={styles.categories}>
          <Chip
            selected={!category}
            onPress={() =>
              setCategory('')
            }
          >
            Todos
          </Chip>

          {categories.map((item) => {
            const value =
              item.slug || item;

            const label =
              item.name || item;

            return (
              <Chip
                key={value}
                selected={
                  category === value
                }
                onPress={() =>
                  setCategory(value)
                }
              >
                {label}
              </Chip>
            );
          })}
        </View>

        <Divider style={styles.divider} />

        <Text variant="titleMedium">
          Ordenação
        </Text>

        <RadioButton.Group
          onValueChange={setSort}
          value={sort}
        >
          <RadioButton.Item
            label="Mais recentes"
            value="recent"
          />

          <RadioButton.Item
            label="Menor preço"
            value="lowest"
          />

          <RadioButton.Item
            label="Maior preço"
            value="highest"
          />

          <RadioButton.Item
            label="Mais populares"
            value="popular"
          />
        </RadioButton.Group>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="outlined"
          onPress={clearFilters}
          style={styles.button}
        >
          Limpar
        </Button>

        <Button
          mode="contained"
          onPress={applyFilters}
          style={styles.button}
        >
          Aplicar filtros
        </Button>
      </View>
    </SafeAreaView>
  );
}

function getInitialSort(
  sortBy,
  order
) {
  if (
    sortBy === 'price' &&
    order === 'asc'
  ) {
    return 'lowest';
  }

  if (
    sortBy === 'price' &&
    order === 'desc'
  ) {
    return 'highest';
  }

  if (
    sortBy === 'rating' &&
    order === 'desc'
  ) {
    return 'popular';
  }

  return 'recent';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },

  divider: {
    marginVertical: 20,
  },

  footer: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },

  button: {
    flex: 1,
  },
});
