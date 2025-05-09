import Portfolio from "../components/PortfolioShowcase";
import { usePortfolioLogic } from "../hooks/usePortfolioLogic";

const categories = ["All", "Web", "Mobile", "E-commerce", "Branding"];

const PortfolioPage = () => {
  const {
    currentProjects,
    totalPages,
    currentPage,
    setCurrentPage,
    filter,
    setFilter,
    search,
    setSearch,
  } = usePortfolioLogic();

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 pt-28">
      <h1 className="text-4xl font-bold text-center mb-8">🎨 Our Portfolio</h1>

      {/* Search */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded shadow-sm"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              cat === filter
                ? "bg-primary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Portfolio projects={currentProjects} />

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PortfolioPage;
