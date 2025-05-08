interface BlogLayoutProps {
  title: string;
  excerpt: string;
  image: string;
  what: string;
  why: string;
  how: string;
  forWho: string;
}

const Section = ({
  heading,
  content,
  image,
  reverse = false,
}: {
  heading: string;
  content: string;
  image: string;
  reverse?: boolean;
}) => {
  return (
    <section
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center gap-8 mb-16`}
    >
      <img
        src={image}
        alt={heading}
        className="w-full md:w-1/2 h-64 object-cover rounded-xl shadow"
      />
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">{heading}</h2>
        <p className="text-gray-700 leading-relaxed text-lg">{content}</p>
      </div>
    </section>
  );
};

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
    <article className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-16 text-center ">
        <h1 className="text-5xl font-bold mb-4 mt-4 leading-tight">{title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{excerpt}</p>
      </header>

      <Section heading="What" content={what} image={image} />
      <Section heading="Why" content={why} image={image} reverse />
      <Section heading="How" content={how} image={image} />
      <Section heading="For Who" content={forWho} image={image} reverse />
    </article>
  );
};

export default BlogLayout;
