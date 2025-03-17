import { useEffect, useState } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  // ✅ Correct useEffect to update visible pages dynamically
  useEffect(() => {
    const pages: number[] = [];
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.push(i);
    }
    setVisiblePages(pages);
  }, [currentPage, totalPages]); // ✅ Dependency array ensures update when these values change

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        className={`px-3 py-2 rounded ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Prev
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`px-3 py-2 rounded ${
            page === currentPage
              ? "bg-primary text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`px-3 py-2 rounded ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
