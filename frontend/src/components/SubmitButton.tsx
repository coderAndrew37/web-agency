// components/SubmitButton.tsx
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

type SubmitButtonProps = {
  isLoading: boolean;
  label: string;
  loadingLabel: string;
  disabled?: boolean;
};

const SubmitButton = ({
  isLoading,
  label,
  loadingLabel,
}: SubmitButtonProps) => {
  return (
    <motion.button
      type="submit"
      className="w-full py-3 font-bold rounded-lg shadow-md transition bg-primary text-blue-700 text-lg hover:opacity-90 disabled:opacity-70"
      whileTap={{ scale: 0.95 }}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <LoadingSpinner size={20} /> {loadingLabel}
        </span>
      ) : (
        label
      )}
    </motion.button>
  );
};

export default SubmitButton;
