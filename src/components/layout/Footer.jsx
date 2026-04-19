import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Beranda', path: '/' },
  { label: 'Filosofi', path: '/filosofi' },
  { label: 'Evaluasi', path: '/evaluasi' },
  { label: 'Pelatihan', path: '/pelatihan' },
  { label: 'Misi', path: '/misi' },
  { label: 'Peringkat', path: '/peringkat' },
  { label: 'Arsip', path: '/arsip' },
  { label: 'Simulasi', path: '/simulasi' },
]

const infoItems = [
  { label: 'Versi', value: '1.0.0' },
  { label: 'Status Sistem', value: 'Aktif' },
  { label: 'Total Subjek', value: '1.247' },
  { label: 'Evaluasi Selesai', value: '8.903' },
  { label: 'Level Tertinggi', value: 'Standar Whiteroom' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-wr-black text-white min-h-footer">
      <div className="page-container py-16">
        {/* Grid Utama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Kolom 1: Logo + Tagline */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="text-xl font-black tracking-ultra text-white hover:text-gray-300 transition-colors duration-200 w-fit"
            >
              WHITEROOM
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Lingkungan terkontrol untuk identifikasi, analisis, dan
              pengembangan kemampuan individu secara sistematis dan terukur.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
                Sistem Aktif
              </span>
            </div>
            <p className="text-xs font-mono text-gray-600 tracking-widest uppercase mt-2">
              ID: WR-SYS-001
            </p>
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase">
              Navigasi
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200 tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/profil"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 tracking-wide"
              >
                Profil
              </Link>
            </nav>
          </div>

          {/* Kolom 3: Info Platform */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase">
              Info Platform
            </h4>
            <div className="flex flex-col gap-3">
              {infoItems.map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">
                    {item.label}
                  </span>
                  <span className="text-xs text-gray-300 font-mono font-bold">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="border border-gray-800 p-4 mt-2">
              <p className="text-xs text-gray-500 leading-relaxed font-mono">
                &ldquo;Individu yang tidak berkembang adalah individu yang
                memilih untuk mundur.&rdquo;
              </p>
              <p className="text-xs text-gray-600 font-mono mt-2">
                — Whiteroom
              </p>
            </div>
          </div>
        </div>

        {/* Garis pemisah */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-xs text-gray-600 font-mono tracking-widest uppercase">
              © {year} Whiteroom. Semua hak dilindungi.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/masuk"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-200 tracking-widest uppercase font-mono"
              >
                Masuk
              </Link>
              <Link
                to="/daftar"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-200 tracking-widest uppercase font-mono"
              >
                Daftar
              </Link>
              <span className="text-xs text-gray-700 font-mono tracking-widest">
                STATIC SITE v1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}