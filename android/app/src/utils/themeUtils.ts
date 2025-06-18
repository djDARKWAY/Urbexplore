export const getDynamicPalette = (backgroundColor: string) => {
  const isDark = backgroundColor === '#181C20' || backgroundColor === '#000' || backgroundColor === '#1e1e1e';
  return {
    background: backgroundColor,
    primary: '#FFFFFF',
    textSecondary: '#FFFFFF',
  };
};
