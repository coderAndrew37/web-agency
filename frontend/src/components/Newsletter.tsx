import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSubscribeNewsletter } from "../hooks/useNewsletter";
import { AxiosError } from "axios";

interface NewsletterProps {
  title: string;
  subtitle: string;
  background?: string;
}

interface ErrorResponse {
  error: string;
}

const newsletterSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
});

const Newsletter = ({ title, subtitle }: NewsletterProps) => {
  const [email, setEmail] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const subscribe = useSubscribeNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");

    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      const validationMessage =
        result.error.issues[0]?.message || "Invalid input";
      setErrorText(validationMessage);
      toast.error(validationMessage);
      return;
    }

    subscribe.mutate(
      { email },
      {
        onSuccess: (data) => {
          toast.success(data.message || "You’ve been subscribed!");
          setEmail("");
          setErrorText("");
        },
        onError: (error) => {
          let message = "Something went wrong. Please try again later.";

          if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            message = axiosError.response?.data?.error || message;
          }

          setErrorText(message);
          toast.error(message);
        },
      }
    );
  };

  return (
    <section className="py-20 text-center">
      <div className="container mx-auto max-w-lg px-6">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="mb-6 text-white-300">{subtitle}</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            {errorText && (
              <span className="text-sm text-red-500 text-left mt-1">
                {errorText}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-3 font-bold rounded-md shadow-md transition bg-primary text-blue-700 cursor-pointer hover:bg-opacity-80 hover:transform hover:scale-105"
            disabled={subscribe.status === "pending"}
          >
            {subscribe.status === "pending" ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Subscribing...
              </div>
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
