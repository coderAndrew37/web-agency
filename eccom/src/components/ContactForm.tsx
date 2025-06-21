import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  service: string;
  message: string;
  phone: string;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent successfully! We will contact you soon.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Have questions? Get in touch with our team to discuss how we can
            help grow your coaching business.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className={`mt-1 block w-full p-3 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={`mt-1 block w-full p-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                {...register("phone")}
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-gray-700"
              >
                Service Interested In
              </label>
              <select
                id="service"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                {...register("service")}
              >
                <option value="">Select a service</option>
                <option value="website">Custom Coach Website</option>
                <option value="booking">Online Booking System</option>
                <option value="client">Client Management</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className={`mt-1 block w-full p-3 border ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm`}
                {...register("message", { required: "Message is required" })}
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-md hover:opacity-90 transition-opacity font-medium"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Prefer to email us directly? Contact us at{" "}
            <a
              href="mailto:fitness@sleeksites.co.ke"
              className="text-blue-600 hover:underline"
            >
              fitness@sleeksites.co.ke
            </a>
          </p>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default ContactForm;
