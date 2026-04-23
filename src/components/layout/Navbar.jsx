import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const menuItems = [
  { label: 'Beranda', path: '/' },
  { label: 'Filosofi', path: '/filosofi' },
  { label: 'Evaluasi', path: '/evaluasi' },
  { label: 'Statistik', path: '/statistik' },
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
          <Link
            to="/"
            className="text-base font-black tracking-ultra text-wr-black hover:text-wr-red transition-colors duration-200"
          >
            WHITEROOM
          </Link>

          <div className="hidden md:flex items-center gap-8">
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
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-wr-black hover:text-wr-gray transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-wr-border py-4">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-xs font-semibold tracking-widest uppercase py-2 transition-colors duration-200 ${
                    isActive(item.path) ? 'text-wr-black' : 'text-wr-gray hover:text-wr-black'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}