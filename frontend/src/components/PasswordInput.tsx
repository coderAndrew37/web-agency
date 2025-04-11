// components/PasswordInput.tsx
import { Eye, EyeOff } from "lucide-react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type PasswordInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  disabled?: boolean;
  error?: string;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  placeholder?: string;
};

const PasswordInput = <T extends FieldValues>({
  register,
  name,
  disabled,
  error,
  showPassword,
  togglePasswordVisibility,
  placeholder = "Password",
}: PasswordInputProps<T>) => {
  return (
    <div>
      <div className="relative">
        <input
          {...register(name)}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary shadow-sm pr-10"
          disabled={disabled}
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          onClick={togglePasswordVisibility}
          disabled={disabled}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && <p className="mt-1 text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordInput;
