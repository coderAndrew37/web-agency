import ContactForm from "../components/ContactForm";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";

const Contact = () => {
  return (
    <main className="bg-white">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-4">
            Let’s Talk About Your Website
          </h1>
          <p className="text-lg">
            Whether you're just getting started or scaling your coaching or
            eCommerce business, we're here to help.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Contact Details
          </h2>
          <ul className="space-y-6 text-gray-700">
            <li className="flex items-start">
              <MailIcon className="w-5 h-5 text-blue-600 mt-1 mr-3" />
              <span>
                Email us at: <br />
                <a
                  href="mailto:info@sleeksites.co.ke"
                  className="text-blue-600 hover:underline"
                >
                  info@sleeksites.co.ke
                </a>
              </span>
            </li>
            <li className="flex items-start">
              <PhoneIcon className="w-5 h-5 text-blue-600 mt-1 mr-3" />
              <span>
                Call or WhatsApp us:
                <br />
                <a
                  href="tel:+254712345678"
                  className="text-blue-600 hover:underline"
                >
                  +254 712 345 678
                </a>
              </span>
            </li>
            <li className="flex items-start">
              <MapPinIcon className="w-5 h-5 text-blue-600 mt-1 mr-3" />
              <span>
                Based in Nairobi, Kenya
                <br />
                Available Worldwide
              </span>
            </li>
          </ul>
        </div>

        <div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
};

export default Contact;
