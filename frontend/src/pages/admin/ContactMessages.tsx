import { useEffect, useState } from "react";
import { fetchContactMessages, deleteContactMessage } from "../../api/adminApi";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { motion } from "framer-motion";

type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

const ContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  /** ✅ Load Messages */
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetchContactMessages();
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch contact messages", error);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, []);

  /** ✅ Handle Delete Message */
  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;

    try {
      await deleteContactMessage(selectedMessage._id);
      setMessages(messages.filter((msg) => msg._id !== selectedMessage._id));
    } catch (error) {
      console.error("Failed to delete message", error);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">📩 Contact Messages</h2>

      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <Table
          headers={["Name", "Email", "Message", "Received At", "Actions"]}
          data={messages.map((msg) => [
            msg.name,
            msg.email,
            msg.message.length > 50
              ? msg.message.slice(0, 50) + "..."
              : msg.message,
            new Date(msg.createdAt).toLocaleDateString(),
            <button
              key={msg._id}
              onClick={() => {
                setSelectedMessage(msg);
                setShowModal(true);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>,
          ])}
        />
      )}

      {/* ✅ Delete Confirmation Modal */}
      <Modal
        isOpen={showModal}
        title="Delete Message?"
        message={`Are you sure you want to delete this message from ${selectedMessage?.name}?`}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteMessage}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </motion.div>
  );
};

export default ContactMessages;
