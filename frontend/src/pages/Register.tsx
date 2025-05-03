import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-md p-8 space-y-8 border rounded-lg">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
