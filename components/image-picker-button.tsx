import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

interface ImagePickerButtonProps {
  onImageSelected: (uri: string) => void;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

export function ImagePickerButton({ onImageSelected, icon, label }: ImagePickerButtonProps) {
  const tintColor = useThemeColor({}, 'tint');

  const requestPermissions = async (type: 'camera' | 'library') => {
    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Camera permission is required to take photos.'
        );
        return false;
      }
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Photo library permission is required to select images.'
        );
        return false;
      }
    }
    return true;
  };

  const handlePress = async () => {
    const type = icon === 'camera' ? 'camera' : 'library';
    const hasPermission = await requestPermissions(type);
    
    if (!hasPermission) return;

    let result;
    if (type === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
    }

    if (!result.canceled && result.assets[0]) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <ThemedView style={[styles.buttonContent, { borderColor: tintColor }]}>
        <Ionicons name={icon} size={32} color={tintColor} />
        <ThemedText style={styles.buttonText}>{label}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  buttonText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});
