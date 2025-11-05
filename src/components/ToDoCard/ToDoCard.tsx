"use client";

import { deleteTodos, setCompletedTodo, updateTodos } from "@/functions/todos";
import { Check, InfoIcon, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { ToDoInput } from "../ToDoInput/ToDoInput";
interface ToDoCardProps {
  id: string;
  objective: string;
  completed: boolean;
  createdAt: Date;
}

export default function ToDoCard({
  id,
  objective,
  createdAt,
  completed,
}: ToDoCardProps) {
  const [inputVisible, setInputVisible] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [checked, setChecked] = useState(completed);

  async function handleDelete(id: string) {
    await deleteTodos(id);
  }

  async function handleCompleted(id: string, completed: boolean) {
    setChecked(!checked);
    await setCompletedTodo(id, completed);
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (updateText === "") return;

    await updateTodos(id, updateText);
    setInputVisible(false);
    setUpdateText("");
  }
  return (
    <div className="relative w-full bg-white py-4 border border-gray-200 px-4 flex select-none rounded-lg">
      {!inputVisible ? (
        <div className="w-full">
          <div className="flex justify-between w-full">
            <div>
              <label htmlFor={id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={id}
                  checked={checked}
                  className="relative appearance-none peer w-4 h-4 border border-green-base checked:bg-green-base "
                  onChange={() => handleCompleted(id, !completed)}
                />
                <Check
                  className="absolute hidden peer-checked:block text-white"
                  size={16}
                />
                <span className="text-gray-400 peer-checked:decoration-1 peer-checked:line-through peer-checked:text-gray-300">
                  {objective}
                </span>
              </label>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <button
                  className="cursor-pointer"
                  onClick={() => setInputVisible(true)}
                >
                  <Pencil size={16} className="text-gray-300" />
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => handleDelete(id)}
                >
                  <Trash size={16} className="text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleUpdate}
          className="w-full flex items-center justify-between gap-2"
        >
          <div className="w-full">
            <ToDoInput
              variant="todos"
              className="w-[80%]"
              onChange={(e) => setUpdateText(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="cursor-pointer" type="submit">
              <Check size={16} className="text-gray-300" />
            </button>
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => setInputVisible(false)}
            >
              <Trash size={16} className="text-gray-300" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
