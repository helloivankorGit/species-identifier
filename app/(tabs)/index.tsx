import { AnimalIcon } from '@/components/animal-icon';
import { IdentificationResultComponent } from '@/components/identification-result';
import { ImagePickerButton } from '@/components/image-picker-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLanguage } from '@/contexts/language-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IdentificationResult, identifyAnimalOrInsect } from '@/services/identifier';
import { Image } from 'expo-image';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IdentificationResult | null>(null);
  const tintColor = useThemeColor({}, 'tint');
  const { t, language } = useLanguage();

  const handleImageSelected = async (uri: string) => {
    setSelectedImage(uri);
    setResult(null);
    setIsLoading(true);

    try {
      const identification = await identifyAnimalOrInsect(uri, language);
      if (identification) {
        setResult(identification);
      } else {
        Alert.alert(
          t('identificationFailed'),
          t('identificationFailedMessage')
        );
        setSelectedImage(null);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        t('errorOccurred'),
        'An error occurred while identifying the image. Please make sure you have added your Google AI API key in services/identifier.ts'
      );
      setSelectedImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.header}>
          <AnimalIcon size={64} color={tintColor} />
          <ThemedText type="title" style={styles.title}>
            {t('appTitle')}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {t('appSubtitle')}
          </ThemedText>
        </ThemedView>

        {!selectedImage && !result && (
          <ThemedView style={styles.pickerContainer}>
            <View style={styles.buttonRow}>
              <ImagePickerButton
                onImageSelected={handleImageSelected}
                icon="camera"
                label={t('takePhoto')}
              />
              <ImagePickerButton
                onImageSelected={handleImageSelected}
                icon="images"
                label={t('chooseFromLibrary')}
              />
            </View>
          </ThemedView>
        )}

        {selectedImage && (
          <ThemedView style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} contentFit="cover" />
          </ThemedView>
        )}

        {isLoading && (
          <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={tintColor} />
            <ThemedText style={styles.loadingText}>
              {t('analyzingImage')}
            </ThemedText>
          </ThemedView>
        )}

        {result && !isLoading && (
          <ThemedView style={styles.resultContainer}>
            <IdentificationResultComponent result={result} />
            <ThemedView style={styles.resetButtonContainer}>
              <View style={styles.buttonRow}>
                <ImagePickerButton
                  onImageSelected={handleImageSelected}
                  icon="camera"
                  label={t('newPhoto')}
                />
                <ImagePickerButton
                  onImageSelected={handleImageSelected}
                  icon="images"
                  label={t('newFromLibrary')}
                />
              </View>
            </ThemedView>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
    marginTop: 32,
  },
  title: {
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.6,
    fontSize: 15,
    lineHeight: 22,
  },
  pickerContainer: {
    marginBottom: 32,
  },
  buttonRow: {
    gap: 16,
  },
  imageContainer: {
    marginBottom: 32,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: 340,
    borderRadius: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.7,
  },
  resultContainer: {
    marginBottom: 32,
  },
  resetButtonContainer: {
    marginTop: 32,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
});
