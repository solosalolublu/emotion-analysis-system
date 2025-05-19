import { AuthForm } from "@/components/AuthForm";

export default function AuthPage() {
  return (
    <div className="max-w-md mx-auto py-10">
      <div className="gradient-bg p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold text-center gradient-text">
          Вход в систему анализа эмоций
        </h1>
      </div>
      <AuthForm />
    </div>
  );
}
