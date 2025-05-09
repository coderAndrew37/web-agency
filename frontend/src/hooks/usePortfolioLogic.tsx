import { useMemo, useState, useEffect } from "react";
import { webProjects, appProjects } from "../data/projects";

const normalizeCategory = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes("mobile") || t.includes("app")) return "Mobile";
  if (t.includes("web") || t.includes("website")) return "Web";
  if (t.includes("e-commerce")) return "E-commerce";
  if (t.includes("brand")) return "Branding";
  return "Other";
};

const allProjects = [...webProjects, ...appProjects].map((p) => ({
  ...p,
  category: normalizeCategory(p.title),
}));

export const usePortfolioLogic = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      const matchCategory = filter === "All" || p.category === filter;
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [filter, search]);

  const totalPages = Math.ceil(filtered.length / projectsPerPage);
  const currentProjects = filtered.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return {
    filter,
    setFilter,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    currentProjects,
    totalPages,
  };
};
