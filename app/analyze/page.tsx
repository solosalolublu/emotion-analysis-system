'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { EmotionResults } from '@/components/EmotionResults';

// Типы эмоций
type Emotions = {
  joy: number;
  surprise: number;
  sadness: number;
  anger: number;
  disgust: number;
  contempt: number;
  fear: number;
};

export default function AnalyzePage() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<Emotions | null>(null);

  // Функция для анализа текста
  const analyzeText = async () => {
    if (!text.trim()) {
      toast.error('Пожалуйста, введите текст для анализа');
      return;
    }

    setIsAnalyzing(true);
    setResults(null);

    try {
      // Имитация запроса к API для анализа эмоций
      // В реальном приложении здесь будет запрос к API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Генерируем случайные результаты для демонстрации
      // В реальном приложении здесь будут результаты от API
      const mockResults: Emotions = {
        joy: Math.random() * 10,
        surprise: Math.random() * 10,
        sadness: Math.random() * 10,
        anger: Math.random() * 10,
        disgust: Math.random() * 10,
        contempt: Math.random() * 10,
        fear: Math.random() * 10,
      };

      setResults(mockResults);
      toast.success('Анализ завершен');
    } catch (error) {
      console.error('Error analyzing text:', error);
      toast.error('Произошла ошибка при анализе текста');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Анализ эмоций в тексте</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Введите текст для анализа</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Введите текст для анализа эмоций..."
            className="min-h-[200px] resize-y"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={analyzeText}
            disabled={isAnalyzing || !text.trim()}
            className="btn-primary"
          >
            {isAnalyzing ? 'Анализ...' : 'Начать анализ'}
          </Button>
        </CardFooter>
      </Card>

      {results && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Результаты анализа</h2>
          <EmotionResults emotions={results} />

          <div className="mt-8 p-4 border border-primary-translucent rounded-lg bg-secondary">
            <h3 className="text-lg font-medium mb-2">Хотите сохранить результаты?</h3>
            <p className="mb-4">Зарегистрируйтесь или войдите в систему, чтобы сохранять историю анализов и получить доступ к расширенным функциям.</p>
            <div className="flex">
              <Button className="btn-primary" onClick={() => window.location.href = '/auth'}>
                Войти в систему
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
