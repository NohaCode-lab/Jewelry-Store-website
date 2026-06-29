
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    text: "Absolutely stunning craftsmanship! The engagement ring I got was perfect in every detail. Mariana understood exactly what I wanted.",
    author: "Emily R.",
    rating: 5,
  },
  {
    text: "I loved the experience at Mangata & Gallo — very professional and friendly. They helped me design a custom anniversary band that my wife adores.",
    author: "Jason M.",
    rating: 5,
  },
  {
    text: "Top-quality materials and beautiful designs. The attention to detail is remarkable. I highly recommend them for special occasion jewelry!",
    author: "Sarah A.",
    rating: 5,
  },
]

const Testimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="testimonials" className="bg-lighter">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title text-primary">Client Love</h2>
          <div className="divider" />
          <p className="text-dark/80">What our customers say about their Mangata & Gallo experience</p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg hover:bg-accent/20 transition-all duration-300">
              <div className="relative mb-4">
                <span className="text-6xl text-secondary/20 absolute -top-4 -left-2 font-playfair">"</span>
                <p className="text-dark/80 italic pl-4">{t.text}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-secondary">{"★".repeat(t.rating)}</div>
                <cite className="text-sm font-medium">— {t.author}</cite>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials