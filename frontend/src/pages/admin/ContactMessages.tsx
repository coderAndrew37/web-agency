import { useEffect, useState } from "react";
import {
  fetchContactMessages,
  deleteContactMessage,
  replyToContactMessage,
} from "../../api/adminApi";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);

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
      setShowDeleteModal(false);
    }
  };

  /** ✅ Handle Send Reply */
  const handleSendReply = async () => {
    if (!replySubject || !replyMessage || !selectedMessage) return;

    setSending(true);
    try {
      await replyToContactMessage(selectedMessage._id, {
        subject: replySubject,
        message: replyMessage,
      });
      alert("✅ Reply sent successfully!");
    } catch (error) {
      console.error("Failed to send reply", error);
      alert("❌ Failed to send reply.");
    } finally {
      setSending(false);
      setShowReplyModal(false);
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
            <div key={msg._id} className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedMessage(msg);
                  setShowReplyModal(true);
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Reply
              </button>
              <button
                onClick={() => {
                  setSelectedMessage(msg);
                  setShowDeleteModal(true);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>,
          ])}
        />
      )}

      {/* ✅ Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        title="Delete Message?"
        message={`Are you sure you want to delete this message from ${selectedMessage?.name}?`}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteMessage}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* ✅ Reply Modal */}
      <Modal
        isOpen={showReplyModal}
        title="Reply to Message"
        message={`Replying to: ${selectedMessage?.email}`}
        onClose={() => setShowReplyModal(false)}
        onConfirm={handleSendReply}
        confirmText={sending ? "Sending..." : "Send Reply"}
        cancelText="Cancel"
      >
        <input
          type="text"
          placeholder="Subject"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={replySubject}
          onChange={(e) => setReplySubject(e.target.value)}
        />
        <textarea
          placeholder="Write your reply here..."
          className="w-full p-2 border border-gray-300 rounded"
          rows={5}
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
        />
      </Modal>
    </motion.div>
  );
};

export default ContactMessages;
