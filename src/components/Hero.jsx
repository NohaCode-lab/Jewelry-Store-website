import { motion } from 'framer-motion'
import hero from "../assets/hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* BACKGROUND IMAGE WITH INFINITE PARALLAX */}
      <motion.img
        src={hero}
        alt="Luxury Jewelry"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ 
          duration: 10, 
          ease: "easeOut", 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* GOLD LIGHT EFFECT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.15),transparent_60%)]"></div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">

        {/* SMALL LABEL */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.3em] text-yellow-400 text-sm mb-6"
        >
          Mangata & Gallo
        </motion.p>

        {/* TITLE */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-playfair font-semibold leading-tight mb-6"
        >
          Timeless Elegance <br /> Crafted to Perfection
        </motion.h1>

        {/* LINE */}
        <div className="w-24 h-[1px] bg-yellow-500 mx-auto mb-8"></div>

        {/* DESCRIPTION */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/70 text-lg md:text-xl mb-10"
        >
          Discover fine jewelry designed for life’s most meaningful moments. 
          Each piece reflects artistry, precision, and timeless beauty.
        </motion.p>

        {/* BUTTON */}
        <motion.a
          href="#products"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-block border border-yellow-500 text-yellow-400 px-8 py-4 rounded-full tracking-widest text-sm uppercase hover:bg-yellow-500 hover:text-black transition-all duration-500"
        >
          Explore Collections
        </motion.a>

      </div>
    </section>
  )
}

export default Hero