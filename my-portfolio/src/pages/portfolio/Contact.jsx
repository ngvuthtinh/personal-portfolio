import { motion } from "framer-motion";
import { Mail, Phone, MapPin, FileText } from "lucide-react";

const contactInfo = [
  { label: "Email.", value: "hello@tinhnguyen.dev", icon: Mail },
  { label: "Phone.", value: "+84 98 765 4321", icon: Phone },
  { label: "Office.", value: "Ho Chi Minh City, VN", icon: MapPin },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-32 px-8 text-center select-none"
      style={{ backgroundColor: "#1a1a1a", color: "#F8F6F0" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto border-4 border-double border-gray-600 p-12 md:p-16"
      >
        <h2
          className="text-4xl small-caps tracking-bateman mb-12"
          style={{ color: "white" }}
        >
          Reservations & Inquiries
        </h2>

        <div className="space-y-6 mb-16">
          {contactInfo.map(({ label, value, icon: Icon }) => (
            <p key={label} className="text-xl tracking-widest flex items-center justify-center gap-3">
              <Icon className="w-5 h-5 text-gray-400 inline" />
              <span className="small-caps text-gray-400 mr-2">{label}</span>
              {value}
            </p>
          ))}
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-2 border px-8 py-4 small-caps tracking-widest text-lg transition-all duration-500 hover:bg-[#F8F6F0] hover:text-[#111]"
          style={{ borderColor: "#F8F6F0", color: "#F8F6F0" }}
        >
          <FileText className="w-5 h-5" />
          Extract Curriculum Vitae
        </a>
      </motion.div>

      <p className="mt-20 text-sm small-caps tracking-widest text-gray-500">
        © 2026 Nguyen Vu Thanh Tinh. Designed meticulously in Bone & Raised Ink.
      </p>
    </section>
  );
}
