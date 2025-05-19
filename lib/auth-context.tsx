'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Выполняем только на стороне клиента
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    // Получаем текущую сессию
    const getSession = async () => {
      setLoading(true);
      try {
        // Проверяем, есть ли сохраненное состояние аутентификации в localStorage
        // Это нужно для демо-режима, чтобы сохранять состояние между перезагрузками страницы
        const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
          process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-supabase-url';

        if (isDemoMode) {
          const isAuthenticated = localStorage.getItem('demo_authenticated') === 'true';

          if (isAuthenticated) {
            // Создаем фиктивного пользователя и сессию для демо-режима
            const mockUser = {
              id: 'demo-user-id',
              email: 'demo@example.com',
              created_at: new Date().toISOString(),
            };

            setUser(mockUser as any);
            setSession({ user: mockUser } as any);
          } else {
            setUser(null);
            setSession(null);
          }
        } else {
          // Реальный запрос к Supabase
          const { data: { session } } = await supabase.auth.getSession();
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Подписываемся на изменения аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Сохраняем состояние аутентификации в localStorage для демо-режима
        const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
          process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-supabase-url';

        if (isDemoMode && typeof window !== 'undefined') {
          localStorage.setItem('demo_authenticated', session ? 'true' : 'false');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();

    // Для демо-режима очищаем состояние аутентификации в localStorage
    if (typeof window !== 'undefined') {
      const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-supabase-url';

      if (isDemoMode) {
        localStorage.removeItem('demo_authenticated');
      }
    }
  };

  const value = {
    session,
    user,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
