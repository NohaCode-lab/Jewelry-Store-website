import { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contacts" className="relative bg-gradient-to-br from-white to-gray-100 py-24 overflow-hidden">
      
      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>

      <div className="container-custom max-w-2xl mx-auto relative z-10">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary text-center mb-4">
          Contact Us
        </h2>

        <p className="text-center text-gray-600 mb-10">
          We'd love to hear from you. Send us a message and we’ll respond as soon as possible.
        </p>

        {/* Form Card */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          />

          {/* Message */}
          <textarea
            placeholder="Your Message"
            rows={5}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
          />

          {/* Button */}
          <button 
            type="submit" 
            className="w-full py-3 rounded-xl bg-primary text-white font-medium shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Send Message ✉️
          </button>

        </motion.form>
      </div>
    </section>
  )
}

export default Contact