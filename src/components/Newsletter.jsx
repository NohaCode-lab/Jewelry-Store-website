import { useState } from 'react'
import { motion } from 'framer-motion'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you for subscribing, ${email}!`)
    setEmail('')
  }

  return (
    <section className="relative bg-gradient-to-br from-accent to-yellow-100 py-24 overflow-hidden">
      
      {/* Glow effect */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>

      <div className="container-custom text-center relative z-10">

        {/* Title */}
        <motion.h2 
          className="text-3xl md:text-5xl font-playfair font-bold text-dark mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Join Our Exclusive List 
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="text-dark/70 mb-10 max-w-xl mx-auto text-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Be the first to discover new collections, special offers, and luxury updates.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto bg-white/70 backdrop-blur-lg p-4 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <input 
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent transition"
          />

          <button 
            type="submit" 
            className="btn-primary px-8 py-3 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Subscribe 
          </button>
        </motion.form>

      </div>
    </section>
  )
}

export default Newsletter