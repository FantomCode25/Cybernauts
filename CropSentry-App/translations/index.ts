import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const translations = {
  en: {
    welcome: 'Welcome Back!',
    appName: 'CropSentry',
    subHeader: 'Your smart companion for plant disease detection',
    healthyPlants: 'Healthy Plants,',
    healthyLife: 'Healthy Life',
    cardDescription: 'Detect diseases early and protect your crops efficiently',
    quickActions: 'Quick Actions',
    capturePlant: 'Capture Plant Image',
    captureSubtext: 'Identify diseases instantly',
    plantHealth: 'Plant Health Literacy',
    plantHealthSubtext: 'Learn prevention techniques',
    dailyTip: 'Daily Tip',
    waterTip: 'Water your plants early in the morning for best results and to prevent fungal diseases!',
    yourActivity: 'Your Activity',
    plantsAnalyzed: 'Plants Analyzed',
    reportsGenerated: 'Reports Generated',
    version: 'CropSentry v1.0',
    profile: 'Profile Page',
    languageSettings: 'Language Settings',
    selectLanguage: 'Select Language',
    plantHealthReport: 'Plant Health Report',
    diagnosisResult: 'Diagnosis Result',
    detectedIssue: 'Detected Issue',
    confidence: 'Confidence',
    high: 'High',
    analyzedImage: 'Analyzed Image',
    about: 'About',
    diseaseDescription: '{{name}} is a common plant disease that affects various crops and can cause significant damage if left untreated. Early detection and treatment are essential.',
    possibleCauses: 'Possible Causes',
    recommendedTreatment: 'Recommended Treatment',
    preventionTips: 'Prevention Tips',
    backToCapture: 'Back to Capture'
  },
  hi: {
    welcome: 'वापस स्वागत है!',
    appName: 'क्रॉपसेंट्री',
    subHeader: 'पौधों की बीमारी का पता लगाने के लिए आपका स्मार्ट साथी',
    healthyPlants: 'स्वस्थ पौधे,',
    healthyLife: 'स्वस्थ जीवन',
    cardDescription: 'जल्दी बीमारियों का पता लगाएं और अपनी फसलों की कुशलतापूर्वक रक्षा करें',
    quickActions: 'त्वरित कार्य',
    capturePlant: 'पौधे की छवि कैप्चर करें',
    captureSubtext: 'तुरंत बीमारियों की पहचान करें',
    plantHealth: 'पौधों की स्वास्थ्य साक्षरता',
    plantHealthSubtext: 'रोकथाम तकनीकें सीखें',
    dailyTip: 'दैनिक सुझाव',
    waterTip: 'सर्वोत्तम परिणामों के लिए और कवक रोगों को रोकने के लिए अपने पौधों को सुबह जल्दी पानी दें!',
    yourActivity: 'आपकी गतिविधि',
    plantsAnalyzed: 'विश्लेषित पौधे',
    reportsGenerated: 'उत्पन्न रिपोर्ट',
    version: 'क्रॉपसेंट्री v1.0',
    profile: 'प्रोफ़ाइल पेज',
    languageSettings: 'भाषा सेटिंग्स',
    selectLanguage: 'भाषा चुनें'
  },
  mr: {
    welcome: 'पुन्हा स्वागत आहे!',
    appName: 'क्रॉपसेंट्री',
    subHeader: 'वनस्पती रोग शोधण्यासाठी तुमचा स्मार्ट साथीदार',
    healthyPlants: 'निरोगी वनस्पती,',
    healthyLife: 'निरोगी जीवन',
    cardDescription: 'लवकर रोग शोधा आणि तुमची पिके कार्यक्षमतेने संरक्षित करा',
    quickActions: 'जलद क्रिया',
    capturePlant: 'वनस्पतीचा फोटो काढा',
    captureSubtext: 'त्वरित रोग ओळखा',
    plantHealth: 'वनस्पती आरोग्य साक्षरता',
    plantHealthSubtext: 'प्रतिबंधात्मक तंत्रे शिका',
    dailyTip: 'दैनिक टीप',
    waterTip: 'सर्वोत्तम परिणामांसाठी आणि बुरशीजन्य रोग टाळण्यासाठी तुमच्या वनस्पतींना सकाळी लवकर पाणी द्या!',
    yourActivity: 'तुमची क्रियाकलाप',
    plantsAnalyzed: 'विश्लेषित वनस्पती',
    reportsGenerated: 'तयार केलेले अहवाल',
    version: 'क्रॉपसेंट्री v1.0',
    profile: 'प्रोफाइल पृष्ठ',
    languageSettings: 'भाषा सेटिंग्ज',
    selectLanguage: 'भाषा निवडा'
  },
  ta: {
    welcome: 'மீண்டும் வரவேற்கிறோம்!',
    appName: 'க்ராப்செந்ட்ரி',
    subHeader: 'தாவர நோய் கண்டறிதலுக்கான உங்கள் ஸ்மார்ட் துணை',
    healthyPlants: 'ஆரோக்கியமான தாவரங்கள்,',
    healthyLife: 'ஆரோக்கியமான வாழ்க்கை',
    cardDescription: 'நோய்களை முன்கூட்டியே கண்டறிந்து உங்கள் பயிர்களை திறமையாக பாதுகாக்கவும்',
    quickActions: 'விரைவு செயல்கள்',
    capturePlant: 'தாவர படத்தை எடுக்கவும்',
    captureSubtext: 'உடனடியாக நோய்களை அடையாளம் காணுங்கள்',
    plantHealth: 'தாவர ஆரோக்கிய கல்வியறிவு',
    plantHealthSubtext: 'தடுப்பு நுட்பங்களைக் கற்றுக்கொள்ளுங்கள்',
    dailyTip: 'தினசரி குறிப்பு',
    waterTip: 'சிறந்த முடிவுகளுக்கும் பூஞ்சை நோய்களைத் தடுக்கவும் உங்கள் தாவரங்களுக்கு அதிகாலையில் தண்ணீர் ஊற்றவும்!',
    yourActivity: 'உங்கள் செயல்பாடு',
    plantsAnalyzed: 'பகுப்பாய்வு செய்யப்பட்ட தாவரங்கள்',
    reportsGenerated: 'உருவாக்கப்பட்ட அறிக்கைகள்',
    version: 'க்ராப்செந்ட்ரி v1.0',
    profile: 'சுயவிவரப் பக்கம்',
    languageSettings: 'மொழி அமைப்புகள்',
    selectLanguage: 'மொழியை தேர்ந்தெடுக்கவும்'
  },
  te: {
    welcome: 'తిరిగి స్వాగతం!',
    appName: 'క్రాప్సెంట్రీ',
    subHeader: 'మొక్క వ్యాధి గుర్తింపు కోసం మీ స్మార్ట్ సహచరుడు',
    healthyPlants: 'ఆరోగ్యకరమైన మొక్కలు,',
    healthyLife: 'ఆరోగ్యకరమైన జీవితం',
    cardDescription: 'వ్యాధులను ముందుగానే గుర్తించి మీ పంటలను సమర్థవంతంగా రక్షించుకోండి',
    quickActions: 'త్వరిత చర్యలు',
    capturePlant: 'మొక్క చిత్రాన్ని తీయండి',
    captureSubtext: 'వెంటనే వ్యాధులను గుర్తించండి',
    plantHealth: 'మొక్క ఆరోగ్య అక్షరాస్యత',
    plantHealthSubtext: 'నివారణ పద్ధతులను నేర్చుకోండి',
    dailyTip: 'రోజువారీ చిట్కా',
    waterTip: 'ఉత్తమ ఫలితాల కోసం మరియు శిలీంధ్ర వ్యాధులను నివారించడానికి మీ మొక్కలకు ఉదయం ముందుగానే నీరు పెట్టండి!',
    yourActivity: 'మీ కార్యకలాపం',
    plantsAnalyzed: 'విశ్లేషించిన మొక్కలు',
    reportsGenerated: 'రూపొందించిన నివేదికలు',
    version: 'క్రాప్సెంట్రీ v1.0',
    profile: 'ప్రొఫైల్ పేజీ',
    languageSettings: 'భాషా సెట్టింగ్స్',
    selectLanguage: 'భాషను ఎంచుకోండి'
  }

};

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

export default i18n;