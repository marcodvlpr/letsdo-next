"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTodos(title: string, id: string) {
  await prisma.todo.create({
    data: {
      title,
      userId: id,
    },
  });

  revalidatePath("/");
}

export async function deleteTodos(id: string) {
  await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
}

export async function setCompletedTodo(id: string, completed: boolean) {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      completed,
    },
  });

  revalidatePath("/");
}

export async function updateTodos(id: string, title: string) {
  const result = await prisma.todo.update({
    where: { id },
    data: { title },
  });
  console.log(result);

  revalidatePath("/");
}
