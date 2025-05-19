import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

// Этот middleware будет выполняться для всех маршрутов
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Создаем клиент Supabase для middleware
  const supabase = createMiddlewareClient({ req, res });
  
  // Получаем текущую сессию
  const { data: { session } } = await supabase.auth.getSession();
  
  // Получаем текущий путь
  const path = req.nextUrl.pathname;
  
  // Список защищенных маршрутов
  const protectedRoutes = ['/dashboard', '/history'];
  
  // Список публичных маршрутов
  const publicRoutes = ['/', '/auth'];
  
  // Проверяем, является ли текущий маршрут защищенным
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  
  // Проверяем, является ли текущий маршрут публичным
  const isPublicRoute = publicRoutes.some(route => path === route || path.startsWith(route));
  
  // Если пользователь не аутентифицирован и пытается получить доступ к защищенному маршруту
  if (!session && isProtectedRoute) {
    // Перенаправляем на страницу аутентификации
    const redirectUrl = new URL('/auth', req.url);
    return NextResponse.redirect(redirectUrl);
  }
  
  // Если пользователь аутентифицирован и пытается получить доступ к странице аутентификации
  if (session && path === '/auth') {
    // Перенаправляем на панель управления
    const redirectUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(redirectUrl);
  }
  
  // В остальных случаях продолжаем выполнение запроса
  return res;
}

// Указываем, для каких маршрутов должен выполняться middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
