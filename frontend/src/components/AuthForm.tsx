import { motion } from "framer-motion";
import { ReactNode } from "react";
import colors from "../styles/colors";

type AuthFormProps = {
  title: string;
  children: ReactNode;
  footer: ReactNode;
};

const AuthForm = ({ title, children, footer }: AuthFormProps) => {
  // Removed unused handleSubmit function

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6"
    >
      <div>
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: colors.primary }}
        >
          {title}
        </h2>

        {children}

        <div className="mt-6 text-center space-y-3">{footer}</div>
      </div>
    </motion.div>
  );
};

export default AuthForm;
