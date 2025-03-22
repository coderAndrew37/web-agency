import { useState } from "react";
import { useCaptureLead } from "../api/leadMagnet";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface LeadMagnetProps {
  title: string;
  description: string;
  resourceType: string;
}

const LeadMagnet = ({ title, description, resourceType }: LeadMagnetProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const captureLead = useCaptureLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await captureLead.mutateAsync({ email, name, resourceType });
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.section
      className="bg-primary text-white text-center p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-sm">{description}</p>

      {!success ? (
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col items-center"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-80 p-3 rounded-md text-black border border-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-80 p-3 rounded-md text-black border border-gray-300 mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <motion.button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md mt-3"
            whileHover={{ scale: 1.05 }}
          >
            Get Free Guide
          </motion.button>
        </form>
      ) : (
        <motion.div className="mt-4 flex items-center justify-center gap-2">
          <CheckCircle size={24} />
          <p>Your free guide is on its way! 🎉</p>
        </motion.div>
      )}
    </motion.section>
  );
};

export default LeadMagnet;
