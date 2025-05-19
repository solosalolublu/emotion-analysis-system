export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 gradient-text">Панель управления</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Добро пожаловать в систему анализа эмоций! Здесь вы можете анализировать тексты и отслеживать результаты.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 rounded-lg gradient-bg gradient-border shadow-md">
            <h2 className="text-xl font-semibold mb-4">Начать новый анализ</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Загрузите текст или введите его вручную для анализа эмоциональной окраски.
            </p>
            <button className="btn-primary px-4 py-2 rounded-md">
              Новый анализ
            </button>
          </div>
          
          <div className="p-6 rounded-lg gradient-bg gradient-border shadow-md">
            <h2 className="text-xl font-semibold mb-4">Последние анализы</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Просмотрите результаты ваших последних анализов эмоций.
            </p>
            <button className="bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-md border border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors">
              История анализов
            </button>
          </div>
        </div>
        
        <div className="p-6 rounded-lg gradient-bg gradient-border shadow-md">
          <h2 className="text-xl font-semibold mb-4">Статистика использования</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Всего анализов</p>
              <p className="text-2xl font-bold gradient-text">0</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">За последний месяц</p>
              <p className="text-2xl font-bold gradient-text">0</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Средняя длина текста</p>
              <p className="text-2xl font-bold gradient-text">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
