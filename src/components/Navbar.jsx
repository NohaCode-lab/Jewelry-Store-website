import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logo2 from "../assets/logo2.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    return () => (document.body.style.overflow = 'auto')
  }, [isOpen])

  const navLinks = [
    { id: 'about', name: 'About' },
    { id: 'designer', name: 'Designer' },
    { id: 'products', name: 'Collections' },
    { id: 'contacts', name: 'Contact' },
  ]

  const handleNavClick = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 relative transition-all duration-500
        before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] before:bg-white/10
        ${scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">

        {/* LOGO */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group"
        >
          <img
            src={logo2}
            alt="Mangata & Gallo"
            className="h-10 w-10 rounded-full ring-1 ring-white/20 transition duration-300 group-hover:scale-105 group-hover:opacity-80"
          />

          <span className="text-lg md:text-xl font-playfair tracking-wide text-white group-hover:opacity-80 transition">
            Mangata & Gallo
          </span>
        </button>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white z-50"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:block">
          <ul className="flex gap-10">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="relative text-white/70 hover:text-white tracking-widest text-sm uppercase transition duration-300 group"
                >
                  {link.name}

                  {/* underline luxury */}
                  <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500 group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 md:hidden"
            >
              <ul className="flex flex-col items-center py-10 gap-6">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => {
                        handleNavClick(link.id)
                        setIsOpen(false)
                      }}
                      className="text-white/70 text-lg tracking-widest uppercase hover:text-yellow-400 transition"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  )
}

export default Navbar