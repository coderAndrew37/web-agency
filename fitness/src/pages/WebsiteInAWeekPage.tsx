import CallToAction from "../components/CTA";
import StatsSection from "../components/StatsSection";
import Testimonials from "../components/Testimonials";
import ThisSoundFamiliar from "../components/ThisSoundsFamiliar";
import WebsiteInAWeek from "../components/WebsiteInAWeek";
import { CheckCircleIcon } from "lucide-react";
import FeatiresImage from "../assets/features-image.jpeg";

const whatsappLink =
  "https://wa.me/254746577838?text=Hey%2C%20I'm%20interested%20in%20Fitness%20Website%20in%20a%20Week.";

const WebsiteInAWeekPage = () => {
  const inclusions = [
    "Professionally designed homepage using proven template",
    "Mobile-responsive and SEO-ready",
    "Simple contact form setup",
    "Linking to social media platforms",
    "1 round of revision",
    "Hosting guidance & domain connection",
    "Website live in 5 days — guaranteed",
  ];

  return (
    <main>
      <WebsiteInAWeek />

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Why Choose Website in a Week?
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            You're passionate about helping others and building your business.
            But you're stuck wasting hours trying to piece together a website
            that doesn’t reflect your brand or your value. You know you need a
            strong online presence — fast.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            <strong>Website in a Week</strong> is built for entrepreneurs just
            like you: driven, focused, but short on time and resources. We take
            the guesswork, stress, and overwhelm out of building a website so
            you can focus on what matters most — serving your clients.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            With our proven templates, clear structure, and expert guidance,
            we’ll help you launch a beautiful, high-converting website in just 5
            days.
          </p>

          <p className="mt-6 text-lg text-gray-700">
            But don't just take our word for it. Check out some of the stats
            from our previous launches:
          </p>
        </div>
      </section>

      <section className="bg-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="lg:flex lg:gap-16 lg:items-center">
            <div className="lg:flex-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center lg:text-left">
                What’s Included
              </h2>
              <ul className="mt-10 space-y-6">
                {inclusions.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                    <span className="ml-3 text-lg text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:flex-1 lg:mt-0 mt-10">
              <img
                src={FeatiresImage}
                alt="Features illustration"
                className="w-full rounded-lg shadow-md h-96"
              />
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <CallToAction
        title="Let's Get Your Website Launched in a Week"
        description="Ready to go live in just 5 days? Let's do this together."
        primaryButton={{
          text: "Get Started",
          link: whatsappLink,
          target: "_blank",
        }}
        secondaryButton={{
          text: "Contact Us",

          link: "/contact",
        }}
      />

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            What Our Clients Say
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            Don't just take our word for it. Hear from our previous clients who
            have already launched their website in a week.
          </p>
        </div>
        <Testimonials
          title="Real Stories from Real Entrepreneurs"
          subtitle="Our clients are killing it online with their new websites."
          testimonials={[
            {
              id: 1,
              name: "Sarah Johnson",
              role: "Personal Trainer",
              content:
                "My new website has tripled my client inquiries! The team understood exactly what I needed as a fitness coach.",
              avatar: null,
            },
            {
              id: 2,
              name: "Mike Thompson",
              role: "Strength & Conditioning Coach",
              content:
                "The booking system integration has saved me 10+ hours weekly. My clients love the seamless experience.",
              avatar: null,
            },
            {
              id: 3,
              name: "Jessica Williams",
              role: "Yoga Instructor",
              content:
                "Working with them felt like having an extension of my own team. They captured my brand perfectly.",
              avatar: null,
            },
          ]}
        />
      </section>

      <ThisSoundFamiliar />
    </main>
  );
};

export default WebsiteInAWeekPage;
