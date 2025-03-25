export const TestimonialSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto my-10">
      <div className="h-8 w-48 mx-auto mb-6 bg-gray-300 animate-pulse" />
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-6 border rounded-lg shadow-md bg-white">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gray-300 animate-pulse" />
            <div className="h-4 w-full mb-2 bg-gray-300 animate-pulse" />
            <div className="h-4 w-3/4 mb-2 bg-gray-300 animate-pulse" />
            <div className="h-4 w-1/2 mb-2 bg-gray-300 animate-pulse" />
            <div className="h-4 w-32 mt-4 bg-gray-300 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};
