import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Unauthorized",
  description: "You do not have permission to access this page",
};

export default function UnauthorizedPage() {
  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Unauthorized
          </h1>
          <p className="text-sm text-muted-foreground">
            You do not have permission to access this page
          </p>
        </div>
        <Button asChild>
          <Link href="/">Go back to home</Link>
        </Button>
      </div>
    </div>
  );
}
