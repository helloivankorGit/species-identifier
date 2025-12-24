import { LanguageSwitcher } from '@/components/language-switcher';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/language-context';
import { StyleSheet } from 'react-native';

export default function TabTwoScreen() {
  const { t } = useLanguage();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A8E6CF', dark: '#2D5F3F' }}
      headerImage={
        <IconSymbol
          size={340}
          color="#4A7C59"
          name="pawprint.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          {t('aboutTitle')}
        </ThemedText>
      </ThemedView>
      <ThemedText>
        {t('aboutDescription')}
      </ThemedText>
      
      <Collapsible title={t('howItWorks')}>
        <ThemedText>
          {t('howItWorksDescription')}
        </ThemedText>
      </Collapsible>

      <Collapsible title={t('features')}>
        <ThemedText>{t('feature1')}</ThemedText>
        <ThemedText>{t('feature2')}</ThemedText>
        <ThemedText>{t('feature3')}</ThemedText>
        <ThemedText>{t('feature4')}</ThemedText>
      </Collapsible>

      <Collapsible title={t('privacyTitle')}>
        <ThemedText>
          {t('privacyDescription')}
        </ThemedText>
      </Collapsible>

      <ThemedView style={styles.languageSection}>
        <LanguageSwitcher />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#4A7C59',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  languageSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  stepText: {
    marginTop: 8,
  },
});
