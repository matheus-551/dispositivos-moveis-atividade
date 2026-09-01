import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Appbar,
  Card,
  Chip,
  Divider,
  IconButton,
  Text,
} from 'react-native-paper';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';

export default function ProductDetailsScreen({
  navigation,
  route,
}) {
  const { product } = route.params;

  function formatPrice(price) {
    return `R$ ${price
      .toFixed(2)
      .replace('.', ',')}`;
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
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() =>
            navigation.goBack()
          }
        />

        <Appbar.Content
          title="Detalhes"
        />

        <Appbar.Action
          icon="heart-outline"
        />
      </Appbar.Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: product.thumbnail,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text
          variant="headlineSmall"
          style={styles.title}
        >
          {product.title}
        </Text>

        <Chip
          compact
          style={styles.category}
        >
          {product.category}
        </Chip>

        <Text
          variant="headlineSmall"
          style={styles.price}
        >
          {formatPrice(product.price)}
        </Text>

        <Card style={styles.ratingCard}>
          <Card.Content>
            <View style={styles.ratingHeader}>
              <View>
                <Text variant="titleMedium">
                  Avaliação
                </Text>

                <Text
                  variant="headlineMedium"
                  style={styles.rating}
                >
                  ⭐ {product.rating.toFixed(1)}
                </Text>
              </View>

              <Text variant="bodyMedium">
                {product.reviews?.length || 0}{' '}
                avaliações
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Divider style={styles.divider} />

        <Text
          variant="titleMedium"
          style={styles.sectionTitle}
        >
          Descrição
        </Text>

        <Text variant="bodyMedium">
          {product.description}
        </Text>

        <Text
          variant="titleMedium"
          style={styles.sectionTitle}
        >
          Especificações
        </Text>

        <View style={styles.specifications}>
          <Text variant="bodyMedium">
            Marca: {product.brand || 'Não informado'}
          </Text>

          <Text variant="bodyMedium">
            Estoque: {product.stock}
          </Text>

          <Text variant="bodyMedium">
            Desconto: {product.discountPercentage}%
          </Text>

          <Text variant="bodyMedium">
            Peso: {product.weight}
          </Text>
        </View>

        <Text
          variant="titleMedium"
          style={styles.sectionTitle}
        >
          Avaliações dos clientes
        </Text>

        {product.reviews?.length > 0 ? (
          product.reviews.map(
            (review, index) => (
              <Card
                key={`${review.reviewerEmail}-${index}`}
                style={styles.reviewCard}
              >
                <Card.Content>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewer}>
                      <IconButton
                        icon="account-circle"
                        size={32}
                        iconColor="#5036E8"
                      />

                      <View>
                        <Text
                          variant="titleSmall"
                        >
                          {review.reviewerName}
                        </Text>

                        <Text
                          variant="bodySmall"
                          style={styles.date}
                        >
                          {review.date}
                        </Text>
                      </View>
                    </View>

                    <Text>
                      ⭐ {review.rating}
                    </Text>
                  </View>

                  <Text
                    variant="bodyMedium"
                    style={styles.comment}
                  >
                    {review.comment}
                  </Text>
                </Card.Content>
              </Card>
            )
          )
        ) : (
          <Text variant="bodyMedium">
            Este produto ainda não possui
            avaliações.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  imageContainer: {
    height: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  image: {
    width: '90%',
    height: '90%',
  },

  title: {
    fontWeight: '700',
    color: '#17204A',
  },

  category: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },

  price: {
    color: '#5036E8',
    fontWeight: '800',
    marginTop: 12,
  },

  ratingCard: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
  },

  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rating: {
    color: '#5036E8',
    fontWeight: '700',
    marginTop: 4,
  },

  divider: {
    marginVertical: 20,
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  specifications: {
    gap: 6,
  },

  reviewCard: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },

  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  reviewer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  date: {
    color: '#777777',
  },

  comment: {
    marginTop: 8,
  },
});
