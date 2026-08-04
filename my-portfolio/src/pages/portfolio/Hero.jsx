import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[88vh] flex flex-col justify-center items-center px-8 md:px-20 pt-28 pb-16 relative select-none max-w-7xl mx-auto"
    >
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 my-auto">
        {/* Bên trái: Thông tin tên & giới thiệu */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl small-caps tracking-bateman ink-raised mb-6 text-[#111] font-bold"
          >
            Thanh Tinh
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl italic tracking-widest text-gray-800 max-w-xl font-medium leading-relaxed"
          >
            Crafting flawless digital architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-20 h-[1.5px] bg-black/80 my-8 mx-auto md:mx-0"
          />

        </div>

        {/* Bên phải: Chân dung cá nhân giữ nguyên màu sắc tự nhiên, không khung viền */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative shrink-0"
        >
          <img
            src="/avatar.png"
            alt="Nguyen Vu Thanh Tinh"
            className="w-72 md:w-96 lg:w-[400px] h-[360px] md:h-[480px] lg:h-[530px] object-cover rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-500"
          />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 0.7, duration: 0.8 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
        className="absolute bottom-6 text-gray-500 hover:text-black transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
