'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();

  // Функция для выхода из системы
  const handleSignOut = async () => {
    await signOut();
    // Перенаправляем на главную страницу
    window.location.href = '/';
  };

  return (
    <nav className="border-b gradient-bg">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="font-bold text-xl gradient-text">
          Анализ эмоций
        </Link>

        <div style={{ marginLeft: 'auto' }} className="flex items-center space-x-4">
          {!loading && (
            <>
              {user ? (
                <>
                  <Link href="/dashboard" passHref>
                    <Button
                      variant={pathname === '/dashboard' ? 'default' : 'ghost'}
                    >
                      Панель управления
                    </Button>
                  </Link>
                  <Link href="/history" passHref>
                    <Button
                      variant={pathname === '/history' ? 'default' : 'ghost'}
                    >
                      История анализов
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={handleSignOut}>
                    Выйти
                  </Button>
                </>
              ) : (
                <Link href="/auth" passHref>
                  <Button
                    variant={pathname === '/auth' ? 'default' : 'ghost'}
                  >
                    Войти
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
