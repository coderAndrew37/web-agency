const BlogSkeletonCard = () => (
  <div className="min-w-[280px] max-w-sm bg-white rounded-xl shadow-md animate-pulse">
    <div className="w-full h-40 bg-gray-200 rounded-t-xl" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

export default BlogSkeletonCard;
