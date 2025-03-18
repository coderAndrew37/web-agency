import { useEffect, useState } from "react";
import {
  fetchAllTestimonials,
  approveTestimonial,
  deleteTestimonial,
} from "../api/adminApi";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { motion } from "framer-motion";

type Testimonial = {
  _id: string;
  name: string;
  message: string;
  image?: string;
  approved: boolean;
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<"approve" | "delete" | "">("");

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await fetchAllTestimonials();
        setTestimonials(response.data);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  // ✅ Approve Testimonial
  const handleApproveTestimonial = async () => {
    if (!selectedTestimonial) return;
    try {
      await approveTestimonial(selectedTestimonial._id);
      setTestimonials(
        testimonials.map((t) =>
          t._id === selectedTestimonial._id ? { ...t, approved: true } : t
        )
      );
    } catch (error) {
      console.error("Failed to approve testimonial", error);
    } finally {
      setShowModal(false);
    }
  };

  // ✅ Delete Testimonial
  const handleDeleteTestimonial = async () => {
    if (!selectedTestimonial) return;
    try {
      await deleteTestimonial(selectedTestimonial._id);
      setTestimonials(
        testimonials.filter((t) => t._id !== selectedTestimonial._id)
      );
    } catch (error) {
      console.error("Failed to delete testimonial", error);
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
      <h2 className="text-3xl font-bold mb-6">🌟 Manage Testimonials</h2>

      {loading ? (
        <p>Loading testimonials...</p>
      ) : (
        <Table
          headers={["Name", "Message", "Image", "Status", "Actions"]}
          data={testimonials.map((testimonial) => [
            testimonial.name,
            <p key={testimonial._id} className="truncate max-w-sm">
              {testimonial.message}
            </p>,
            testimonial.image ? (
              <img
                key={testimonial._id}
                src={testimonial.image}
                alt="Testimonial"
                className="w-12 h-12 rounded-full"
              />
            ) : (
              "No Image"
            ),
            <span
              key={testimonial._id}
              className={`px-2 py-1 rounded ${
                testimonial.approved ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
            >
              {testimonial.approved ? "Approved" : "Pending"}
            </span>,
            <div key={testimonial._id} className="space-x-2">
              {!testimonial.approved && (
                <button
                  onClick={() => {
                    setSelectedTestimonial(testimonial);
                    setModalAction("approve");
                    setShowModal(true);
                  }}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => {
                  setSelectedTestimonial(testimonial);
                  setModalAction("delete");
                  setShowModal(true);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>,
          ])}
        />
      )}

      {/* ✅ Confirmation Modal */}
      <Modal
        isOpen={showModal}
        title={
          modalAction === "delete"
            ? "Delete Testimonial?"
            : "Approve Testimonial?"
        }
        message={
          modalAction === "delete"
            ? `Are you sure you want to delete ${selectedTestimonial?.name}'s testimonial?`
            : `Approve testimonial from ${selectedTestimonial?.name}?`
        }
        onClose={() => setShowModal(false)}
        onConfirm={
          modalAction === "delete"
            ? handleDeleteTestimonial
            : handleApproveTestimonial
        }
        confirmText={modalAction === "delete" ? "Delete" : "Approve"}
        cancelText="Cancel"
      />
    </motion.div>
  );
};

export default Testimonials;
