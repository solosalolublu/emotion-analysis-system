'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

type AuthMode = 'login' | 'register';

// Схема валидации для формы входа
const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

// Схема валидации для формы регистрации
const registerSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
});

// Тип для значений формы
type FormValues = z.infer<typeof loginSchema>;

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);

  // Используем разные схемы валидации в зависимости от режима
  const form = useForm<FormValues>({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    form.reset();
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    try {
      // Проверяем, находимся ли мы в демо-режиме
      const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-supabase-url';

      // В демо-режиме добавляем задержку для имитации запроса к серверу
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (mode === 'register') {
        // Регистрация нового пользователя
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            // Данные для профиля пользователя
            data: {
              registered_at: new Date().toISOString(),
            },
          },
        });

        if (error) throw error;

        // Проверяем, требуется ли подтверждение email
        if (data?.user?.identities?.length === 0) {
          toast.error('Пользователь с таким email уже существует');
        } else {
          toast.success('Регистрация успешна! Проверьте вашу почту для подтверждения.');

          // В демо-режиме автоматически переключаемся на форму входа
          if (isDemoMode) {
            setMode('login');
            form.reset();
          }
        }
      } else {
        // Вход существующего пользователя
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) throw error;

        toast.success('Вход выполнен успешно!');

        // Перенаправляем на панель управления
        window.location.href = '/dashboard';
      }
    } catch (error: any) {
      console.error('Auth error:', error);

      // Обработка различных ошибок аутентификации
      if (error.message.includes('Email not confirmed')) {
        toast.error('Email не подтвержден. Проверьте вашу почту для подтверждения.');
      } else if (error.message.includes('Invalid login credentials')) {
        toast.error('Неверный email или пароль');
      } else if (error.message.includes('Email already registered')) {
        toast.error('Пользователь с таким email уже существует');
      } else {
        toast.error(error.message || 'Произошла ошибка при аутентификации');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-purple-200 dark:border-purple-800 shadow-md">
      <CardHeader className="card-header">
        <CardTitle className="gradient-text">{mode === 'login' ? 'Вход' : 'Регистрация'}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              type="submit"
              className="w-full btn-primary"
              disabled={isLoading}
            >
              {isLoading
                ? (mode === 'login' ? 'Вход...' : 'Регистрация...')
                : (mode === 'login' ? 'Войти' : 'Зарегистрироваться')}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={toggleMode}
              className="w-full text-primary hover:text-primary/80"
            >
              {mode === 'login'
                ? 'Нет аккаунта? Зарегистрироваться'
                : 'Уже есть аккаунт? Войти'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
