type Theme = 'light' | 'dark';

export const getThemeColors = (theme: Theme) => {
  return {
    background: theme === 'dark' ? '#121212' : '#ffffff',
    text: theme === 'dark' ? '#ffffff' : '#000000',
    card: theme === 'dark' ? '#1e1e1e' : '#f8f8f8',
    border: theme === 'dark' ? '#333' : '#ddd',
    primary: '#2e86de',
    accent: theme === 'dark' ? '#bb86fc' : '#6200ee',
  };
};
