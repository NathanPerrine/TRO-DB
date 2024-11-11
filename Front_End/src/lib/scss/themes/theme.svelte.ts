import { browser } from '$app/environment';
import themesData from './themes.json';
import type { Theme } from './themes';

function createThemeState() {
  const defaultTheme = themesData.themes[0];

  // Get initial theme from localStorage or default
  const getInitialTheme = (): Theme => {
    if (!browser) return defaultTheme;

    try {
      const stored = localStorage.getItem('theme');
      if (stored) {
        const parsedTheme = JSON.parse(stored);
        return themesData.themes.find((t) => t.name === parsedTheme.name) || defaultTheme;
      }
    } catch (e) {
      console.error('Error reading theme from localStorage:', e);
    }
    return defaultTheme;
  };

  let theme = $state(getInitialTheme());

  function setTheme(newTheme: Theme) {
    theme = newTheme;
    if (browser) {
      localStorage.setItem('theme', JSON.stringify(newTheme));
      updateCSSVariables(newTheme);
    }
  }

  function updateCSSVariables(theme: Theme) {
    if (!browser) return;

    const root = document.documentElement;
    Object.entries(theme.variables).forEach(([key, value]) => {
      root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
  }

  return {
    theme,
    setTheme,
    themes: themesData.themes
  };
}

export const themeState = createThemeState();
