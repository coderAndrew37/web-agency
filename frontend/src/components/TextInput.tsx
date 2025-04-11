// components/TextInput.tsx
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TextInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  type?: string;
};

const TextInput = <T extends FieldValues>({
  register,
  name,
  disabled,
  error,
  placeholder,
  type = "text",
}: TextInputProps<T>) => {
  return (
    <div>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary shadow-sm"
        disabled={disabled}
      />
      {error && <p className="mt-1 text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;
