import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Target, Eye, Database, Shield, ChevronRight, Flame } from 'lucide-react'
import { ambilDataPoin, getKelas, getKelasBerikutnya, getProgresKelas } from '../utils/poinSystem'

const kategori = [
  { icon: Brain, judul: 'Logika', desc: 'Berpikir deduktif, induktif, dan analitis.', path: '/evaluasi/logika' },
  { icon: Target, judul: 'Strategi', desc: 'Perencanaan dan pengambilan keputusan.', path: '/evaluasi/strategi' },
  { icon: Eye, judul: 'Observasi', desc: 'Menangkap detail dan pola tersembunyi.', path: '/evaluasi/observasi' },
  { icon: Database, judul: 'Memori', desc: 'Memori jangka pendek dan daya ingat.', path: '/evaluasi/memori' },
  { icon: Shield, judul: 'Kontrol Emosi', desc: 'Stabilitas di bawah tekanan.', path: '/evaluasi/emosi' },
]

const quotes = [
  'Hasil bicara. Alasan tidak.',
  'Yang lemah dieliminasi. Yang kuat bertahan.',
  'Bakat tanpa disiplin adalah potensi yang mati.',
  'Kemenangan sejati adalah menguasai diri sendiri.',
  'Individu yang tidak berkembang adalah individu yang memilih untuk mundur.',
]

function TypingText({ text }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(interval)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span>
      {displayed}
      {!done && <span className="animate-pulse">|</span>}
    </span>
  )
}

function ProgresCepat() {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(ambilDataPoin())
  }, [])

  if (!data || data.totalPoin === 0) return null

  const kelas = getKelas(data.totalPoin)
  const kelasNext = getKelasBerikutnya(data.totalPoin)
  const progres = getProgresKelas(data.totalPoin)

  return (
    <div className="border border-wr-border dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono font-bold tracking-widest uppercase px-2 py-0.5 border ${kelas.bg}`}>
            {kelas.id}
          </span>
          <span className="text-sm font-bold text-wr-black dark:text-white">{kelas.nama}</span>
        </div>
        <span className="text-sm font-mono font-bold text-wr-black dark:text-white">{data.totalPoin} poin</span>
      </div>

      {kelasNext && (
        <div className="mb-3">
          <div className="w-full bg-wr-muted dark:bg-zinc-800 h-1.5">
            <div className="h-1.5 bg-wr-black dark:bg-white transition-all duration-500" style={{ width: `${progres.persen}%` }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] font-mono text-wr-gray dark:text-zinc-500">{progres.sisa} poin ke {kelasNext.id}</span>
            <span className="text-[10px] font-mono text-wr-gray dark:text-zinc-500">{progres.persen}%</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 text-xs font-mono text-wr-gray dark:text-zinc-500">
        <span>{data.totalTes} tes selesai</span>
        {data.streak > 0 && (
          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
            <Flame size={10} /> {data.streak} hari
          </span>
        )}
      </div>

      <Link to="/profil" className="text-[10px] font-mono text-wr-gray dark:text-zinc-500 hover:text-wr-black dark:hover:text-white transition-colors tracking-widest uppercase mt-3 inline-block">
        Lihat profil lengkap →
      </Link>
    </div>
  )
}

export default function Beranda() {
  const [quoteIndex] = useState(() => Math.floor(Math.random() * quotes.length))

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-24 relative overflow-hidden bg-wr-black dark:bg-zinc-950">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Garis dekoratif */}
        <div className="absolute top-0 left-6 md:left-12 lg:left-24 w-px h-full bg-gray-800" />
        <div className="absolute top-0 right-6 md:right-12 lg:right-24 w-px h-full bg-gray-800" />

        <div className="relative max-w-7xl mx-auto w-full">
          {/* Protokol label */}
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-2 h-2 bg-green-500 animate-pulse" />
            <p className="text-[10px] md:text-xs font-mono text-gray-500 tracking-widest uppercase">
              Protokol WR-EVAL aktif — Sistem operasional
            </p>
          </div>

          {/* Judul */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-[0.85] mb-6 md:mb-8">
            WHITE
            <br />
            <span className="text-gray-600">ROOM</span>
          </h1>

          {/* Tagline */}
          <div className="max-w-xl mb-4">
            <p className="text-base md:text-lg text-gray-300 font-medium leading-relaxed">
              Platform evaluasi dan pelatihan kemampuan berpikir.
            </p>
          </div>

          {/* Deskripsi tegas */}
          <p className="text-xs md:text-sm text-gray-500 max-w-md mb-8 md:mb-10 leading-relaxed">
            Uji logika, memori, observasi, strategi, dan kontrol emosi.
            Soal diacak setiap sesi. Skor langsung. Review jawaban.
            Tanpa akun. Langsung mulai.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12">
            <Link
              to="/evaluasi"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold tracking-widest uppercase px-6 py-3 md:px-8 md:py-4 border border-white text-white hover:bg-white hover:text-wr-black transition-all duration-200"
            >
              Mulai Evaluasi
              <ChevronRight size={14} />
            </Link>
            <Link
              to="/ujian"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold tracking-widest uppercase px-6 py-3 md:px-8 md:py-4 border border-gray-700 text-gray-400 hover:border-white hover:text-white transition-all duration-200"
            >
              Ujian Komprehensif
            </Link>
          </div>

          {/* Quote */}
          <div className="border-l-2 border-gray-700 pl-4 md:pl-6 max-w-md">
            <p className="text-xs md:text-sm font-mono text-gray-600 italic leading-relaxed">
              &ldquo;<TypingText text={quotes[quoteIndex]} />&rdquo;
            </p>
            <p className="text-[10px] font-mono text-gray-700 mt-2 tracking-widest uppercase">
              — Whiteroom
            </p>
          </div>
        </div>
      </section>

      {/* ═══ PROGRES CEPAT (jika ada data) ═══ */}
      <section className="py-8 md:py-10 border-b border-wr-border dark:border-zinc-800">
        <div className="page-container">
          <ProgresCepat />
        </div>
      </section>

      {/* ═══ APA ITU WHITEROOM ═══ */}
      <section className="py-16 md:py-20 border-b border-wr-border dark:border-zinc-800">
        <div className="page-container">
          <div className="max-w-3xl">
            <p className="section-label mb-4">Tentang</p>
            <h2 className="text-2xl md:text-3xl font-black text-wr-black dark:text-white tracking-tight mb-4">
              Apa Itu Whiteroom?
            </h2>
            <p className="text-sm md:text-base text-wr-gray dark:text-zinc-400 leading-relaxed mb-6">
              Whiteroom adalah platform evaluasi kemampuan berpikir yang dirancang
              untuk mengukur dan melatih 5 dimensi kognitif secara terstruktur.
              Setiap tes menghasilkan skor langsung dengan penjelasan jawaban,
              sehingga kamu tahu persis di mana kekuatan dan kelemahanmu.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { nomor: '01', judul: 'Evaluasi', desc: 'Tes dengan timer. Skor disimpan. Poin dihitung.' },
                { nomor: '02', judul: 'Latihan', desc: 'Tanpa timer. Penjelasan langsung tiap soal.' },
                { nomor: '03', judul: 'Progres', desc: 'Statistik personal. Naik kelas. Raih badge.' },
              ].map((step) => (
                <div key={step.nomor} className="border border-wr-border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900">
                  <span className="font-mono text-2xl font-bold text-gray-100 dark:text-zinc-800 block mb-2">
                    {step.nomor}
                  </span>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-wr-black dark:text-white mb-1">
                    {step.judul}
                  </h3>
                  <p className="text-xs text-wr-gray dark:text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5 KATEGORI ═══ */}
      <section className="py-16 md:py-20 bg-wr-surface dark:bg-zinc-900 border-b border-wr-border dark:border-zinc-800">
        <div className="page-container">
          <p className="section-label mb-4">5 Dimensi Kemampuan</p>
          <h2 className="text-2xl md:text-3xl font-black text-wr-black dark:text-white tracking-tight mb-8">
            Kategori Evaluasi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {kategori.map((k) => {
              const Icon = k.icon
              return (
                <Link
                  key={k.judul}
                  to={k.path}
                  className="card-wr flex flex-col gap-3 group"
                >
                  <div className="w-10 h-10 border border-wr-border dark:border-zinc-700 flex items-center justify-center group-hover:border-wr-black dark:group-hover:border-zinc-400 transition-colors">
                    <Icon size={18} className="text-wr-black dark:text-white" />
                  </div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-wr-black dark:text-white">
                    {k.judul}
                  </h3>
                  <p className="text-xs text-wr-gray dark:text-zinc-400 leading-relaxed">{k.desc}</p>
                  <span className="text-[10px] font-mono text-wr-gray dark:text-zinc-500 group-hover:text-wr-black dark:group-hover:text-white transition-colors mt-auto flex items-center gap-1">
                    Mulai tes <ChevronRight size={10} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ PRINSIP ═══ */}
      <section className="py-16 md:py-20 border-b border-wr-border dark:border-zinc-800">
        <div className="page-container">
          <p className="section-label mb-8">Prinsip</p>
          <div className="flex flex-col divide-y divide-wr-border dark:divide-zinc-800 max-w-3xl">
            {[
              'Kelemahan diidentifikasi, bukan disembunyikan.',
              'Kemampuan diukur dengan presisi, bukan tebakan.',
              'Progres dibangun dari konsistensi, bukan keberuntungan.',
            ].map((kalimat, i) => (
              <div key={i} className="py-6 md:py-8 flex items-start gap-4 md:gap-6">
                <span className="font-mono text-xs text-gray-200 dark:text-zinc-800 mt-1 min-w-[1.5rem]">
                  0{i + 1}
                </span>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-wr-black dark:text-white leading-snug">
                  {kalimat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FITUR UTAMA ═══ */}
      <section className="py-16 md:py-20 bg-wr-surface dark:bg-zinc-900 border-b border-wr-border dark:border-zinc-800">
        <div className="page-container">
          <p className="section-label mb-4">Fitur</p>
          <h2 className="text-2xl md:text-3xl font-black text-wr-black dark:text-white tracking-tight mb-8">
            Yang Kamu Dapatkan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {[
              { judul: '250 Soal', desc: '50 soal per kategori. Diacak setiap sesi.' },
              { judul: '2 Mode Tes', desc: 'Mode Evaluasi (timer + skor) dan Mode Latihan (tanpa timer + penjelasan langsung).' },
              { judul: 'Ujian Komprehensif', desc: '50 soal dari semua kategori sekaligus. Poin ×2.' },
              { judul: 'Review Jawaban', desc: 'Setiap soal dilengkapi penjelasan setelah tes selesai.' },
              { judul: 'Sistem Kelas & Poin', desc: 'Naik dari Kelas D ke Whiteroom Elite berdasarkan poin.' },
              { judul: 'Badge Pencapaian', desc: '17 badge yang hanya terbuka dari pencapaian nyata.' },
              { judul: 'Statistik Personal', desc: 'Kategori terkuat, terlemah, dan progres waktu ke waktu.' },
              { judul: 'Soal Bergambar', desc: 'Visual interaktif untuk tes observasi.' },
              { judul: 'Tanpa Akun', desc: 'Langsung mulai. Data tersimpan lokal di perangkatmu.' },
            ].map((f) => (
              <div key={f.judul} className="border border-wr-border dark:border-zinc-800 p-4 md:p-5 bg-white dark:bg-zinc-900/50">
                <h3 className="text-sm font-bold text-wr-black dark:text-white mb-1">{f.judul}</h3>
                <p className="text-xs text-wr-gray dark:text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SISTEM KELAS ═══ */}
      <section className="py-16 md:py-20 border-b border-wr-border dark:border-zinc-800">
        <div className="page-container">
          <p className="section-label mb-4">Klasifikasi</p>
          <h2 className="text-2xl md:text-3xl font-black text-wr-black dark:text-white tracking-tight mb-4">
            Sistem Kelas
          </h2>
          <p className="text-sm text-wr-gray dark:text-zinc-400 max-w-lg mb-8">
            Setiap evaluasi yang kamu selesaikan menghasilkan poin. Poin menentukan kelasmu. Semakin tinggi kelas, semakin teruji kemampuanmu.
          </p>

          <div className="flex flex-col gap-2 max-w-md">
            {[
              { id: 'D', nama: 'Kelas D — Kandidat', poin: '0+', desc: 'Awal perjalanan.' },
              { id: 'C', nama: 'Kelas C — Subjek', poin: '500+', desc: 'Fondasi terbangun.' },
              { id: 'B', nama: 'Kelas B — Analis', poin: '1.500+', desc: 'Kemampuan analitis kuat.' },
              { id: 'A', nama: 'Kelas A — Strategis', poin: '3.500+', desc: 'Berpikir strategis dan adaptif.' },
              { id: 'W', nama: 'Whiteroom Elite', poin: '7.000+', desc: 'Level tertinggi. Penguasaan menyeluruh.' },
            ].map((k) => (
              <div key={k.id} className="flex items-center gap-4 border border-wr-border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
                <span className="text-lg font-black font-mono text-wr-black dark:text-white w-8 text-center">{k.id}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-wr-black dark:text-white">{k.nama}</p>
                  <p className="text-[10px] text-wr-gray dark:text-zinc-500 font-mono">{k.poin} poin — {k.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA AKHIR ═══ */}
      <section className="bg-wr-black dark:bg-zinc-900 dark:border-t dark:border-zinc-800 py-16 md:py-24">
        <div className="page-container text-center">
          <p className="text-xs font-mono text-gray-600 tracking-widest uppercase mb-4">
            Evaluasi dimulai sekarang
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Buktikan Kemampuanmu.
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-8 max-w-md mx-auto">
            Tidak ada jalan pintas. Tidak ada pengecualian.
            Masuki Whiteroom dan ketahui di mana posisimu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/evaluasi"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold tracking-widest uppercase px-8 py-4 border border-white text-white hover:bg-white hover:text-wr-black transition-all duration-200"
            >
              Mulai Sekarang
              <ChevronRight size={14} />
            </Link>
            <Link
              to="/filosofi"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold tracking-widest uppercase px-8 py-4 border border-gray-700 text-gray-500 hover:border-white hover:text-white transition-all duration-200"
            >
              Baca Filosofi
            </Link>
          </div>

          {/* Catatan jujur */}
          <p className="text-[10px] font-mono text-gray-700 mt-8 max-w-sm mx-auto leading-relaxed">
            Semua data tersimpan lokal di perangkatmu. Tidak ada akun, tidak ada server.
            Progressmu adalah milikmu sendiri.
          </p>
        </div>
      </section>
    </div>
  )
}