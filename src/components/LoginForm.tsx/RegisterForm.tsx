"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ToDoInput } from "@/components/ToDoInput/ToDoInput";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

const FormSchema = z.object({
  name: z.string().min(3, "Você deve colocar um nome."),
  email: z.email("Endereço de e-mail inválido."),
  password: z.string().min(4, "A senha deve conter pelo menos 4 dígitos."),
});

type FormData = z.infer<typeof FormSchema>;

export default function RegisterForm() {
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleLoginSubmit({ name, email, password }: FormData) {
    const { data, error } = await authClient.signUp.email(
      {
        name: name
          .split(" ")
          .map((c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase())
          .join(" "),
        email,
        password,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: (ctx) => {
          setIsLoading(false);
          router.replace("/");
        },
        onError: (ctx) => {
          setIsLoading(false);
          if (ctx.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
            setEmailAlreadyExists(true);

            setTimeout(() => {
              setEmailAlreadyExists(false);
            }, 3000);
          }
        },
      }
    );
  }
  return (
    <form
      className="pt-8 space-y-2 flex flex-col"
      onSubmit={handleSubmit(handleLoginSubmit)}
    >
      <ToDoInput
        type="text"
        inputLabel="Nome"
        variant="form"
        id="name_input"
        autoComplete="name"
        placeholder="Marco"
        className={`mt-1 ${errors.name ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-gray-400"}`}
        {...register("name")}
      />
      {errors.name && (
        <span className="text-red-400 text-sm">{errors.name.message}</span>
      )}

      <ToDoInput
        type="text"
        inputLabel="E-mail"
        variant="form"
        id="email_input"
        autoComplete="email"
        placeholder="seu@email.com"
        className={`mt-1 ${errors.email ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-gray-400"}`}
        {...register("email")}
      />
      {errors.email && (
        <span className="text-red-400 text-sm">{errors.email.message}</span>
      )}
      {emailAlreadyExists && (
        <span className="text-red-400 text-sm mt-2">
          Este e-mail já está em uso.
        </span>
      )}
      <div className="relative mt-4 flex flex-col">
        <ToDoInput
          type={showPassword ? "text" : "password"}
          id="password_input"
          inputLabel="Senha"
          variant="form"
          placeholder="*******"
          autoComplete="current-password"
          className={`mt-1 ${errors.password ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-gray-400"}`}
          {...register("password")}
        />
        <button
          className="absolute right-4 top-12 cursor-pointer"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
        {errors.password && (
          <span className="text-red-400 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="absolute bottom-12 left-8 right-8 flex items-center justify-center bg-gray-400 py-4 text-white font-bold cursor-pointer mt-4 hover:brightness-87 transition"
      >
        {isLoading ? <Spinner className="text-white" /> : "ENTRAR"}
      </button>
      <small className="absolute bottom-6 left-20 text-gray-400 text-sm md:left-40">
        Já possui uma conta?{" "}
        <Link
          href="/login"
          className="font-bold hover:underline cursor-pointer"
        >
          Entrar
        </Link>
      </small>
    </form>
  );
}
