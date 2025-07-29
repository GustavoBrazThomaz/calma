import {
  ConfigProvider,
  theme as antdTheme,
  theme,
  type ThemeConfig,
} from "antd";
import React, { createContext, useContext, useState } from "react";

type ThemeMode = "light" | "dark";

type ThemeContextType = {
  mode: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeController = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("useThemeController must be used inside ThemeProvider");
  }
  return themeContext;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = theme.useToken();
  const localStorageTheme =
    window.localStorage.getItem("theme") === "dark" ? "dark" : "light";
  const [mode, setMode] = useState<ThemeMode>(localStorageTheme);

  const toggleTheme = () => {
    setMode((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      window.localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const themeConfig: ThemeConfig = {
    algorithm:
      mode === "light" ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm,
    token: {
      colorPrimary: token.orange6,
    },
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};
