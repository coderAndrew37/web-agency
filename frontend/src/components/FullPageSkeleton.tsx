export const FullPageSkeleton = () => (
  <div className="min-h-screen flex flex-col">
    {/* Navbar Skeleton */}
    <div className="h-16 bg-gray-200 animate-pulse"></div>

    {/* Main Content Skeleton */}
    <div className="flex-1 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>

    {/* Footer Skeleton */}
    <div className="h-20 bg-gray-200 animate-pulse"></div>
  </div>
);
