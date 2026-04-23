import { Link } from 'react-router-dom'
import { Github, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-wr-black text-white">
      <div className="page-container py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-start">
          <div>
            <Link
              to="/"
              className="text-base md:text-lg font-black tracking-ultra text-white hover:text-gray-300 transition-colors"
            >
              WHITEROOM
            </Link>
            <p className="text-gray-500 text-xs md:text-sm mt-2 max-w-xs">
              Platform evaluasi kemampuan berpikir.
            </p>

            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://instagram.com/USERNAME_KAMU"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors group"
                aria-label="Instagram"
              >
                <Instagram size={14} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase">Instagram</span>
              </a>
              <a
                href="https://github.com/dvcdvcdd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors group"
                aria-label="GitHub"
              >
                <Github size={14} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase">GitHub</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-6">
            <Link to="/" className="text-[10px] md:text-xs text-gray-500 hover:text-white transition-colors tracking-widest uppercase font-mono">Beranda</Link>
            <Link to="/filosofi" className="text-[10px] md:text-xs text-gray-500 hover:text-white transition-colors tracking-widest uppercase font-mono">Filosofi</Link>
            <Link to="/evaluasi" className="text-[10px] md:text-xs text-gray-500 hover:text-white transition-colors tracking-widest uppercase font-mono">Evaluasi</Link>
            <Link to="/statistik" className="text-[10px] md:text-xs text-gray-500 hover:text-white transition-colors tracking-widest uppercase font-mono">Statistik</Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="text-[10px] md:text-xs text-gray-700 font-mono tracking-widest uppercase">
              © {new Date().getFullYear()} Whiteroom
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/USERNAME_KAMU" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={13} />
              </a>
              <a href="https://github.com/dvcdvcdd" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white transition-colors" aria-label="GitHub">
                <Github size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}