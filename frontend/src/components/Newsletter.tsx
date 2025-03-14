import { useState } from "react";
import axios, { AxiosError } from "axios";
import gsap from "gsap";
import { useGSAP } from "../hooks/useGSAP";

const Newsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useGSAP(() => {
    gsap.from("#newsletter", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#newsletter",
        start: "top 80%",
      },
    });
  }, []);

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
      id="newsletter"
      className="py-section bg-gray-900 text-white text-center"
    >
      <div className="container mx-auto max-w-lg px-6">
        <h2 className="text-3xl font-bold text-accent mb-4">Stay Updated 🚀</h2>
        <p className="text-gray-300 mb-6">
          Join our newsletter to get the latest insights.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:border-accent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-accent text-white px-6 py-2 rounded-md font-semibold hover:bg-primary transition"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && <p className="text-green-400 mt-4">{message}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
