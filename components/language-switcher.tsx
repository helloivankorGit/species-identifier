import { Colors } from '@/constants/theme';
import { useLanguage } from '@/contexts/language-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const colorScheme = useColorScheme();
  
  const activeColor = Colors[colorScheme ?? 'light'].tint;
  
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        onPress={() => setLanguage('uk')}
        style={[
          styles.button,
          language === 'uk' && { ...styles.active, backgroundColor: activeColor, borderColor: activeColor }
        ]}
      >
        <ThemedText style={language === 'uk' ? styles.activeText : styles.inactiveText}>
          🇺🇦 UA
        </ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => setLanguage('en')}
        style={[
          styles.button,
          language === 'en' && { ...styles.active, backgroundColor: activeColor, borderColor: activeColor }
        ]}
      >
        <ThemedText style={language === 'en' ? styles.activeText : styles.inactiveText}>
          🇬🇧 EN
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
    minWidth: 80,
    alignItems: 'center',
  },
  active: {
    // backgroundColor and borderColor will be applied dynamically
  },
  activeText: {
    color: '#fff',
    fontWeight: '700',
  },
  inactiveText: {
    fontWeight: '600',
  },
});
