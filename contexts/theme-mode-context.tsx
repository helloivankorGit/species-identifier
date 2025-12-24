import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'auto';
type ColorScheme = 'light' | 'dark';

interface ThemeModeContextType {
  themeMode: ThemeMode;
  colorScheme: ColorScheme;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

const THEME_MODE_STORAGE_KEY = '@species_identifier_theme_mode';

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const deviceColorScheme = useDeviceColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('auto');
  const [colorScheme, setColorScheme] = useState<ColorScheme>(deviceColorScheme || 'light');

  const isValidThemeMode = (mode: string): boolean => {
    return ['light', 'dark', 'auto'].includes(mode);
  };

  const loadThemeMode = async () => {
    try {
      const savedThemeMode = await AsyncStorage.getItem(THEME_MODE_STORAGE_KEY);
      if (savedThemeMode && isValidThemeMode(savedThemeMode)) {
        setThemeModeState(savedThemeMode as ThemeMode);
      }
    } catch (error) {
      console.error('Failed to load theme mode preference:', error);
    }
  };

  useEffect(() => {
    loadThemeMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Update color scheme when theme mode or device scheme changes
    if (themeMode === 'auto') {
      setColorScheme(deviceColorScheme || 'light');
    } else {
      setColorScheme(themeMode as ColorScheme);
    }
  }, [themeMode, deviceColorScheme]);

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Failed to save theme mode preference:', error);
    }
  };

  const toggleTheme = () => {
    // Toggle between light and dark (skip auto)
    const newMode = colorScheme === 'dark' ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  return (
    <ThemeModeContext.Provider value={{ themeMode, colorScheme, setThemeMode, toggleTheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
}
