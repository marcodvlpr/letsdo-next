"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/login");
        },
      },
    });
  }
  return (
    <button
      className="absolute top-10 right-10 cursor-pointer"
      onClick={signOut}
    >
      <LogOut className="text-gray-400" />
    </button>
  );
}
