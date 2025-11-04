"use client";
import { Check, Plus, X } from "lucide-react";
import { useState } from "react";
import { ToDoInput } from "../ToDoInput/ToDoInput";
import { createTodos } from "@/functions/todos";
import { authClient } from "@/lib/auth-client";

export default function ToDoForm() {
  const user = authClient.useSession();
  const [isInputActive, setIsInputActive] = useState(false);
  const [todo, setTodo] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (todo === "") return;

    if (user.data) {
      createTodos(todo, user.data.user.id);
      setIsInputActive(false);
      setTodo("");
    }
  }

  return (
    <>
      {isInputActive ? (
        <form
          className="bg-white w-full px-4 py-3 flex h-16 pb-2 border border-gray-200  items-center justify-between"
          onSubmit={handleSubmit}
        >
          <ToDoInput
            type="text"
            variant="todos"
            autoFocus
            onChange={(e) => setTodo(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsInputActive(false)}
              className="bg-gray-200 p-1 rounded-sm cursor-pointer text-pink-base hover:bg-pink-base hover:text-white transition"
            >
              <X />
            </button>
            <button
              className="bg-green-base p-1 rounded-sm cursor-pointer hover:bg-green-dark transition"
              type="submit"
            >
              <Check className="text-white" />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsInputActive(true)}
          className="w-full bg-green-light py-4 h-16 flex items-center justify-center gap-2 text-green-dark cursor-pointer hover:brightness-96 transition"
        >
          <Plus className="text-green-dark" />
          Nova tarefa
        </button>
      )}
    </>
  );
}
