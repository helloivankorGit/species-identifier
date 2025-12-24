import { Language } from '@/constants/translations';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Get API key from environment variable or use direct key
// For production, use environment variables. For development, you can hardcode it here.
const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY;
if (!API_KEY) {
  throw new Error('Google AI API key is not defined. Please set EXPO_PUBLIC_GOOGLE_AI_API_KEY.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface IdentificationResult {
  commonName: string;
  scientificName: string;
  classification: string;
  habitat: string;
  diet: string;
  behavior: string;
  conservationStatus: string;
  interestingFacts: string[];
  confidence: string;
}

export async function identifyAnimalOrInsect(
  imageUri: string,
  language: Language = 'uk'
): Promise<IdentificationResult | null> {
  try {
    // Use the latest Gemini Flash model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-flash-latest'
    });

    // Convert image to base64
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });

    const languageInstructions = language === 'uk' 
      ? 'Відповідай УКРАЇНСЬКОЮ МОВОЮ. Всю інформацію надавай українською.'
      : 'Respond in ENGLISH. Provide all information in English.';

    const prompt = `${languageInstructions}

Analyze this image and identify the animal or insect. Provide detailed information in the following JSON format:
{
  "commonName": "${language === 'uk' ? 'Звичайна назва виду' : 'Common name of the species'}",
  "scientificName": "${language === 'uk' ? 'Наукова назва (рід та вид)' : 'Scientific name (genus and species)'}",
  "classification": "${language === 'uk' ? 'Царство, Тип, Клас, Ряд, Родина' : 'Kingdom, Phylum, Class, Order, Family'}",
  "habitat": "${language === 'uk' ? 'Де цей вид зазвичай живе' : 'Where this species typically lives'}",
  "diet": "${language === 'uk' ? 'Чим харчується цей вид' : 'What this species eats'}",
  "behavior": "${language === 'uk' ? 'Ключові поведінкові характеристики' : 'Key behavioral characteristics'}",
  "conservationStatus": "${language === 'uk' ? 'Природоохоронний статус (наприклад, Найменший ризик, Під загрозою тощо)' : 'Conservation status (e.g., Least Concern, Endangered, etc.)'}",
  "interestingFacts": ["${language === 'uk' ? 'факт 1' : 'fact 1'}", "${language === 'uk' ? 'факт 2' : 'fact 2'}", "${language === 'uk' ? 'факт 3' : 'fact 3'}"],
  "confidence": "${language === 'uk' ? 'Твій рівень впевненості у цьому визначенні (Висока/Середня/Низька)' : 'Your confidence level in this identification (High/Medium/Low)'}"
}

${language === 'uk' ? 'Якщо не можеш впевнено визначити вид, вкажи це у відповіді. ВСЯ ІНФОРМАЦІЯ МАЄ БУТИ УКРАЇНСЬКОЮ!' : 'If you cannot identify the species with confidence, please indicate this in the response.'}`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64,
        },
      },
    ]);

    const text = result.response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0]);
      return data;
    }

    return null;
  } catch (error) {
    console.error('Error identifying animal/insect:', error);
    throw error;
  }
}
