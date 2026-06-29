import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import designer from "../assets/designer.jpg";

const Designer = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section id="designer" className="bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-primary text-center">Meet the Designer</h2>
          <div className="divider" />
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="w-64 md:w-80 rounded-[10px] overflow-hidden shadow-xl">
              <img src={designer} alt="Mariana Gallo" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl text-secondary mb-4">Mariana Gallo</h3>
              <p className="text-dark/80 leading-relaxed mb-4">
                Mariana, the owner and lead designer, graduated from design school with a specialization in diamond cutting and metal smithing. She opened a store in her hometown of Austin, Texas, and has grown her business online while maintaining a small storefront with an atelier attached for Browse. With a passion for elegance and precision, Mariana handcrafts each piece with love and mastery. Her designs blend traditional techniques with contemporary aesthetics, resulting in jewelry that stands the test of time.
              </p>
              <div className="font-brush text-3xl text-secondary text-right">M.G.</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Designer