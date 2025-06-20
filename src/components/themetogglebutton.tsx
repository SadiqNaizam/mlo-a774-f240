import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeProvider';
import { Button } from '@/components/ui/button';

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // Determine the current effective theme if 'system' is selected
  const getCurrentEffectiveTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };

  const effectiveTheme = getCurrentEffectiveTheme();

  const toggleTheme = () => {
    setTheme(effectiveTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} aria-label={`Switch to ${effectiveTheme === 'dark' ? 'light' : 'dark'} mode`}>
      {effectiveTheme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
};

export default ThemeToggleButton;