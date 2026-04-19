import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-8xl font-black text-gray-100 mb-4">404</p>
      <h1 className="text-2xl font-black text-wr-black mb-3">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-wr-gray text-sm max-w-xs mb-8 leading-relaxed">
        Halaman yang kamu cari tidak ada atau telah dipindahkan.
      </p>
      <div className="flex gap-4">
        <Link to="/" className="btn-primary">
          Ke Beranda
        </Link>
        <Link to="/evaluasi" className="btn-outline">
          Mulai Tes
        </Link>
      </div>
    </div>
  )
}