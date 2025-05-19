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
      <div className="container nav-container flex h-16 items-center px-4 relative">
        {/* Логотип слева */}
        <div className="nav-logo-container">
          <Link href="/" className="font-bold text-xl gradient-text">
            Анализ эмоций
          </Link>
        </div>

        {/* Кнопка "Проверить эмоции" по центру - видима на десктопе */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center hidden md:flex">
          <Link href="/analyze" passHref>
            <Button
              className="btn-primary-large"
            >
              Проверить эмоции
            </Button>
          </Link>
        </div>

        {/* Навигация справа */}
        <div style={{ marginLeft: 'auto' }} className="flex items-center space-x-4">
          {!loading && (
            <>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`nav-link ${pathname === '/dashboard' ? 'nav-link-active' : ''}`}
                  >
                    Панель управления
                  </Link>
                  <Link
                    href="/history"
                    className={`nav-link ${pathname === '/history' ? 'nav-link-active' : ''}`}
                  >
                    История анализов
                  </Link>
                  <Button
                    className="btn-secondary"
                    onClick={handleSignOut}
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <Link href="/auth" passHref>
                  <Button
                    className="btn-primary"
                  >
                    Войти
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>

        {/* Кнопка "Проверить эмоции" - видима только на мобильных */}
        <div className="nav-center-button md:hidden mt-2">
          <Link href="/analyze" passHref>
            <Button
              className="btn-primary-large w-full"
            >
              Проверить эмоции
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
