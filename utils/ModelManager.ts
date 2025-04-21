import { Asset } from 'expo-asset';

export interface Model3D {
  id: string;
  name: string;
  modelUrl: string;
  thumbnail: string;
  format: 'glb' | 'gltf';
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
}

export const SAMPLE_MODELS: Model3D[] = [{
  id: '1',
  name: 'Vintage Wooden Chair',
  modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Chair/glTF/Chair.gltf',
  thumbnail: 'https://api.a0.dev/assets/image?text=vintage%20wooden%20chair%20with%20beautiful%20craftsmanship&aspect=1:1',
  format: 'gltf',
  scale: 1.0,
  position: [0, 0, -1],
  rotation: [0, 0, 0]
}];

export const loadModel = async (modelId: string): Promise<Model3D | null> => {
  try {
    const model = SAMPLE_MODELS.find(m => m.id === modelId);
    if (!model) return null;
    
    // Here we would normally download and cache the 3D model
    // For now, we'll just return the model info
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    return null;
  }
};