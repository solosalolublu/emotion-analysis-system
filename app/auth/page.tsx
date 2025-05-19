import { AuthForm } from "@/components/AuthForm";

export default function AuthPage() {
  return (
    <div className="max-w-md mx-auto py-10 px-4 animate-fade-in">
      <div className="gradient-bg p-8 rounded-lg mb-8 shadow-md gradient-border">
        <h1 className="text-3xl font-bold text-center gradient-text">
          Вход в систему анализа эмоций
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
          Войдите или зарегистрируйтесь, чтобы начать анализировать эмоции в тексте
        </p>
      </div>
      <AuthForm />
    </div>
  );
}
