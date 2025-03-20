import { useEffect, useState } from "react";
import {
  useFetchSubscribers as fetchSubscribers,
  useDeleteSubscriber as deleteSubscriber,
  useSendBulkEmail as sendBulkEmail,
} from "../../api/adminApi";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { motion } from "framer-motion";

type Subscriber = {
  _id: string;
  email: string;
  subscribedAt: string;
};

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubscriber, setSelectedSubscriber] =
    useState<Subscriber | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const loadSubscribers = async () => {
      try {
        const response = await fetchSubscribers();
        setSubscribers(response.data);
      } catch (error) {
        console.error("Failed to fetch subscribers", error);
      } finally {
        setLoading(false);
      }
    };

    loadSubscribers();
  }, []);

  // ✅ Handle Delete Subscriber
  const handleDeleteSubscriber = async () => {
    if (!selectedSubscriber) return;
    try {
      await deleteSubscriber(selectedSubscriber._id);
      setSubscribers(
        subscribers.filter((s) => s._id !== selectedSubscriber._id)
      );
    } catch (error) {
      console.error("Failed to delete subscriber", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // ✅ Handle Sending Bulk Email
  const handleSendEmail = async () => {
    if (!emailSubject || !emailMessage) return;

    setSending(true);
    try {
      await sendBulkEmail({ subject: emailSubject, message: emailMessage });
      alert("✅ Email sent successfully!");
    } catch (error) {
      console.error("Failed to send email", error);
      alert("❌ Failed to send email.");
    } finally {
      setSending(false);
      setShowEmailModal(false);
    }
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">📧 Newsletter Subscribers</h2>

      {/* ✅ Bulk Email Button */}
      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        onClick={() => setShowEmailModal(true)}
      >
        ✉️ Send Bulk Email
      </button>

      {loading ? (
        <p>Loading subscribers...</p>
      ) : (
        <Table
          headers={["Email", "Subscribed At", "Actions"]}
          data={subscribers.map((subscriber) => [
            subscriber.email,
            new Date(subscriber.subscribedAt).toLocaleDateString(),
            <button
              key={subscriber._id}
              onClick={() => {
                setSelectedSubscriber(subscriber);
                setShowDeleteModal(true);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>,
          ])}
        />
      )}

      {/* ✅ Confirmation Modal for Delete */}
      <Modal
        isOpen={showDeleteModal}
        title="Remove Subscriber?"
        message={`Are you sure you want to remove ${selectedSubscriber?.email} from the newsletter?`}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteSubscriber}
        confirmText="Remove"
        cancelText="Cancel"
      />

      {/* ✅ Modal for Sending Bulk Email */}
      <Modal
        isOpen={showEmailModal}
        title="Send Email to All Subscribers"
        message=""
        onClose={() => setShowEmailModal(false)}
        onConfirm={handleSendEmail}
        confirmText={sending ? "Sending..." : "Send Email"}
        cancelText="Cancel"
      >
        <input
          type="text"
          placeholder="Subject"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
        />
        <textarea
          placeholder="Write your message here..."
          className="w-full p-2 border border-gray-300 rounded"
          rows={5}
          value={emailMessage}
          onChange={(e) => setEmailMessage(e.target.value)}
        />
      </Modal>
    </motion.div>
  );
};

export default Subscribers;
