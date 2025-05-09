import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import {
  useDeleteContactMessage,
  useFetchContactMessages,
  useReplyToContactMessage,
} from "../../hooks/admin/useAdmin";
import { ContactMessage, ContactReplyData } from "../../types/admin";
import { handleApiError } from "../../Utils/apiErrorHandler";

const ContactMessages = () => {
  const {
    data: messagesResponse,
    isLoading,
    isError,
    refetch,
  } = useFetchContactMessages();

  const { mutateAsync: deleteMessage, isPending: isDeleting } =
    useDeleteContactMessage();
  const { mutateAsync: replyToMessage, isPending: isReplying } =
    useReplyToContactMessage();

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyData, setReplyData] = useState<ContactReplyData>({
    subject: "",
    message: "",
  });

  const messages = messagesResponse?.items || [];

  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;
    try {
      await deleteMessage(selectedMessage._id);
      refetch();
    } catch (error) {
      handleApiError(error, { showToast: true });
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyData.subject || !replyData.message) return;

    try {
      await replyToMessage({
        _id: selectedMessage._id,
        replyData,
      });
      setReplyData({ subject: "", message: "" });
    } catch (error) {
      handleApiError(error, { showToast: true });
    } finally {
      setShowReplyModal(false);
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
        <h2 className="text-3xl font-bold mb-6">📩 Contact Messages</h2>
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
        <h2 className="text-3xl font-bold mb-6">📩 Contact Messages</h2>
        <div className="text-red-500">
          Failed to load messages.{" "}
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
      <h2 className="text-3xl font-bold mb-6">📩 Contact Messages</h2>

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
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isReplying}
            >
              Reply
            </button>
            <button
              onClick={() => {
                setSelectedMessage(msg);
                setShowDeleteModal(true);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              disabled={isDeleting}
            >
              Delete
            </button>
          </div>,
        ])}
      />

      <Modal
        isOpen={showDeleteModal}
        title="Delete Message?"
        message={`Are you sure you want to delete this message from ${selectedMessage?.name}?`}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteMessage}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        isConfirming={isDeleting}
      />

      <Modal
        isOpen={showReplyModal}
        title="Reply to Message"
        message={`Replying to: ${selectedMessage?.email}`}
        onClose={() => {
          setShowReplyModal(false);
          setReplyData({ subject: "", message: "" });
        }}
        onConfirm={handleSendReply}
        confirmText={isReplying ? "Sending..." : "Send Reply"}
        cancelText="Cancel"
        isConfirming={isReplying}
      >
        <input
          type="text"
          placeholder="Subject"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={replyData.subject}
          onChange={(e) =>
            setReplyData({ ...replyData, subject: e.target.value })
          }
        />
        <textarea
          placeholder="Write your reply here..."
          className="w-full p-2 border border-gray-300 rounded"
          rows={5}
          value={replyData.message}
          onChange={(e) =>
            setReplyData({ ...replyData, message: e.target.value })
          }
        />
      </Modal>
    </motion.div>
  );
};

export default ContactMessages;
