import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/useToast";
import { XCircle, CheckCircle, Info } from "lucide-react";

const iconMap = {
  success: <CheckCircle className="text-green-500" size={24} />,
  error: <XCircle className="text-red-500" size={24} />,
  info: <Info className="text-blue-500" size={24} />,
};

const Toast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="flex items-center p-4 bg-white shadow-md rounded-lg w-80"
          >
            {iconMap[toast.type]}
            <span className="ml-3 flex-grow">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-3">
              ✖
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
