// Типы эмоций
export type Emotion = 'joy' | 'surprise' | 'sadness' | 'anger' | 'disgust' | 'contempt' | 'fear';

// Результат анализа эмоций
export type EmotionAnalysisResult = {
  [key in Emotion]: number; // Интенсивность от 0 до 10
};

// Функция для анализа эмоций в тексте
// В реальном приложении здесь будет вызов API для анализа эмоций
export async function analyzeEmotions(text: string): Promise<EmotionAnalysisResult> {
  try {
    // В MVP используем заглушку для демонстрации
    // В реальном приложении здесь будет вызов API

    // Имитация задержки API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Для демонстрации генерируем случайные значения
    // В реальном приложении здесь будет обработка ответа от API
    return {
      joy: Math.floor(Math.random() * 11),
      surprise: Math.floor(Math.random() * 11),
      sadness: Math.floor(Math.random() * 11),
      anger: Math.floor(Math.random() * 11),
      disgust: Math.floor(Math.random() * 11),
      contempt: Math.floor(Math.random() * 11),
      fear: Math.floor(Math.random() * 11),
    };
  } catch (error) {
    console.error('Error analyzing emotions:', error);
    throw new Error('Failed to analyze emotions');
  }
}

// Функция для получения русских названий эмоций
export function getEmotionName(emotion: Emotion): string {
  const emotionNames: Record<Emotion, string> = {
    joy: 'Радость',
    surprise: 'Удивление',
    sadness: 'Печаль',
    anger: 'Гнев',
    disgust: 'Отвращение',
    contempt: 'Презрение',
    fear: 'Страх',
  };

  return emotionNames[emotion];
}

// Функция для получения цветов для визуализации эмоций
export function getEmotionColor(emotion: Emotion): string {
  const emotionColors: Record<Emotion, string> = {
    joy: '#FF85C0', // Розовый
    surprise: '#BF7FF5', // Светло-фиолетовый
    sadness: '#9370DB', // Средний пурпурный
    anger: '#FF5C8D', // Ярко-розовый
    disgust: '#C77DFF', // Фиолетовый
    contempt: '#A359FF', // Темно-фиолетовый
    fear: '#D14BFF', // Пурпурный
  };

  return emotionColors[emotion];
}
