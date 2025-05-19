import { createClient } from '@supabase/supabase-js';

// Создаем заглушку для Supabase
// Это позволит нам избежать ошибок при SSR
let supabase;

// Инициализируем Supabase только на стороне клиента
if (typeof window !== 'undefined') {
  // Для демо-режима используем заглушки
  // В реальном приложении здесь будут реальные URL и ключи Supabase
  const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-supabase-url';

  // Если мы в демо-режиме, используем заглушку для Supabase
  // В противном случае используем реальные значения
  const supabaseUrl = isDemoMode ? 'https://xyzcompany.supabase.co' : process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = isDemoMode ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdHd6c2Fvc2Jib3BrdnhyaHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NTU5MTgsImV4cCI6MjAwMDQzMTkxOH0.demo-key' : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  // Создаем клиент Supabase
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Создаем заглушку для SSR
  supabase = {
    auth: {
      signUp: async () => ({ data: null, error: null }),
      signInWithPassword: async () => ({ data: null, error: null }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    }
  };
}

// Экспортируем клиент Supabase
export { supabase };

// Заглушка для демо-режима
// Эмулирует основные функции Supabase Auth
if (typeof window !== 'undefined' && (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-supabase-url')) {
  // Переопределяем методы аутентификации для демо-режима
  const mockUser = {
    id: 'demo-user-id',
    email: 'demo@example.com',
    created_at: new Date().toISOString(),
  };

  // Заглушка для хранения состояния аутентификации
  let isAuthenticated = false;

  // Переопределяем методы аутентификации
  supabase.auth = {
    ...supabase.auth,
    signUp: async () => {
      isAuthenticated = true;
      return { data: { user: mockUser }, error: null };
    },
    signInWithPassword: async () => {
      isAuthenticated = true;
      return { data: { user: mockUser, session: { user: mockUser } }, error: null };
    },
    signOut: async () => {
      isAuthenticated = false;
      return { error: null };
    },
    getSession: async () => {
      return {
        data: {
          session: isAuthenticated ? { user: mockUser } : null
        },
        error: null
      };
    },
    onAuthStateChange: (callback) => {
      // Имитируем событие изменения состояния аутентификации
      if (isAuthenticated) {
        callback('SIGNED_IN', { user: mockUser });
      }

      // Возвращаем объект с методом unsubscribe
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    },
  };
}

// Типы для таблиц базы данных
export type User = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type TextAnalysis = {
  id: string;
  user_id: string;
  text_content: string;
  source: 'email' | 'telegram' | 'manual';
  emotions: {
    joy: number;
    surprise: number;
    sadness: number;
    anger: number;
    disgust: number;
    contempt: number;
    fear: number;
  };
  created_at: string;
};

export type TelegramMessage = {
  id: string;
  user_id: string;
  message_id: string;
  chat_id: string;
  text_content: string;
  created_at: string;
  analyzed: boolean;
};
