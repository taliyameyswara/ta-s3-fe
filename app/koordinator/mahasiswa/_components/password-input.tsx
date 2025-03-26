import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  formData: { password?: string };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEdit: boolean;
  errors?: { password?: string };
}

export default function PasswordInput({
  formData,
  handleChange,
  isEdit,
  errors,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {isEdit && (
        <>
          <Label htmlFor="password" className="text-right mb-3">
            Password
          </Label>
          <div className="relative col-span-3 mb-3">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password ?? ""}
              onChange={handleChange}
              className="pr-10"
              placeholder="Masukkan password mahasiswa"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors?.password && (
              <p className="text-red-500 text-xs absolute mt-1">
                {errors.password}
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}
