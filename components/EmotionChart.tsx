'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmotionAnalysisResult, Emotion, getEmotionName, getEmotionColor } from '@/lib/emotion-analysis';

interface EmotionChartProps {
  result: EmotionAnalysisResult;
}

export function EmotionChart({ result }: EmotionChartProps) {
  // Преобразуем результат анализа в формат для графика
  const data = Object.entries(result).map(([emotion, value]) => ({
    name: getEmotionName(emotion as Emotion),
    value,
    color: getEmotionColor(emotion as Emotion),
  }));

  return (
    <Card className="w-full border-purple-200 dark:border-purple-800 shadow-md">
      <CardHeader className="card-header">
        <CardTitle className="gradient-text">Результаты анализа эмоций</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e9d5ff" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis domain={[0, 10]} />
              <Tooltip
                formatter={(value) => [`${value}/10`, 'Интенсивность']}
                labelFormatter={(name) => `Эмоция: ${name}`}
              />
              {data.map((entry, index) => (
                <Bar
                  key={`bar-${index}`}
                  dataKey="value"
                  fill={entry.color}
                  name={entry.name}
                  // Фильтруем данные, чтобы отображать только одну эмоцию для каждого бара
                  data={[entry]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
