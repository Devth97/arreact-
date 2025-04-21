import React, { useState, useEffect } from 'react';
import { Linking, View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { loadModel, Model3D } from '../utils/ModelManager';

export default function ARScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [model, setModel] = useState<Model3D | null>(null);

  useEffect(() => {
    const initializeAR = async () => {
      if (route.params?.product?.id) {
        const loadedModel = await loadModel(route.params.product.id);
        setModel(loadedModel);
      }
      setIsLoading(false);
    };
    
    initializeAR();
  }, [route.params?.product?.id]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetail', { product: route.params?.product })}
          style={styles.closeButton}
        >
          <MaterialCommunityIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AR Preview</Text>
      </View>

      <View style={styles.webArContainer}>
        <Text style={styles.webArText}>
          View {route.params?.product?.name} in AR
        </Text>
        <Text style={styles.webArInstructions}>
          1. Click the button below to open AR viewer
        </Text>
        <Text style={styles.webArInstructions}>
          2. Point your camera at a flat surface
        </Text>
        <TouchableOpacity 
          style={styles.webArButton}
          onPress={() => {
            Linking.openURL('https://sketchfab.com/models/c226b9e0cace4a20bf017b7061ada18d/embed?autostart=1&ui_ar=1&ui_inspector=0&ui_help=0&ui_settings=0&ui_annotations=0');
          }}
        >
          <MaterialCommunityIcons name="open-in-new" size={24} color="#fff" />
          <Text style={styles.webArButtonText}>Open AR View</Text>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <MaterialCommunityIcons name="augmented-reality" size={48} color="#2E7D32" />
          <Text style={styles.loadingText}>Loading AR View...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  closeButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  webArContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webArText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  webArInstructions: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  webArButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  webArButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});