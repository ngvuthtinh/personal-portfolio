import { motion } from "framer-motion";
import { Mail, Phone, MapPin, FileText } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const contactInfo = [
  { label: "Email.", value: "ngvuthtinh.work@gmail.com", icon: Mail, href: "mailto:ngvuthtinh.work@gmail.com" },
  { label: "Telephone.", value: "+84 96 314 9280", icon: Phone, href: "tel:0963149280" },
  { label: "Location.", value: "Ho Chi Minh City, VN", icon: MapPin },
  { label: "Repository.", value: "github.com/ngvuthtinh", icon: SiGithub, href: "https://github.com/ngvuthtinh" },
  { label: "Directory.", value: "linkedin.com/in/ngvuthtinh", icon: FaLinkedin, href: "https://www.linkedin.com/in/ngvuthtinh" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 px-6 sm:px-12 md:px-24 border-t border-gray-300 bg-[#F4F0EC] select-none">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header giống các phần khác (Education, TechStack, Honors) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl small-caps tracking-bateman mb-10 sm:mb-14 inline-flex items-center justify-center gap-3 border-b-2 border-[#D4AF37] pb-2 text-[#111] font-bold">
            <Mail className="w-6 sm:w-7 h-6 sm:h-7 text-[#D4AF37]" />
            Reservations & Inquiries
          </h2>

          {/* Bảng thông tin không đóng box, liền mạch với nền giấy kem */}
          <div className="max-w-xl mx-auto space-y-4 sm:space-y-5 text-left text-base sm:text-lg md:text-xl mb-12 sm:mb-14">
            {contactInfo.map(({ label, value, icon: Icon, href }) => (
              <div key={label} className="flex flex-col sm:flex-row sm:items-baseline border-b border-gray-300/80 pb-3 gap-1 sm:gap-0">
                <span className="w-36 text-xs sm:text-sm md:text-base small-caps tracking-widest text-[#111] font-bold shrink-0 flex items-center gap-2">
                  <Icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#D4AF37] inline shrink-0" />
                  {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-link font-medium tracking-wide text-[#111] truncate hover:text-[#D4AF37] text-sm sm:text-base md:text-lg"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="font-medium tracking-wide text-[#111] text-sm sm:text-base md:text-lg">{value}</span>
                )}
              </div>
            ))}
          </div>

          {/* Nút Call to Action */}
          <div className="pt-2">
            <a
              href="#"
              className="btn-bateman inline-flex items-center gap-2 text-xs sm:text-sm md:text-base small-caps tracking-bateman font-bold border-b border-black/60 pb-1 hover:border-[#D4AF37] transition-all duration-300"
            >
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              Extract Curriculum Vitae
            </a>
          </div>
        </motion.div>

        {/* Footer đậm nét rõ ràng */}
        <footer className="text-center text-xs md:text-sm small-caps tracking-widest text-[#111] font-semibold mt-16 sm:mt-20">
          © 2026 Nguyen Vu Thanh Tinh. Flawless in execution, illusory in presence.
        </footer>
      </div>
    </section>
  );
}
