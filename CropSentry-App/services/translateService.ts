import axios from 'axios';

const LIBRETRANSLATE_API_URL = 'https://libretranslate.com/api';

interface TranslationRequest {
  q: string;
  source: string;
  target: string;
  format?: string;
}

interface DetectionRequest {
  q: string;
}

export const supportedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ta', name: 'Tamil' }
];

export async function detectLanguage(text: string): Promise<string> {
  try {
    const response = await axios.post(`${LIBRETRANSLATE_API_URL}/detect`, {
      q: text
    } as DetectionRequest);
    return response.data[0].language;
  } catch (error) {
    console.error('Error detecting language:', error);
    return 'en'; // Default to English on error
  }
}

export async function translateText(text: string, targetLang: string, sourceLang: string = 'auto'): Promise<string> {
  try {
    const response = await axios.post(`${LIBRETRANSLATE_API_URL}/translate`, {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text'
    } as TranslationRequest);
    return response.data.translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return text; // Return original text on error
  }
}

export async function translateBatch(texts: string[], targetLang: string, sourceLang: string = 'auto'): Promise<string[]> {
  try {
    const translations = await Promise.all(
      texts.map(text => translateText(text, targetLang, sourceLang))
    );
    return translations;
  } catch (error) {
    console.error('Error translating batch:', error);
    return texts; // Return original texts on error
  }
}