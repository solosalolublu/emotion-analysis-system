import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4 gradient-bg p-8 rounded-lg w-full">
        <h1 className="text-4xl font-bold gradient-text">
          Система анализа эмоций в тексте
        </h1>
        <p className="text-xl text-muted-foreground">
          Определение эмоционального тона текстовых сообщений с оценкой интенсивности эмоций
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card className="border-purple-200 dark:border-purple-800 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="card-header">
            <CardTitle className="gradient-text">Анализ текста</CardTitle>
            <CardDescription>
              Определение 7 базовых эмоций в тексте с оценкой их интенсивности
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Радость (довольство)</li>
              <li>Удивление</li>
              <li>Печаль (грусть)</li>
              <li>Гнев (злость)</li>
              <li>Отвращение</li>
              <li>Презрение</li>
              <li>Страх</li>
            </ul>
            <div className="mt-4">
              <Link href="/dashboard" passHref>
                <Button className="w-full btn-primary">
                  Начать анализ
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-purple-800 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="card-header">
            <CardTitle className="gradient-text">Источники данных</CardTitle>
            <CardDescription>
              Анализ эмоций из различных источников
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Произвольный текст</li>
              <li>Электронные письма</li>
              <li>Сообщения из Telegram</li>
              <li>Посты в социальных сетях</li>
            </ul>
            <div className="mt-4">
              <Link href="/auth" passHref>
                <Button
                  variant="outline"
                  className="w-full border-purple-300 dark:border-purple-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900 dark:hover:to-pink-900"
                >
                  Войти в систему
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full border-purple-200 dark:border-purple-800 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="card-header">
          <CardTitle className="gradient-text">О системе</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Система анализа эмоций в тексте предназначена для определения эмоционального тона текстовых сообщений средней длины.
            Она позволяет анализировать тексты на русском языке и определять интенсивность 7 базовых эмоций по десятибалльной шкале.
          </p>
          <p className="mt-2">
            Система работает в пакетном режиме, что позволяет анализировать большие объемы текста за один раз.
            Результаты анализа представляются в виде наглядных графиков, которые помогают быстро оценить эмоциональный фон текста.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
