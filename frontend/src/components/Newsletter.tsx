import { useState } from "react";
import axios, { AxiosError } from "axios";
import colors from "../styles/colors";

const Newsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
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
    <section
      className="py-20 text-center"
      style={{ backgroundColor: colors.darkText, color: colors.lightText }}
    >
      <div className="container mx-auto max-w-lg px-6">
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: colors.primary }}
        >
          Stay Updated 🚀
        </h2>
        <p className="mb-6 text-gray-300">
          Join our newsletter to get the latest insights.
        </p>

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
            className="px-6 py-3 font-bold rounded-md shadow-md transition bg-primary text-white hover:bg-opacity-80"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && <p className="mt-4 text-green-400">{message}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
