import { LoginForm } from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-md p-8 space-y-8 border rounded-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
