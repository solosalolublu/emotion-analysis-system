'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  const [results, setResults] = useState<Emotions | null>(null);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Функция для анализа текста
  const analyzeText = async (inputText: string) => {
    if (!inputText.trim()) {
      setResults(null);
      return;
    }

    try {
      // Имитация запроса к API для анализа эмоций
      // В реальном приложении здесь будет запрос к API

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
    } catch (error) {
      console.error('Error analyzing text:', error);
      toast.error('Произошла ошибка при анализе текста');
    }
  };

  // Обработчик изменения текста с задержкой
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    // Очищаем предыдущий таймер
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Устанавливаем новый таймер для анализа после прекращения ввода
    if (newText.trim()) {
      const timeout = setTimeout(() => {
        analyzeText(newText);
      }, 1000); // Задержка в 1 секунду

      setTypingTimeout(timeout);
    } else {
      setResults(null);
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
            onChange={handleTextChange}
          />
        </CardContent>

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
