import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

const BackToTop = () => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', toggle)
    return () => window.removeEventListener('scroll', toggle)
  }, [])
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <button
      onClick={scrollTop}
      className={`fixed bottom-6 right-6 w-12 h-12 bg-accent text-dark rounded-full flex items-center justify-center shadow-lg transition-all ${visible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      aria-label="Back to top"
    >
      <ChevronUp size={20} />
    </button>
  )
}

export default BackToTop