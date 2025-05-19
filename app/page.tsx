import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6 gradient-text leading-tight">
            Система анализа эмоций в тексте
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
            Определяйте эмоциональную окраску текста с помощью нашей системы анализа эмоций.
            Выявляйте 7 базовых эмоций и их интенсивность по 10-балльной шкале.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-lg gradient-bg gradient-border">
              <h3 className="text-lg font-semibold mb-2">Точный анализ</h3>
              <p className="text-gray-600 dark:text-gray-300">Определение 7 базовых эмоций с высокой точностью</p>
            </div>
            <div className="p-6 rounded-lg gradient-bg gradient-border">
              <h3 className="text-lg font-semibold mb-2">Интенсивность</h3>
              <p className="text-gray-600 dark:text-gray-300">Оценка интенсивности каждой эмоции по 10-балльной шкале</p>
            </div>
            <div className="p-6 rounded-lg gradient-bg gradient-border">
              <h3 className="text-lg font-semibold mb-2">Пакетный режим</h3>
              <p className="text-gray-600 dark:text-gray-300">Анализ больших объемов текста в пакетном режиме</p>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Link href="/auth">
              <Button className="btn-primary text-lg px-8 py-6">Начать работу</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
