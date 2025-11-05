import { headers } from "next/headers";
import { auth } from "../lib/auth";

import ToDoCard from "../components/ToDoCard/ToDoCard";
import ToDoForm from "../components/ToDoForm/ToDoForm";
import { BookOpenCheck, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="w-full h-screen pt-18">
      <div className="absolute left-10 top-10 flex items-center gap-4">
        <BookOpenCheck className="text-gray-400" />
        <Link href="/">
          <h1 className="font-extrabold text-gray-400 text-3xl">LetsDo</h1>
        </Link>
      </div>
      <div className="mx-8 md:max-w-[560px] md:mx-auto space-y-8 pt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-gray-400 text-2xl">
            Olá, {session.user.name.split(" ")[0]}
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 flex items-center gap-4">
            Tarefas criadas
            <div className="bg-gray-400 text-white w-6 h-6 rounded-full flex items-center justify-center">
              {todos.length}
            </div>
          </span>
          <span className="text-gray-300 flex items-center gap-4">
            Concluídas
            <div className="bg-green-light text-green-dark w-6 h-6 rounded-full flex items-center justify-center">
              {todos.filter((c) => c.completed === true).length}
            </div>
          </span>
        </div>

        <ToDoForm />

        {todos.map((todo, index) => (
          <ToDoCard
            createdAt={todo.createdAt}
            id={todo.id}
            key={index}
            objective={todo.title}
            completed={todo.completed}
          />
        ))}
      </div>
      <LogoutButton />
    </div>
  );
}
