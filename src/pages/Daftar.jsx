import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'

export default function Daftar() {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    katasandi: '',
    konfirmasi: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Static site — tidak ada backend
  }

  const inputClass =
    'w-full border border-wr-border bg-white px-4 py-3 text-sm text-wr-black placeholder-gray-300 focus:outline-none focus:border-wr-black transition-colors font-mono'
  const labelClass =
    'block text-xs font-mono tracking-widest text-wr-gray uppercase mb-2'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="min-h-[25vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 bg-wr-black text-white">
        <div className="max-w-7xl mx-auto w-full">
          <p className="section-label text-gray-500 mb-3">Pendaftaran</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white">
            DAFTAR
          </h1>
          <p className="text-gray-400 mt-2">
            Daftarkan diri sebagai subjek Whiteroom.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-3 mb-10">
            <UserPlus size={20} className="text-wr-black" />
            <span className="text-sm font-mono tracking-widest text-wr-gray uppercase">
              Formulir Pendaftaran
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="nama" className={labelClass}>
                Nama Pengguna
              </label>
              <input
                id="nama"
                name="nama"
                type="text"
                value={form.nama}
                onChange={handleChange}
                placeholder="nama_subjek"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="subjek@domain.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="katasandi" className={labelClass}>
                Kata Sandi
              </label>
              <input
                id="katasandi"
                name="katasandi"
                type="password"
                value={form.katasandi}
                onChange={handleChange}
                placeholder="••••••••••"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="konfirmasi" className={labelClass}>
                Konfirmasi Kata Sandi
              </label>
              <input
                id="konfirmasi"
                name="konfirmasi"
                type="password"
                value={form.konfirmasi}
                onChange={handleChange}
                placeholder="••••••••••"
                className={inputClass}
              />
            </div>

            <div className="border border-wr-border p-4 bg-wr-surface">
              <p className="text-xs text-wr-gray leading-relaxed">
                Dengan mendaftar, kamu menyetujui proses evaluasi dan pembentukan
                kemampuan yang dijalankan oleh Whiteroom. Semua data yang
                dikumpulkan digunakan semata-mata untuk tujuan pengembangan
                kemampuan individu.
              </p>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-4 text-center mt-2"
            >
              DAFTAR SEKARANG
            </button>
          </form>

          <div className="mt-8 text-center flex flex-col gap-3">
            <p className="text-sm text-wr-gray">
              Sudah terdaftar?{' '}
              <Link
                to="/masuk"
                className="text-wr-black font-semibold hover:underline"
              >
                Masuk di sini
              </Link>
            </p>
            <p className="text-xs font-mono text-gray-300 border border-wr-border px-4 py-2 bg-wr-surface">
              ⚠ Formulir ini tidak aktif — static site tanpa backend.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}