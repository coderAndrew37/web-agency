import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useState } from "react";

interface NewsletterProps {
  title: string;
  subtitle: string;
  background?: string;
}

const newsletterSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
});

const Newsletter = ({ title, subtitle }: NewsletterProps) => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = newsletterSchema.safeParse({ email });

      if (!result.success) {
        setMessage("Invalid email");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/newsletter`,
        { email }
      );
      setMessage(res.data.message);
      setEmail("");
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      setMessage(axiosError.response?.data?.error || "Subscription failed.");
    } finally {
      setLoading(false);
    }
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
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-md border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-6 py-3 font-bold rounded-md shadow-md transition bg-primary text-blue-700 cursor-pointer hover:bg-opacity-80 hover:transform hover:scale-105"
            disabled={loading}
          >
            {loading ? (
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

        {message && <p className="mt-4 text-green-400">{message}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
