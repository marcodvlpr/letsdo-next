import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva("", {
  variants: {
    variant: {
      form: "bg-white py-4 px-4 outline-0 border border-gray-200 focus:border-gray-400",
      todos: "border-b-2 border-gray-400 w-[80%] outline-0 text-gray-400",
    },
  },
  defaultVariants: {
    variant: "form",
  },
});

function ToDoInput({
  className,
  variant,
  inputLabel,
  ...props
}: React.ComponentProps<"input"> &
  VariantProps<typeof buttonVariants> & { inputLabel?: string }) {
  return (
    <>
      {inputLabel && <label htmlFor={props.id}>{inputLabel}</label>}
      <input
        className={cn(buttonVariants({ variant, className }))}
        {...props}
      />
    </>
  );
}

export { ToDoInput, buttonVariants };
