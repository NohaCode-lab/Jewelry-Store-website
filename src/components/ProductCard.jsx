import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const ProductCard = ({ product }) => {
  const [showCarousel, setShowCarousel] = useState(false)

  return (
    <div className="bg-lighter rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="h-64 overflow-hidden">
        <img
          src={product.mainImage}
          alt={product.title}
          loading="lazy" 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-playfair text-primary mb-4">{product.title}</h3>
        <button
          onClick={() => setShowCarousel(!showCarousel)}
          className="text-secondary font-medium inline-flex items-center gap-1 hover:text-primary transition-colors"
        >
          {showCarousel ? 'Hide Details' : 'View Details'}
          <span className="text-lg">→</span>
        </button>

        <AnimatePresence>
          {showCarousel && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={10}
                slidesPerView={1}
                className="rounded-lg"
              >
                {product.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img src={img} alt={`${product.title} view ${idx + 1}`} className="w-full h-64 object-cover rounded-lg" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ProductCard