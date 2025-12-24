// Translation strings for Ukrainian and English
export type Language = 'en' | 'uk';

export interface Translations {
  // App Header
  appTitle: string;
  appSubtitle: string;
  
  // Main Screen
  takePhoto: string;
  chooseFromLibrary: string;
  analyzingImage: string;
  tapToIdentify: string;
  newPhoto: string;
  newFromLibrary: string;
  
  // Results
  identificationResults: string;
  classification: string;
  habitat: string;
  diet: string;
  behavior: string;
  conservationStatus: string;
  interestingFacts: string;
  confidence: string;
  
  // Confidence Levels
  highConfidence: string;
  mediumConfidence: string;
  lowConfidence: string;
  
  // About Screen
  aboutTitle: string;
  aboutDescription: string;
  howItWorks: string;
  howItWorksDescription: string;
  features: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  privacyTitle: string;
  privacyDescription: string;
  
  // Theme
  themeTitle: string;
  themeDescription: string;
  
  // Tab Navigation
  identifierTab: string;
  aboutTab: string;
  
  // Errors
  identificationFailed: string;
  identificationFailedMessage: string;
  errorOccurred: string;
  
  // Permissions
  cameraPermissionTitle: string;
  cameraPermissionMessage: string;
  libraryPermissionTitle: string;
  libraryPermissionMessage: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // App Header
    appTitle: 'Species Identifier',
    appSubtitle: 'Discover wildlife with AI-powered identification',
    
    // Main Screen
    takePhoto: 'Take Photo',
    chooseFromLibrary: 'Choose from Library',
    analyzingImage: 'Analyzing image...',
    tapToIdentify: 'Take or choose a photo to identify an animal or insect',
    newPhoto: 'New Photo',
    newFromLibrary: 'New from Library',
    
    // Results
    identificationResults: 'Identification Results',
    classification: 'Classification',
    habitat: 'Habitat',
    diet: 'Diet',
    behavior: 'Behavior',
    conservationStatus: 'Conservation Status',
    interestingFacts: 'Interesting Facts',
    confidence: 'Confidence',
    
    // Confidence Levels
    highConfidence: 'High',
    mediumConfidence: 'Medium',
    lowConfidence: 'Low',
    
    // About Screen
    aboutTitle: 'About Species Identifier',
    aboutDescription: 'Species Identifier uses advanced AI to help you identify animals and insects from photos. Simply take a picture or choose one from your library, and our AI will provide detailed information about the species.',
    howItWorks: 'How It Works',
    howItWorksDescription: 'Our app uses Google\'s Gemini AI to analyze photos and identify species. The AI has been trained on millions of images and can recognize a wide variety of animals and insects.',
    features: 'Features',
    feature1: '📸 Take photos or choose from your library',
    feature2: '🤖 AI-powered species identification',
    feature3: '📚 Detailed information about each species',
    feature4: '🌍 Conservation status and interesting facts',
    privacyTitle: 'Privacy',
    privacyDescription: 'Your photos are processed securely and are not stored on our servers. All identification happens in real-time.',
    
    // Theme
    themeTitle: 'Theme Color',
    themeDescription: 'Choose your preferred color theme',
    
    // Tab Navigation
    identifierTab: 'Identifier',
    aboutTab: 'About',
    
    // Errors
    identificationFailed: 'Identification Failed',
    identificationFailedMessage: 'Could not identify the animal or insect. Please try another image.',
    errorOccurred: 'An error occurred',
    
    // Permissions
    cameraPermissionTitle: 'Camera Permission Required',
    cameraPermissionMessage: 'Please grant camera access to take photos.',
    libraryPermissionTitle: 'Photo Library Permission Required',
    libraryPermissionMessage: 'Please grant photo library access to choose images.',
  },
  
  uk: {
    // App Header
    appTitle: 'Визначник Видів',
    appSubtitle: 'Відкривайте дику природу за допомогою ШІ',
    
    // Main Screen
    takePhoto: 'Зробити Фото',
    chooseFromLibrary: 'Вибрати з Галереї',
    analyzingImage: 'Аналізую зображення...',
    tapToIdentify: 'Зробіть або виберіть фото для визначення тварини чи комахи',
    newPhoto: 'Нове Фото',
    newFromLibrary: 'Нове з Галереї',
    
    // Results
    identificationResults: 'Результати Визначення',
    classification: 'Класифікація',
    habitat: 'Середовище Проживання',
    diet: 'Раціон',
    behavior: 'Поведінка',
    conservationStatus: 'Природоохоронний Статус',
    interestingFacts: 'Цікаві Факти',
    confidence: 'Впевненість',
    
    // Confidence Levels
    highConfidence: 'Висока',
    mediumConfidence: 'Середня',
    lowConfidence: 'Низька',
    
    // About Screen
    aboutTitle: 'Про Визначник Видів',
    aboutDescription: 'Визначник Видів використовує передовий ШІ для допомоги у визначенні тварин та комах з фотографій. Просто зробіть знімок або виберіть його з галереї, і наш ШІ надасть детальну інформацію про вид.',
    howItWorks: 'Як Це Працює',
    howItWorksDescription: 'Наш додаток використовує Gemini AI від Google для аналізу фотографій та визначення видів. ШІ навчений на мільйонах зображень і може розпізнавати широкий спектр тварин та комах.',
    features: 'Можливості',
    feature1: '📸 Робіть фото або вибирайте з галереї',
    feature2: '🤖 Визначення видів за допомогою ШІ',
    feature3: '📚 Детальна інформація про кожен вид',
    feature4: '🌍 Природоохоронний статус та цікаві факти',
    privacyTitle: 'Конфіденційність',
    privacyDescription: 'Ваші фотографії обробляються безпечно і не зберігаються на наших серверах. Все визначення відбувається в реальному часі.',
    
    // Theme
    themeTitle: 'Колір Теми',
    themeDescription: 'Оберіть свій улюблений колір теми',
    
    // Tab Navigation
    identifierTab: 'Визначник',
    aboutTab: 'Про Додаток',
    
    // Errors
    identificationFailed: 'Визначення Не Вдалося',
    identificationFailedMessage: 'Не вдалося визначити тварину чи комаху. Будь ласка, спробуйте інше зображення.',
    errorOccurred: 'Сталася помилка',
    
    // Permissions
    cameraPermissionTitle: 'Потрібен Дозвіл Камери',
    cameraPermissionMessage: 'Будь ласка, надайте доступ до камери для зйомки фотографій.',
    libraryPermissionTitle: 'Потрібен Дозвіл Фотогалереї',
    libraryPermissionMessage: 'Будь ласка, надайте доступ до фотогалереї для вибору зображень.',
  },
};
