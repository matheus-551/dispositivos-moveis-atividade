import React, {useCallback, useEffect, useState} from 'react';
import {FlatList,Image,ScrollView,StyleSheet,View} from 'react-native';
import {ActivityIndicator,Button,Card,Chip,Divider,IconButton,Searchbar,Text} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView,useSafeAreaInsets} from 'react-native-safe-area-context';
import {getCategories,getProducts} from '../api/api';

const LIMIT = 20;

export default function HomeScreen({navigation,route,}) {
  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] =useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const filters = route.params?.filters;

      if (filters) {
        setCategory(filters.category || '');
        setSortBy(filters.sortBy || '');
        setOrder(filters.order || '');

        navigation.setParams({
          filters: undefined,
        });
      }
    }, [
      route.params?.filters,
      navigation,
    ])
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [
    search,
    category,
    sortBy,
    order,
  ]);

  async function loadCategories() {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (err) {
      console.error(
        'Erro ao carregar categorias:',
        err
      );
    }
  }

  async function loadProducts(reset = false) {
    try {
      if (reset) {
        setLoading(true);
        setProducts([]);
      } else {
        setLoadingMore(true);
      }

      setError(false);

      const skip = reset
        ? 0
        : products.length;

      const data = await getProducts({
        limit: LIMIT,
        skip,
        search,
        category,
        sortBy,
        order,
      });

      if (reset) {
        setProducts(data.products);
      } else {
        setProducts((current) => [
          ...current,
          ...data.products,
        ]);
      }

      setTotal(data.total);
    } catch (err) {
      console.error(
        'Erro ao carregar produtos:',
        err
      );

      setError(true);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  function openDetails(product) {
    navigation.navigate(
      'ProductDetails',
      {
        product,
      }
    );
  }

  function openFilters() {
    navigation.navigate(
      'Filter',
      {
        category,
        sortBy,
        order,
      }
    );
  }

  function selectCategory(value) {
    if (value === category) {
      setCategory('');
      return;
    }

    setCategory(value);
  }

  function clearSearch() {
    setSearch('');
  }

  function clearCategory() {
    setCategory('');
  }

  function clearSort() {
    setSortBy('');
    setOrder('');
  }

  function renderProduct({ item }) {
    return (
      <Card
        style={styles.card}
        onPress={() =>
          openDetails(item)
        }
      >
        <Card.Title
          title={item.title}
          subtitle={item.category}
          titleNumberOfLines={2}
          left={() => (
            <Image
              source={{
                uri: item.thumbnail,
              }}
              style={styles.thumbnail}
            />
          )}
          right={() => (
            <IconButton
              icon="chevron-right"
              size={22}
            />
          )}
        />

        <Card.Content>
          <View style={styles.productBottom}>
            <Text
              variant="titleMedium"
              style={styles.price}
            >
              R$ {item.price
                .toFixed(2)
                .replace('.', ',')}
            </Text>

            <Text>
              ⭐ {item.rating.toFixed(1)}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  }

  function renderFooter() {
    if (loadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator
            color="#5036E8"
          />
        </View>
      );
    }

    if (products.length >= total) {
      return null;
    }

    return (
      <Button
        mode="outlined"
        icon="plus"
        onPress={() =>
          loadProducts(false)
        }
        style={styles.loadButton}
      >
        Carregar mais
      </Button>
    );
  }

  /*
   * Carregamento inicial
   */
  if (
    loading &&
    products.length === 0
  ) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#5036E8"
          />

          <Text style={styles.loadingText}>
            Carregando produtos...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && products.length === 0) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <View style={styles.center}>
          <Text
            variant="titleMedium"
            style={styles.error}
          >
            Não foi possível carregar os
            produtos.
          </Text>

          <Button
            mode="contained"
            onPress={() =>
              loadProducts(true)
            }
          >
            Tentar novamente
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={[
        'top',
        'left',
        'right',
      ]}
    >
      <FlatList
        data={products}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderProduct}
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.list,
          {
            paddingBottom:
              30 + insets.bottom,
          },
        ]}

        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text
                  variant="headlineSmall"
                  style={styles.title}
                >
                  PRODUCT EXPLORER
                </Text>

                <Text variant="bodySmall">
                  Encontre o produto que você
                  procura
                </Text>
              </View>

              <IconButton
                icon="shopping-outline"
                mode="contained"
                iconColor="#FFFFFF"
                containerColor="#5036E8"
              />
            </View>

            <Searchbar
              placeholder="Buscar produto..."
              value={search}
              onChangeText={setSearch}
              onClearIconPress={
                clearSearch
              }
            />

            <View style={styles.categoryHeader}>
              <Text variant="titleMedium">
                Categorias
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
              contentContainerStyle={
                styles.categories
              }
            >
              <Chip
                selected={category === ''}
                icon="apps"
                onPress={() =>
                  selectCategory('')
                }
                style={styles.categoryChip}
              >
                Todos
              </Chip>

              {categories.map((item) => (
                <Chip
                  key={
                    item.slug ||
                    item.name ||
                    item
                  }
                  selected={
                    category ===
                    (item.slug ||
                      item.name ||
                      item)
                  }
                  onPress={() =>
                    selectCategory(
                      item.slug ||
                        item.name ||
                        item
                    )
                  }
                  style={styles.categoryChip}
                >
                  {item.name || item}
                </Chip>
              ))}
            </ScrollView>

            <View style={styles.filterRow}>
              <Text variant="titleMedium">
                Produtos em destaque
              </Text>

              <Button
                mode="outlined"
                icon="filter-variant"
                compact
                onPress={openFilters}
              >
                Filtrar
              </Button>
            </View>

            {(category || sortBy) && (
              <View style={styles.chips}>
                {category !== '' && (
                  <Chip
                    icon="tag-outline"
                    onClose={
                      clearCategory
                    }
                  >
                    {getCategoryName(
                      category,
                      categories
                    )}
                  </Chip>
                )}

                {sortBy !== '' && (
                  <Chip
                    icon="sort"
                    onClose={
                      clearSort
                    }
                  >
                    {getSortLabel(
                      sortBy,
                      order
                    )}
                  </Chip>
                )}
              </View>
            )}

            <Divider
              style={styles.divider}
            />
          </>
        }

        ListFooterComponent={
          renderFooter
        }

        ListEmptyComponent={
          !loading ? (
            <View style={styles.empty}>
              <Text variant="titleMedium">
                Nenhum produto encontrado
              </Text>

              <Text variant="bodyMedium">
                Tente alterar sua busca ou
                seus filtros.
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

function getCategoryName(
  category,
  categories
) {
  const item = categories.find(
    (categoryItem) =>
      (
        categoryItem.slug ||
        categoryItem
      ) === category
  );

  return (
    item?.name ||
    item ||
    category
  );
}

function getSortLabel(
  sortBy,
  order
) {
  if (
    sortBy === 'price' &&
    order === 'asc'
  ) {
    return 'Menor preço';
  }

  if (
    sortBy === 'price' &&
    order === 'desc'
  ) {
    return 'Maior preço';
  }

  if (
    sortBy === 'rating' &&
    order === 'desc'
  ) {
    return 'Mais populares';
  }

  return 'Ordenação';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  list: {
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontWeight: '800',
    color: '#17204A',
  },

  categoryHeader: {
    marginTop: 16,
    marginBottom: 8,
  },

  categories: {
    gap: 8,
    paddingRight: 16,
  },

  categoryChip: {
    marginRight: 4,
  },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },

  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },

  divider: {
    marginBottom: 12,
  },

  card: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },

  thumbnail: {
    width: 55,
    height: 55,
    borderRadius: 8,
  },

  productBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    color: '#5036E8',
    fontWeight: '700',
  },

  loadButton: {
    marginTop: 8,
    marginBottom: 10,
  },

  footer: {
    padding: 20,
    alignItems: 'center',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  loadingText: {
    marginTop: 15,
  },

  error: {
    textAlign: 'center',
    marginBottom: 15,
  },

  empty: {
    alignItems: 'center',
    padding: 40,
    gap: 8,
  },
});
