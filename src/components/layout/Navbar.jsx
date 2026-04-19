import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const menuItems = [
  { label: 'Beranda', path: '/' },
  { label: 'Filosofi', path: '/filosofi' },
  { label: 'Evaluasi', path: '/evaluasi' },
  { label: 'Pelatihan', path: '/pelatihan' },
  { label: 'Misi', path: '/misi' },
  { label: 'Peringkat', path: '/peringkat' },
  { label: 'Arsip', path: '/arsip' },
  { label: 'Simulasi', path: '/simulasi' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-wr-border">
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-base font-black tracking-ultra text-wr-black hover:text-wr-red transition-colors duration-200"
          >
            WHITEROOM
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-wr-black border-b border-wr-black pb-0.5'
                    : 'text-wr-gray hover:text-wr-black'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/masuk"
              className="btn-outline text-xs py-2 px-4"
            >
              Masuk
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-wr-black hover:text-wr-gray transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-wr-border py-4">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-xs font-semibold tracking-widest uppercase py-2 transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-wr-black'
                      : 'text-wr-gray hover:text-wr-black'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/masuk"
                onClick={() => setMenuOpen(false)}
                className="btn-primary text-center text-xs py-2"
              >
                Masuk
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}