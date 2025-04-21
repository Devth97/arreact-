import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);  const [buttonScale] = useState(new Animated.Value(1));

  const handleAddToCart = () => {
    // Prevent multiple rapid clicks
    if (isAdding) return;

    setIsAdding(true);
    
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Add to cart
    addToCart(product);

    // Reset adding state
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Home')}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <Image 
          source={{ uri: product.image }}
          style={styles.productImage}
        />

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>

          {/* Sustainability Impact */}
          <View style={styles.impactContainer}>
            <LinearGradient
              colors={['#E8F5E9', '#C8E6C9']}
              style={styles.impactCard}
            >
              <View style={styles.impactItem}>
                <MaterialCommunityIcons name="tree" size={24} color="#2E7D32" />
                <Text style={styles.impactNumber}>{product.saved_trees}</Text>
                <Text style={styles.impactLabel}>Trees Saved</Text>
              </View>
              <View style={styles.impactDivider} />
              <View style={styles.impactItem}>
                <MaterialCommunityIcons name="molecule-co2" size={24} color="#2E7D32" />
                <Text style={styles.impactNumber}>{product.carbon_reduced}</Text>
                <Text style={styles.impactLabel}>kg CO₂ Reduced</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>About this piece</Text>
          <Text style={styles.description}>
            This beautifully restored piece combines classic craftsmanship with modern sustainability. 
            Each detail has been carefully preserved and renewed using eco-friendly materials and processes.
          </Text>

          {/* Materials */}
          <Text style={styles.sectionTitle}>Materials</Text>
          <View style={styles.materialsList}>
            <View style={styles.materialItem}>
              <MaterialCommunityIcons name="test-tube" size={20} color="#2E7D32" />
              <Text style={styles.materialText}>Eco-friendly finish</Text>
            </View>
            <View style={styles.materialItem}>
              <MaterialCommunityIcons name="recycling" size={20} color="#2E7D32" />
              <Text style={styles.materialText}>Reclaimed wood</Text>
            </View>
            <View style={styles.materialItem}>
              <MaterialCommunityIcons name="nature" size={20} color="#2E7D32" />
              <Text style={styles.materialText}>Natural materials</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>          <TouchableOpacity
            style={styles.arButton}            onPress={() => navigation.navigate('AR', { product })}
          >
            <MaterialCommunityIcons name="augmented-reality" size={24} color="#2E7D32" />
            <Text style={styles.arButtonText}>View in Room</Text>
          </TouchableOpacity>          <TouchableOpacity 
            style={[styles.addToCartButton, isAdding && styles.addToCartButtonActive]}
            onPress={handleAddToCart}
            disabled={isAdding}
          >
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <LinearGradient
              colors={['#43A047', '#2E7D32']}
              style={styles.addToCartGradient}
            >
              <MaterialCommunityIcons name="cart-plus" size={20} color="#fff" style={styles.cartIcon} />
              <Text style={styles.addToCartText}>
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </Text>
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
      </View>
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
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  shareButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  productImage: {
    width: Dimensions.get('window').width,
    height: 400,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  impactContainer: {
    marginVertical: 16,
  },
  impactCard: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  impactItem: {
    alignItems: 'center',
  },
  impactNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginVertical: 4,
  },
  impactLabel: {
    fontSize: 14,
    color: '#666',
  },
  impactDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#2E7D32',
    opacity: 0.2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  materialsList: {
    marginTop: 8,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  materialText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },  arButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    marginRight: 16,
  },
  arButtonText: {
    marginLeft: 8,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  addToCartButton: {
    flex: 1,
  },  cartIcon: {
    marginRight: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToCartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
});