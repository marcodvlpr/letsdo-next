import RegisterForm from "@/components/LoginForm.tsx/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-white h-170 w-100 md:w-140 p-8 border border-gray-200 relative">
        <h1 className="text-3xl text-gray-400 font-extrabold text-center">
          Cadastro
        </h1>
        <p className="text-sm text-gray-300 pt-1 text-center">
          Crie aqui sua conta para começar seus objetivos
        </p>

        <RegisterForm />
      </div>
    </div>
  );
}
