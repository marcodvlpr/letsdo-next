"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, OctagonX } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { ToDoInput } from "../ToDoInput/ToDoInput";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FormSchema = z.object({
  email: z.email("Endereço de e-mail inválido."),
  password: z.string().min(4, "A senha deve conter pelo menos 4 dígitos."),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLoginSubmit({ email, password }: FormData) {
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
      },
      {
        onRequest: (ctx) => {},
        onSuccess: (ctx) => {
          console.log("LOGADO ", ctx);
          router.replace("/");
        },
        onError: (ctx) => {
          console.log("ERRO", ctx);
          if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            setInvalidPassword(true);
            toast("E-mail ou senha incorreta", {
              style: {
                background: "#ff6d59",
                color: "#fff",
                display: "flex",
                alignItems: "center",
              },
              icon: <OctagonX size={16} />,
            });

            setTimeout(() => {
              setInvalidPassword(false);
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
        inputLabel="E-mail"
        id="email_input"
        autoComplete="email"
        placeholder="seu@email.com"
        variant="form"
        className={`mt-1 ${errors.email ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-gray-400"}`}
        {...register("email")}
      />
      {errors.email && (
        <span className="text-red-400 text-sm">{errors.email.message}</span>
      )}
      <div className="relative mt-4 flex flex-col">
        <ToDoInput
          type={showPassword ? "text" : "password"}
          inputLabel="Senha"
          id="password_input"
          placeholder="*******"
          variant="form"
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
        {invalidPassword && (
          <span className="text-red-400 text-sm">
            E-mail ou senha incorreta.
          </span>
        )}
      </div>

      <button
        type="submit"
        className="absolute bottom-12 left-8 right-8 flex items-center justify-center bg-gray-400 py-4 text-white font-bold cursor-pointer mt-4 hover:brightness-87 transition"
      >
        LOGIN
      </button>
      <small className="absolute bottom-6 left-20 text-gray-400 text-sm md:left-40">
        Não possui uma conta?{" "}
        <Link
          href="/register"
          className="font-bold hover:underline cursor-pointer"
        >
          Cadastre-se
        </Link>
      </small>
    </form>
  );
}
