'use client';

import { useState } from 'react';
import { TextAnalysisForm } from '@/components/TextAnalysisForm';
import { EmotionChart } from '@/components/EmotionChart';
import { EmotionAnalysisResult } from '@/lib/emotion-analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const [analysisResult, setAnalysisResult] = useState<EmotionAnalysisResult | null>(null);
  const { user, loading } = useAuth();

  // Перенаправляем неавторизованных пользователей на страницу аутентификации
  if (!loading && !user) {
    redirect('/auth');
  }

  const handleAnalysisComplete = (result: EmotionAnalysisResult) => {
    setAnalysisResult(result);
  };

  return (
    <div className="space-y-8">
      <div className="gradient-bg p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2 gradient-text">
          Панель управления
        </h1>
        <p className="text-muted-foreground">
          Анализируйте эмоциональный тон текста и просматривайте результаты
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TextAnalysisForm onAnalysisComplete={handleAnalysisComplete} />

        {analysisResult ? (
          <EmotionChart result={analysisResult} />
        ) : (
          <Card className="border-purple-200 dark:border-purple-800 shadow-md">
            <CardHeader className="card-header">
              <CardTitle className="gradient-text">Результаты анализа</CardTitle>
              <CardDescription>
                Здесь будут отображаться результаты анализа эмоций
              </CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Введите текст в форму слева и нажмите "Анализировать" для получения результатов
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
