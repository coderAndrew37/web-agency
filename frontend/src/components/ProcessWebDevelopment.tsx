import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClipboardCheck, Layout, Rocket, ShieldCheck } from "lucide-react";
import colors from "../styles/colors";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "1️⃣ Discovery & Strategy",
    description: `We start with a deep dive into your business goals, target audience, and competitors. 
      This helps us create a blueprint for a website that aligns with your business vision.`,
    icon: <ClipboardCheck size={40} style={{ color: colors.primary }} />,
    image: "/images/strategy.jpg",
  },
  {
    title: "2️⃣ UI/UX Design & Prototyping",
    description: `We design a wireframe & visual layout, ensuring smooth user experience (UX) and a modern, 
      conversion-focused UI. You get to review and suggest changes before we start development.`,
    icon: <Layout size={40} style={{ color: colors.primary }} />,
    image: "/images/design.jpg",
  },
  {
    title: "3️⃣ Development & Testing",
    description: `Our team writes clean, scalable code for performance & security. We integrate 
      functionalities such as booking systems, e-commerce, and automation while running tests for bugs.`,
    icon: <Rocket size={40} style={{ color: colors.primary }} />,
    image: "/images/development.jpg",
  },
  {
    title: "4️⃣ Deployment & Ongoing Optimization",
    description: `Once launched, we monitor performance, optimize speed, and provide security updates. 
      Websites evolve, so we ensure yours remains competitive.`,
    icon: <ShieldCheck size={40} style={{ color: colors.primary }} />,
    image: "/images/maintenance.jpg",
  },
];

const ProcessWebDevelopment = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return; // ✅ Ensure sectionRef is not null

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".process-step"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20"
      style={{ backgroundColor: colors.background, color: colors.darkText }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">
          Our Web Development Process
        </h2>

        {steps.map((step, index) => (
          <div
            key={index}
            className={`process-step flex flex-col md:flex-row items-center mb-12 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Section */}
            <div className="md:w-1/2">
              <img
                src={step.image}
                alt={step.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 p-6">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                {step.icon}
                <h3 className="text-2xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-gray-600 text-lg">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA - Encourage the user to take action */}
      <div className="text-center mt-16">
        <h3 className="text-3xl font-semibold mb-4">
          Ready to Build a Website That Works?
        </h3>
        <p className="text-gray-500 mb-6">
          We take care of everything—design, development, SEO, and automation.
          You focus on growing your business.
        </p>
        <a
          href="/contact"
          className="px-6 py-3 font-bold rounded-full shadow-md hover:opacity-80 transition"
          style={{ backgroundColor: colors.primary, color: "#fff" }}
        >
          Book a Free Consultation
        </a>
      </div>
    </section>
  );
};

export default ProcessWebDevelopment;
