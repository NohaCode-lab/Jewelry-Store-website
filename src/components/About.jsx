import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="about" className="bg-lighter">
      <div className="container-custom text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-primary">Timeless Elegance</h2>
          <div className="divider" />
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-dark/80">
            Mangata and Gallo is a jewellery store that specializes in special occasions like engagements, weddings, and anniversaries. With a passion for elegance and precision, handcrafting each piece with love and mastery. The designs blend traditional techniques with contemporary aesthetics, resulting in jewelry that stands the test of time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default About