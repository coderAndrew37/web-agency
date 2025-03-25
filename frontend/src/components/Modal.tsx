// Modal.tsx
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
  isConfirming?: boolean;
  confirmButtonDisabled?: boolean;
}

const Modal = ({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
  isConfirming = false,
  confirmButtonDisabled = false,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2 className="text-lg font-bold">{title}</h2>
        {message && <p className="text-gray-700 mt-2">{message}</p>}
        {children && <div className="mt-4">{children}</div>}
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={isConfirming}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center min-w-20"
            disabled={isConfirming || confirmButtonDisabled}
          >
            {isConfirming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              confirmText
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
