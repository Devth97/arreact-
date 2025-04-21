import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';

const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Vintage Wooden Chair',
    price: 299.99,
    saved_trees: 2,
    carbon_reduced: 45,
    image: 'https://api.a0.dev/assets/image?text=vintage%20wooden%20chair%20with%20beautiful%20craftsmanship&aspect=4:3'
  },
  {
    id: '2',
    name: 'Eco-Friendly Table',
    price: 499.99,
    saved_trees: 3,
    carbon_reduced: 60,
    image: 'https://api.a0.dev/assets/image?text=sustainable%20wooden%20dining%20table%20eco%20friendly&aspect=4:3'
  },
  {
    id: '3',
    name: 'Restored Cabinet',
    price: 799.99,
    saved_trees: 4,
    carbon_reduced: 75,
    image: 'https://api.a0.dev/assets/image?text=restored%20vintage%20wooden%20cabinet%20sustainable&aspect=4:3'
  }
];

export default function HomeScreen({ navigation }) {
  const { items } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Eco Furniture</Text>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => {/* Cart navigation would go here */}}
        >
          <MaterialCommunityIcons name="cart-outline" size={24} color="#2E7D32" />
          {items.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{items.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Sustainable & Restored Pieces</Text>
        
        <View style={styles.productsGrid}>
          {SAMPLE_PRODUCTS.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', { product })}
            >
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
                <View style={styles.impactInfo}>
                  <MaterialCommunityIcons name="tree" size={16} color="#2E7D32" />
                  <Text style={styles.impactText}>{product.saved_trees} trees saved</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#E53935',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    padding: 16,
    paddingBottom: 8,
  },
  productsGrid: {
    padding: 8,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginTop: 4,
  },
  impactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  impactText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
});