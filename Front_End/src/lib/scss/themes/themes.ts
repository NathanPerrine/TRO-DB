import themesData from './themes.json';

export interface Theme {
  name: string;
  variables: {
    colorBackground: string;
    colorText: string;
    colorTextAccent: string;
    colorAccent: string;
    colorAccentHover: string;
    colorHover: string;
    colorBorder: string;
    colorHeader: string;
    colorButtonBg: string;
    colorButtonHover: string;
    colorButtonText: string;
    colorInactive: string;
    colorDivider: string;
  };
}

export const themes: Theme[] = themesData.themes;
