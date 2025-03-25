import {
  useFetchAllTestimonials,
  useApproveTestimonial,
  useDeleteTestimonial,
} from "../../api/adminApi";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { TestimonialSkeleton } from "../../components/TestimonialSkeleton";
import { useState } from "react";

type Testimonial = {
  _id: string; // Changed back to _id for MongoDB
  name: string;
  message: string;
  image?: string;
  approved: boolean;
  createdAt?: string;
};

const AdminTestimonials = () => {
  const {
    data: testimonialsData,
    isLoading,
    isError,
    refetch,
  } = useFetchAllTestimonials();

  const testimonials: Testimonial[] = Array.isArray(testimonialsData)
    ? testimonialsData
    : [];

  const { mutateAsync: approveTestimonial, isPending: isApproving } =
    useApproveTestimonial();
  const { mutateAsync: deleteTestimonial, isPending: isDeleting } =
    useDeleteTestimonial();

  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<"approve" | "delete" | "">("");

  const handleApproveTestimonial = async () => {
    if (!selectedTestimonial) return;
    try {
      await approveTestimonial(selectedTestimonial._id);
      refetch();
    } catch (error) {
      console.error("Failed to approve testimonial", error);
    } finally {
      setShowModal(false);
    }
  };

  const handleDeleteTestimonial = async () => {
    if (!selectedTestimonial) return;
    try {
      await deleteTestimonial(selectedTestimonial._id);
      refetch();
    } catch (error) {
      console.error("Failed to delete testimonial", error);
    } finally {
      setShowModal(false);
    }
  };

  if (isLoading) {
    return <TestimonialSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">🌟 Manage Testimonials</h2>
        <div className="text-red-500">
          Failed to load testimonials.{" "}
          <button onClick={() => refetch()} className="text-blue-500 underline">
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">🌟 Manage Testimonials</h2>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
        </button>
      </div>

      <Table
        headers={["Name", "Message", "Image", "Status", "Actions"]}
        data={testimonials.map((testimonial: Testimonial) => [
          // Explicitly typed parameter
          testimonial.name,
          <p key={`msg-${testimonial._id}`} className="truncate max-w-sm">
            {testimonial.message}
          </p>,
          testimonial.image ? (
            <img
              key={`img-${testimonial._id}`}
              src={testimonial.image}
              alt="Testimonial"
              className="w-12 h-12 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <span key={`no-img-${testimonial._id}`} className="text-gray-400">
              No Image
            </span>
          ),
          <span
            key={`status-${testimonial._id}`}
            className={`px-2 py-1 rounded text-sm ${
              testimonial.approved
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {testimonial.approved ? "Approved" : "Pending"}
          </span>,
          <div key={`actions-${testimonial._id}`} className="flex gap-2">
            {!testimonial.approved && (
              <button
                onClick={() => {
                  setSelectedTestimonial(testimonial);
                  setModalAction("approve");
                  setShowModal(true);
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                disabled={isApproving}
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
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300"
              disabled={isDeleting}
            >
              Delete
            </button>
          </div>,
        ])}
      />

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
        isConfirming={modalAction === "delete" ? isDeleting : isApproving}
      />
    </motion.div>
  );
};

export default AdminTestimonials;
