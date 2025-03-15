
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem("leaf-theme") as Theme | null;
    
    // Check system preference
    if (!storedTheme) {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return systemPrefersDark ? "dark" : "light";
    }
    
    return storedTheme || "light";
  });
  
  const { user, updateProfile, isAuthenticated } = useAuth();
  
  // Update DOM body class when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    localStorage.setItem("leaf-theme", theme);
    
    // If user is authenticated, update their preferences
    if (isAuthenticated && user?.preferences?.theme !== theme) {
      updateProfile({ 
        preferences: { 
          ...user?.preferences,
          theme 
        } 
      }).catch(console.error);
    }
  }, [theme, user, updateProfile, isAuthenticated]);
  
  // Sync theme with user preferences when logged in
  useEffect(() => {
    if (user?.preferences?.theme) {
      setTheme(user.preferences.theme);
    }
  }, [user]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
