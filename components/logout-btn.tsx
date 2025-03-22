"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      signOut({ callbackUrl: "/login" });
      toast.success("Logout berhasil!", {
        duration: 3000,
      });
    } catch (error) {
      toast.error("Logout gagal!", {
        description:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat logout.",
        duration: 3000,
      });
    }
  };

  return (
    <Button size={"xs"} variant="ghost" onClick={handleLogout}>
      <LogOut className="text-red-600 hover:text-red-500" />
      <span className="text-red-600 hover:text-red-500">Logout</span>
    </Button>
  );
}
