"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTodos(title: string, id: string) {
  try {
    await prisma.todo.create({
      data: {
        title,
        userId: id,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodos(id: string) {
  // await prisma.todo.deleteMany();
  // return await prisma.user.deleteMany();
  try {
    const todoExists = await prisma.todo.findUnique({ where: { id } });
    if (!todoExists) return;

    await prisma.todo.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export async function setCompletedTodo(id: string, completed: boolean) {
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export async function updateTodos(id: string, title: string) {
  try {
    const result = await prisma.todo.update({
      where: { id },
      data: { title },
    });
    console.log(result);

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
