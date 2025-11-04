"use client";

import LoginForm from "@/components/LoginForm.tsx/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-white h-130 w-100 md:w-140 p-8 border border-gray-200 relative">
        <h1 className="text-3xl text-gray-400 font-extrabold text-center">
          Login
        </h1>
        <p className="text-sm text-gray-300 pt-1 text-center">
          Faça login para começar seus objetivos
        </p>

        <LoginForm />
      </div>
    </div>
  );
}
