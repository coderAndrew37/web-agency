interface BlogLayoutProps {
  title: string;
  excerpt: string;
  image: string;
  what: string;
  why: string;
  how: string;
  forWho: string;
}

const BlogLayout = ({
  title,
  excerpt,
  image,
  what,
  why,
  how,
  forWho,
}: BlogLayoutProps) => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-gray-600">{excerpt}</p>
      </header>

      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-xl mb-10"
      />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What</h2>
        <p className="text-gray-700 leading-relaxed">{what}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Why</h2>
        <p className="text-gray-700 leading-relaxed">{why}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">How</h2>
        <p className="text-gray-700 leading-relaxed">{how}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">For Who</h2>
        <p className="text-gray-700 leading-relaxed">{forWho}</p>
      </section>
    </article>
  );
};

export default BlogLayout;
