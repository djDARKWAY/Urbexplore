import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#181C20');

  return (
    <ThemeContext.Provider
      value={{
        backgroundColor,
        setBackgroundColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
