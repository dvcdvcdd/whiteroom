import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-6xl md:text-8xl font-black text-gray-100 dark:text-zinc-800 mb-3 md:mb-4">404</p>
      <h1 className="text-xl md:text-2xl font-black text-wr-black dark:text-white mb-2 md:mb-3">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-wr-gray dark:text-zinc-400 text-xs md:text-sm max-w-xs mb-6 md:mb-8 leading-relaxed">
        Halaman yang kamu cari tidak ada atau telah dipindahkan.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/" className="btn-primary text-xs md:text-sm">Ke Beranda</Link>
        <Link to="/evaluasi" className="btn-outline text-xs md:text-sm">Mulai Tes</Link>
      </div>
    </div>
  )
}