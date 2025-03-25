import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { motion } from "framer-motion";
import {
  useFetchSubscribers,
  useDeleteSubscriber,
  useSendBulkEmail,
} from "../../api/adminApi";
import { Subscriber, BulkEmailData } from "../../types/admin";
import { handleApiError } from "../../Utils/apiErrorHandler";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Subscribers = () => {
  // Fetch subscribers with React Query
  const {
    data: subscribersResponse,
    isLoading,
    isError,
    refetch,
  } = useFetchSubscribers();

  // Mutations
  const { mutateAsync: deleteSubscriber, isPending: isDeleting } =
    useDeleteSubscriber();
  const { mutateAsync: sendBulkEmail, isPending: isSending } =
    useSendBulkEmail();

  // State
  const [selectedSubscriber, setSelectedSubscriber] =
    useState<Subscriber | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState<BulkEmailData>({
    subject: "",
    message: "",
  });

  // Extract subscribers from response
  const subscribers = subscribersResponse?.items || [];

  /** Handle Delete Subscriber */
  const handleDeleteSubscriber = async () => {
    if (!selectedSubscriber) return;
    try {
      await deleteSubscriber(selectedSubscriber._id);
      refetch();
    } catch (error) {
      handleApiError(error, { showToast: true });
    } finally {
      setShowDeleteModal(false);
    }
  };

  /** Handle Sending Bulk Email */
  const handleSendEmail = async () => {
    if (!emailData.subject || !emailData.message) return;

    try {
      await sendBulkEmail(emailData);
      setEmailData({ subject: "", message: "" });
    } catch (error) {
      handleApiError(error, { showToast: true });
    } finally {
      setShowEmailModal(false);
    }
  };

  if (isLoading) {
    return (
      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">📧 Newsletter Subscribers</h2>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">📧 Newsletter Subscribers</h2>
        <div className="text-red-500">
          Failed to load subscribers.{" "}
          <button onClick={() => refetch()} className="text-blue-500 underline">
            Try again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">📧 Newsletter Subscribers</h2>

      {/* Bulk Email Button */}
      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        onClick={() => setShowEmailModal(true)}
        disabled={isSending}
      >
        {isSending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </span>
        ) : (
          "✉️ Send Bulk Email"
        )}
      </button>

      <Table
        headers={["Email", "Subscribed At", "Actions"]}
        data={subscribers.map((subscriber: Subscriber) => [
          subscriber.email,
          new Date(subscriber.subscribedAt).toLocaleDateString(),
          <button
            key={subscriber._id}
            onClick={() => {
              setSelectedSubscriber(subscriber);
              setShowDeleteModal(true);
            }}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={isDeleting}
          >
            Remove
          </button>,
        ])}
      />

      {/* Confirmation Modal for Delete */}
      <Modal
        isOpen={showDeleteModal}
        title="Remove Subscriber?"
        message={`Are you sure you want to remove ${selectedSubscriber?.email} from the newsletter?`}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteSubscriber}
        confirmText={isDeleting ? "Removing..." : "Remove"}
        cancelText="Cancel"
        isConfirming={isDeleting}
      />

      {/* Modal for Sending Bulk Email */}
      <Modal
        isOpen={showEmailModal}
        title="Send Email to All Subscribers"
        message=""
        onClose={() => {
          setShowEmailModal(false);
          setEmailData({ subject: "", message: "" });
        }}
        onConfirm={handleSendEmail}
        confirmText={isSending ? "Sending..." : "Send Email"}
        cancelText="Cancel"
        isConfirming={isSending}
      >
        <input
          type="text"
          placeholder="Subject"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={emailData.subject}
          onChange={(e) =>
            setEmailData({ ...emailData, subject: e.target.value })
          }
        />
        <textarea
          placeholder="Write your message here..."
          className="w-full p-2 border border-gray-300 rounded"
          rows={5}
          value={emailData.message}
          onChange={(e) =>
            setEmailData({ ...emailData, message: e.target.value })
          }
        />
      </Modal>
    </motion.div>
  );
};

export default Subscribers;
