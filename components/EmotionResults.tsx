'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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

// Перевод названий эмоций на русский
const emotionLabels: Record<keyof Emotions, string> = {
  joy: 'Радость',
  surprise: 'Удивление',
  sadness: 'Грусть',
  anger: 'Гнев',
  disgust: 'Отвращение',
  contempt: 'Презрение',
  fear: 'Страх',
};

// Цвета для эмоций
const emotionColors: Record<keyof Emotions, string> = {
  joy: 'bg-yellow-400',
  surprise: 'bg-purple-400',
  sadness: 'bg-blue-400',
  anger: 'bg-red-500',
  disgust: 'bg-green-500',
  contempt: 'bg-gray-500',
  fear: 'bg-indigo-500',
};

interface EmotionResultsProps {
  emotions: Emotions;
}

export function EmotionResults({ emotions }: EmotionResultsProps) {
  // Сортируем эмоции по убыванию значения
  const sortedEmotions = Object.entries(emotions)
    .sort(([, valueA], [, valueB]) => valueB - valueA)
    .map(([key, value]) => ({
      key: key as keyof Emotions,
      value: Math.round(value * 10) / 10, // Округляем до 1 десятичного знака
    }));

  // Находим доминирующую эмоцию
  const dominantEmotion = sortedEmotions[0];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Доминирующая эмоция</h3>
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${emotionColors[dominantEmotion.key]}`}></div>
              <span className="font-semibold">{emotionLabels[dominantEmotion.key]}</span>
              <span className="text-muted-foreground">({dominantEmotion.value} / 10)</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Все эмоции</h3>
            {sortedEmotions.map(({ key, value }) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${emotionColors[key]}`}></div>
                    <span>{emotionLabels[key]}</span>
                  </div>
                  <span className="text-muted-foreground">{value} / 10</span>
                </div>
                <Progress 
                  value={value * 10} 
                  className={`h-2 ${emotionColors[key]} bg-secondary`} 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
