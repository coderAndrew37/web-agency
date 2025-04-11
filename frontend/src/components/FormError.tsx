type FormErrorProps = {
  message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
  );
};

export default FormError;
