'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeEmotions, EmotionAnalysisResult } from '@/lib/emotion-analysis';
import { toast } from 'sonner';

interface TextAnalysisFormProps {
  onAnalysisComplete: (result: EmotionAnalysisResult) => void;
}

interface FormValues {
  text: string;
}

export function TextAnalysisForm({ onAnalysisComplete }: TextAnalysisFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      text: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!values.text.trim()) {
      toast.error('Пожалуйста, введите текст для анализа');
      return;
    }

    setIsLoading(true);

    try {
      const result = await analyzeEmotions(values.text);
      onAnalysisComplete(result);
      toast.success('Анализ успешно завершен');
    } catch (error) {
      console.error('Error during analysis:', error);
      toast.error('Произошла ошибка при анализе текста');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full border-purple-200 dark:border-purple-800 shadow-md">
      <CardHeader className="card-header">
        <CardTitle className="gradient-text">Анализ эмоций в тексте</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Введите текст для анализа</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Введите текст для анализа эмоций..."
                      className="min-h-32 border-purple-200 dark:border-purple-700 focus:border-purple-300 dark:focus:border-purple-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? 'Анализ...' : 'Анализировать'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
