const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Personal Trainer",
    content:
      "Since launching my new website, I've doubled my client base. The booking system is so easy for clients to use, and I love the progress tracking features.",
    avatar: null,
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Yoga Instructor",
    content:
      "The website SleekSites built for me perfectly captures my teaching style. I've received so many compliments from clients about how professional it looks.",
    avatar: null,
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Nutrition Coach",
    content:
      "My new website has helped me establish my brand as a serious professional. The investment has already paid for itself with just two new clients!",
    avatar: null,
  },
];

const Testimonials = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Clients Say
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="flex items-center">
                {testimonial.avatar ? (
                  <img
                    className="h-12 w-12 rounded-full"
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-12 h-12" />
                )}
                <div className="ml-4">
                  <div className="text-lg font-medium text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-blue-600">{testimonial.role}</div>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
