import { Link } from 'react-router-dom'
import { Brain, Target, Eye, Zap, Shield } from 'lucide-react'

const pilar = [
  { icon: Brain, judul: 'Logika', desc: 'Berpikir sistematis, deduktif, dan analitis.', path: '/evaluasi/logika' },
  { icon: Target, judul: 'Strategi', desc: 'Perencanaan dan pengambilan keputusan efektif.', path: '/evaluasi/strategi' },
  { icon: Eye, judul: 'Observasi', desc: 'Membaca pola dan detail tersembunyi.', path: '/evaluasi/observasi' },
  { icon: Zap, judul: 'Memori', desc: 'Memori dan daya ingat jangka pendek.', path: '/evaluasi/memori' },
  { icon: Shield, judul: 'Kontrol Emosi', desc: 'Kontrol emosi di bawah tekanan.', path: '/evaluasi/emosi' },
]

const caraKerja = [
  { nomor: '01', judul: 'Pilih Tes', desc: 'Pilih salah satu dari 5 kategori tes yang tersedia.' },
  { nomor: '02', judul: 'Kerjakan Soal', desc: 'Soal diacak setiap sesi. Timer berjalan saat tes dimulai.' },
  { nomor: '03', judul: 'Review Hasil', desc: 'Skor langsung muncul. Lihat review tiap soal beserta penjelasannya.' },
]

export default function Beranda() {
  return (
    <div>
      {/* HERO */}
      <section className="min-h-[40vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="section-label mb-3 md:mb-4">Evaluasi Kemampuan Berpikir</p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-wr-black dark:text-white leading-[0.9] mb-4 md:mb-6">
            WHITE<br />ROOM
          </h1>
          <p className="text-base md:text-xl text-wr-gray dark:text-zinc-400 mb-2 md:mb-3 max-w-lg">
            Asah kemampuan berpikir. Ukur hasilnya.
          </p>
          <p className="text-xs md:text-sm text-wr-gray dark:text-zinc-500 max-w-md mb-8 md:mb-10 leading-relaxed">
            Serangkaian tes terstruktur untuk melatih logika, memori, observasi,
            strategi, dan pengendalian diri. Soal diacak setiap sesi. Review
            jawaban tersedia setelah tes selesai.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/evaluasi" className="btn-primary text-center">Mulai Tes</Link>
            <Link to="/filosofi" className="btn-outline text-center">Filosofi</Link>
          </div>
        </div>
      </section>

      {/* 5 KATEGORI */}
      <section className="py-16 md:py-20 bg-wr-surface dark:bg-zinc-900 border-y border-wr-border dark:border-zinc-800">
        <div className="page-container">
          <p className="section-label mb-6 md:mb-8">Lima Kategori Tes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {pilar.map((p) => {
              const Icon = p.icon
              return (
                <Link key={p.judul} to={p.path} className="card-wr flex flex-col gap-3 group">
                  <div className="w-10 h-10 border border-wr-border dark:border-zinc-700 flex items-center justify-center group-hover:border-wr-black dark:group-hover:border-zinc-400 transition-colors">
                    <Icon size={18} className="text-wr-black dark:text-white" />
                  </div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-wr-black dark:text-white">
                    {p.judul}
                  </h3>
                  <p className="text-sm text-wr-gray dark:text-zinc-400 leading-relaxed">{p.desc}</p>
                  <span className="text-xs font-mono text-wr-gray dark:text-zinc-500 group-hover:text-wr-black dark:group-hover:text-white transition-colors mt-auto">
                    Mulai tes →
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section className="py-16 md:py-20">
        <div className="page-container">
          <p className="section-label mb-6 md:mb-8">Cara Kerja</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
            {caraKerja.map((step) => (
              <div key={step.nomor} className="bg-white dark:bg-zinc-900 p-6 md:p-8 border border-wr-border dark:border-zinc-800">
                <span className="font-mono text-2xl md:text-3xl font-bold text-gray-100 dark:text-zinc-800 block mb-3 md:mb-4">
                  {step.nomor}
                </span>
                <h3 className="text-sm font-bold tracking-widest uppercase text-wr-black dark:text-white mb-2">
                  {step.judul}
                </h3>
                <p className="text-sm text-wr-gray dark:text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-wr-black dark:bg-zinc-900 dark:border-t dark:border-zinc-800 py-16 md:py-20">
        <div className="page-container text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
            Siap Mengasah Otakmu?
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-8 max-w-md mx-auto">
            Pilih kategori tes dan mulai sekarang. Tanpa akun, tanpa ribet.
          </p>
          <Link
            to="/evaluasi"
            className="inline-block text-sm font-semibold tracking-widest uppercase px-6 py-3 md:px-8 md:py-4 border border-white text-white hover:bg-white hover:text-wr-black transition-all duration-200"
          >
            Mulai Sekarang
          </Link>
        </div>
      </section>
    </div>
  )
}