import { useThemeMode } from '@/contexts/theme-mode-context';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const { colorScheme } = useThemeMode();
  return colorScheme;
}
