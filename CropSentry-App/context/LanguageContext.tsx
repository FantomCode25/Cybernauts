import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../translations';
import { translateText, supportedLanguages } from '../services/translateService';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
  translate: (text: string) => Promise<string>;
  supportedLanguages: { code: string; name: string; }[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState(i18n.locale);

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('userLanguage');
        if (savedLanguage) {
          i18n.locale = savedLanguage;
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      }
    };
    loadSavedLanguage();
  }, []);

  const setLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem('userLanguage', lang);
      i18n.locale = lang;
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const translate = async (text: string): Promise<string> => {
    try {
      const cacheKey = `translation_${language}_${text}`;
      const cachedTranslation = await AsyncStorage.getItem(cacheKey);
      
      if (cachedTranslation) {
        return cachedTranslation;
      }

      const translatedText = await translateText(text, language);
      await AsyncStorage.setItem(cacheKey, translatedText);
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate, supportedLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}