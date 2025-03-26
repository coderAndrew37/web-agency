// components/LoadingSpinner.tsx
interface LoadingSpinnerProps {
  size?: number;
  fullPage?: boolean;
}

const LoadingSpinner = ({
  size = 24,
  fullPage = false,
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullPage ? "h-screen" : ""
      }`}
    >
      <div
        className="animate-spin rounded-full border-b-2 border-gray-900"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default LoadingSpinner;
