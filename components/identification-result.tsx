import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLanguage } from '@/contexts/language-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IdentificationResult } from '@/services/identifier';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface IdentificationResultProps {
  result: IdentificationResult;
}

export function IdentificationResultComponent({ result }: IdentificationResultProps) {
  const tintColor = useThemeColor({}, 'tint');
  const { t } = useLanguage();

  const InfoSection = ({ icon, title, content }: { icon: keyof typeof Ionicons.glyphMap, title: string, content: string }) => (
    <ThemedView style={styles.section}>
      <ThemedView style={styles.sectionHeader}>
        <Ionicons name={icon} size={20} color={tintColor} />
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          {title}
        </ThemedText>
      </ThemedView>
      <ThemedText style={styles.sectionContent}>{content}</ThemedText>
    </ThemedView>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.commonName}>
          {result.commonName}
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.scientificName}>
          {result.scientificName}
        </ThemedText>
        <ThemedView style={[styles.confidenceBadge, { 
          backgroundColor: result.confidence === 'High' || result.confidence === 'Висока' ? '#4CAF50' : 
                          result.confidence === 'Medium' || result.confidence === 'Середня' ? '#FF9800' : '#F44336' 
        }]}>
          <ThemedText style={styles.confidenceText}>
            {result.confidence} {t('confidence')}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <InfoSection 
        icon="list" 
        title={t('classification')}
        content={result.classification} 
      />

      <InfoSection 
        icon="location" 
        title={t('habitat')}
        content={result.habitat} 
      />

      <InfoSection 
        icon="nutrition" 
        title={t('diet')}
        content={result.diet} 
      />

      <InfoSection 
        icon="fitness" 
        title={t('behavior')}
        content={result.behavior} 
      />

      <InfoSection 
        icon="leaf" 
        title={t('conservationStatus')}
        content={result.conservationStatus} 
      />

      <ThemedView style={styles.section}>
        <ThemedView style={styles.sectionHeader}>
          <Ionicons name="bulb" size={20} color={tintColor} />
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            {t('interestingFacts')}
          </ThemedText>
        </ThemedView>
        {result.interestingFacts.map((fact, index) => (
          <ThemedView key={index} style={styles.factItem}>
            <ThemedText style={styles.factBullet}>•</ThemedText>
            <ThemedText style={styles.factText}>{fact}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  commonName: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  scientificName: {
    fontSize: 18,
    fontStyle: 'italic',
    opacity: 0.6,
    marginBottom: 16,
    fontWeight: '400',
  },
  confidenceBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 24,
  },
  confidenceText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 24,
    padding: 18,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 24,
    opacity: 0.75,
    fontWeight: '400',
  },
  factItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 4,
  },
  factBullet: {
    fontSize: 15,
    marginRight: 10,
    opacity: 0.6,
    fontWeight: '600',
  },
  factText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    opacity: 0.75,
  },
});
