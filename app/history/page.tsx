'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { TextAnalysis } from '@/lib/supabase';
import { EmotionChart } from '@/components/EmotionChart';
import { redirect } from 'next/navigation';

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<TextAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  
  // Перенаправляем неавторизованных пользователей на страницу аутентификации
  if (!authLoading && !user) {
    redirect('/auth');
  }

  useEffect(() => {
    const fetchAnalyses = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // В реальном приложении здесь будет запрос к Supabase
        // Для MVP используем заглушку
        
        // Имитация задержки запроса
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Заглушка для истории анализов
        const mockAnalyses: TextAnalysis[] = [
          {
            id: '1',
            user_id: user.id,
            text_content: 'Это был прекрасный день! Я очень доволен результатами.',
            source: 'manual',
            emotions: {
              joy: 8,
              surprise: 2,
              sadness: 0,
              anger: 0,
              disgust: 0,
              contempt: 0,
              fear: 0,
            },
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            user_id: user.id,
            text_content: 'Меня очень расстроила эта новость. Не ожидал такого поворота событий.',
            source: 'manual',
            emotions: {
              joy: 0,
              surprise: 6,
              sadness: 7,
              anger: 3,
              disgust: 1,
              contempt: 0,
              fear: 2,
            },
            created_at: new Date(Date.now() - 86400000).toISOString(), // вчера
          },
        ];
        
        setAnalyses(mockAnalyses);
      } catch (error) {
        console.error('Error fetching analyses:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalyses();
  }, [user]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">История анализов</h1>
        <p className="text-muted-foreground">
          Просмотр результатов предыдущих анализов эмоций
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10">Загрузка истории анализов...</div>
      ) : analyses.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p>У вас пока нет истории анализов. Перейдите на панель управления, чтобы выполнить анализ.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {analyses.map((analysis) => (
            <Card key={analysis.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg">
                  Анализ от {new Date(analysis.created_at).toLocaleDateString('ru-RU')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 p-4 bg-muted rounded-md">
                  <p className="whitespace-pre-wrap">{analysis.text_content}</p>
                </div>
                <div className="h-64">
                  <EmotionChart result={analysis.emotions} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
