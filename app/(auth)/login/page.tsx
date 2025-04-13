import { APP_NAME } from "@/lib/constant";
import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          {APP_NAME}
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Sistem Bimbingan Online S3 - Teknik Informatika UDINUS
            </p>
            <footer className="text-sm">Universitas Dian Nuswantoro</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login ke Akun Anda
            </h1>
            <p className="text-sm text-muted-foreground">
              Masukkan email dan password Anda untuk masuk ke akun Anda.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
