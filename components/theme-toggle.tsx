import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeMode } from '@/contexts/theme-mode-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet, TouchableOpacity } from 'react-native';

export function ThemeToggle() {
  const { colorScheme, toggleTheme } = useThemeMode();
  const iconColor = useThemeColor({}, 'icon');

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={styles.button}
      activeOpacity={0.7}
    >
      <IconSymbol
        name={colorScheme === 'dark' ? 'sun.max.fill' : 'moon.fill'}
        size={24}
        color={iconColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
