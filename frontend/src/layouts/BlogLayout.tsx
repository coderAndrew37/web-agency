// src/layouts/BlogLayout.tsx

import DOMPurify from "dompurify";

interface BlogLayoutProps {
  title: string;
  excerpt: string;
  image: string;
  content: string;
}

const BlogLayout = ({ title, excerpt, image, content }: BlogLayoutProps) => {
  return (
    <article className="max-w-6xl mx-auto px-4 py-16">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 leading-tight">{title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{excerpt}</p>
        <img
          src={image}
          alt={title}
          className="w-full h-72 object-cover rounded-xl shadow-lg mt-8"
        />
      </header>

      <section
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      />
    </article>
  );
};

export default BlogLayout;
