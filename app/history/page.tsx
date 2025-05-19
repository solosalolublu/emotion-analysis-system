export default function HistoryPage() {
  return (
    <div className="container mx-auto py-10 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 gradient-text">История анализов</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Здесь отображается история ваших анализов эмоций в тексте.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden gradient-border mb-8">
          <div className="p-6 border-b border-purple-100 dark:border-purple-900">
            <h2 className="text-xl font-semibold">Фильтры</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Дата начала</label>
              <input type="date" className="form-input" />
            </div>
            <div>
              <label className="form-label">Дата окончания</label>
              <input type="date" className="form-input" />
            </div>
            <div>
              <label className="form-label">Источник</label>
              <select className="form-input">
                <option value="">Все источники</option>
                <option value="email">Email</option>
                <option value="telegram">Telegram</option>
                <option value="manual">Ручной ввод</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden gradient-border">
          <div className="p-6 border-b border-purple-100 dark:border-purple-900">
            <h2 className="text-xl font-semibold">Результаты анализов</h2>
          </div>
          <div className="p-6">
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400 mb-4">У вас пока нет сохраненных анализов</p>
              <button className="btn-primary px-4 py-2 rounded-md">
                Создать первый анализ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
