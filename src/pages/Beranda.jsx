import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Brain, Target, Eye, Database, Shield, ChevronRight, Flame, ArrowDown } from 'lucide-react'
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

// ─── Animasi Helpers ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.1 }
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const lineExpand = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
}

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Typing Effect ────────────────────────────────────────
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
    }, 50)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span className="font-mono">
      {displayed}
      {!done && <span className="animate-pulse text-white">▌</span>}
    </span>
  )
}

// ─── Progres Widget ───────────────────────────────────────
function ProgresCepat() {
  const [data, setData] = useState(null)
  useEffect(() => { setData(ambilDataPoin()) }, [])
  if (!data || data.totalPoin === 0) return null

  const kelas = getKelas(data.totalPoin)
  const kelasNext = getKelasBerikutnya(data.totalPoin)
  const progres = getProgresKelas(data.totalPoin)

  return (
    <motion.div variants={fadeUp} className="border border-wr-border dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5 md:p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 border ${kelas.bg}`}>{kelas.id}</span>
          <span className="text-sm font-bold text-wr-black dark:text-white">{kelas.nama}</span>
        </div>
        <span className="text-sm font-mono font-bold text-wr-black dark:text-white">{data.totalPoin}</span>
      </div>
      {kelasNext && (
        <div className="mb-3">
          <div className="w-full bg-wr-muted dark:bg-zinc-800 h-1">
            <motion.div
              className="h-1 bg-wr-black dark:bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progres.persen}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] font-mono text-wr-gray dark:text-zinc-600">{progres.sisa} poin ke {kelasNext.id}</span>
          </div>
        </div>
      )}
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-mono text-wr-gray dark:text-zinc-600">{data.totalTes} tes</span>
        {data.streak > 0 && (
          <span className="flex items-center gap-1 text-[10px] font-mono text-wr-gray dark:text-zinc-500">
            <Flame size={9} /> {data.streak}
          </span>
        )}
        <Link to="/profil" className="text-[10px] font-mono text-wr-gray dark:text-zinc-600 hover:text-wr-black dark:hover:text-white transition-colors tracking-widest uppercase ml-auto">
          Profil →
        </Link>
      </div>
    </motion.div>
  )
}

// ─── HALAMAN UTAMA ────────────────────────────────────────
export default function Beranda() {
  const [quoteIndex] = useState(() => Math.floor(Math.random() * quotes.length))
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="min-h-[100vh] flex flex-col justify-center relative overflow-hidden bg-white dark:bg-zinc-950">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Corner decorations */}
        <div className="absolute top-8 left-6 md:left-12 lg:left-24 flex flex-col gap-1">
          <motion.div initial={{ width: 0 }} animate={{ width: 40 }} transition={{ duration: 1, delay: 0.5 }} className="h-px bg-wr-black/20 dark:bg-white/10" />
          <motion.div initial={{ width: 0 }} animate={{ width: 20 }} transition={{ duration: 0.8, delay: 0.7 }} className="h-px bg-wr-black/10 dark:bg-white/5" />
        </div>
        <div className="absolute top-8 right-6 md:right-12 lg:right-24 flex flex-col gap-1 items-end">
          <motion.div initial={{ width: 0 }} animate={{ width: 40 }} transition={{ duration: 1, delay: 0.5 }} className="h-px bg-wr-black/20 dark:bg-white/10" />
          <motion.div initial={{ width: 0 }} animate={{ width: 20 }} transition={{ duration: 0.8, delay: 0.7 }} className="h-px bg-wr-black/10 dark:bg-white/5" />
        </div>

        <div className="px-6 md:px-12 lg:px-24 py-20 md:py-32 relative">
          <div className="max-w-7xl mx-auto w-full">
            {/* Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex items-center gap-3 mb-10 md:mb-14"
            >
              <div className="w-1.5 h-1.5 bg-wr-black dark:bg-white animate-pulse" />
              <p className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-600 tracking-[0.3em] uppercase">
                Sistem Evaluasi Aktif
              </p>
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] font-black tracking-tighter text-wr-black dark:text-white leading-[0.85] select-none"
              >
                WHITE
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8 md:mb-12">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] font-black tracking-tighter text-wr-gray/30 dark:text-zinc-800 leading-[0.85] select-none"
              >
                ROOM
              </motion.h1>
            </div>

            {/* Separator line */}
            <motion.div
              variants={lineExpand}
              initial="hidden"
              animate="visible"
              className="w-full max-w-xs h-px bg-wr-black/10 dark:bg-white/10 origin-left mb-8 md:mb-10"
            />

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="max-w-md mb-6"
            >
              <p className="text-sm md:text-base text-wr-black dark:text-zinc-300 leading-relaxed">
                Platform evaluasi dan pelatihan kemampuan berpikir.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-xs text-wr-gray dark:text-zinc-600 max-w-sm mb-10 md:mb-12 leading-relaxed font-mono"
            >
              Logika · Memori · Observasi · Strategi · Kontrol Emosi
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-3 mb-16 md:mb-20"
            >
              <Link
                to="/evaluasi"
                className="group inline-flex items-center justify-center gap-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase px-6 py-3 md:px-8 md:py-4 bg-wr-black text-white border border-wr-black hover:bg-white hover:text-wr-black dark:bg-white dark:text-wr-black dark:border-white dark:hover:bg-zinc-950 dark:hover:text-white transition-all duration-300"
              >
                Mulai Evaluasi
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ujian"
                className="inline-flex items-center justify-center gap-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase px-6 py-3 md:px-8 md:py-4 border border-wr-border text-wr-gray hover:border-wr-black hover:text-wr-black dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-white dark:hover:text-white transition-all duration-300"
              >
                Ujian Komprehensif
              </Link>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="max-w-sm"
            >
              <div className="border-l border-wr-black/10 dark:border-white/10 pl-4">
                <p className="text-[11px] text-wr-gray dark:text-zinc-600 italic leading-relaxed">
                  &ldquo;<TypingText text={quotes[quoteIndex]} />&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-mono text-wr-gray/50 dark:text-zinc-700 tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown size={12} className="text-wr-gray/30 dark:text-zinc-700 animate-bounce" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PROGRES (jika ada data)
      ═══════════════════════════════════════════════════ */}
      <AnimatedSection className="border-b border-wr-border dark:border-zinc-800">
        <div className="page-container py-6 md:py-8">
          <ProgresCepat />
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════
          TENTANG
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-b border-wr-border dark:border-zinc-800">
        <AnimatedSection className="page-container">
          <div className="max-w-3xl">
            <motion.p variants={fadeUp} className="section-label mb-4">Tentang</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-2xl md:text-3xl lg:text-4xl font-black text-wr-black dark:text-white tracking-tight mb-6">
              Lingkungan terkontrol untuk
              <br />
              <span className="text-wr-gray dark:text-zinc-600">optimalisasi kemampuan berpikir.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-sm text-wr-gray dark:text-zinc-500 leading-relaxed mb-10 max-w-lg">
              Whiteroom mengukur 5 dimensi kognitif secara terstruktur.
              Setiap tes menghasilkan skor langsung dengan penjelasan jawaban.
            </motion.p>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-wr-border dark:bg-zinc-800">
              {[
                { nomor: '01', judul: 'Evaluasi', desc: 'Tes dengan timer. Skor disimpan. Poin dihitung.' },
                { nomor: '02', judul: 'Latihan', desc: 'Tanpa timer. Penjelasan langsung setiap soal.' },
                { nomor: '03', judul: 'Progres', desc: 'Naik kelas. Raih badge. Ukur perkembanganmu.' },
              ].map((step) => (
                <motion.div
                  key={step.nomor}
                  variants={fadeUp}
                  className="bg-white dark:bg-zinc-950 p-6 md:p-8"
                >
                  <span className="font-mono text-3xl md:text-4xl font-black text-wr-black/5 dark:text-white/5 block mb-4">
                    {step.nomor}
                  </span>
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-wr-black dark:text-white mb-2">
                    {step.judul}
                  </h3>
                  <p className="text-xs text-wr-gray dark:text-zinc-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      {/* ═══════════════════════════════════════════════════
          5 KATEGORI
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-b border-wr-border dark:border-zinc-800">
        <AnimatedSection className="page-container">
          <motion.p variants={fadeUp} className="section-label mb-4">Dimensi</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-2xl md:text-3xl font-black text-wr-black dark:text-white tracking-tight mb-10">
            5 Kategori Evaluasi
          </motion.h2>
          <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {kategori.map((k, i) => {
              const Icon = k.icon
              return (
                <motion.div key={k.judul} variants={fadeUp} custom={i}>
                  <Link to={k.path} className="block border border-wr-border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900/30 hover:border-wr-black dark:hover:border-zinc-500 transition-all duration-300 group h-full">
                    <div className="w-9 h-9 border border-wr-border dark:border-zinc-700 flex items-center justify-center mb-4 group-hover:border-wr-black dark:group-hover:border-zinc-400 transition-colors">
                      <Icon size={15} className="text-wr-black dark:text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-wr-black dark:text-white mb-2">
                      {k.judul}
                    </h3>
                    <p className="text-[11px] text-wr-gray dark:text-zinc-500 leading-relaxed mb-4">{k.desc}</p>
                    <span className="text-[10px] font-mono text-wr-gray/50 dark:text-zinc-700 group-hover:text-wr-black dark:group-hover:text-white transition-colors flex items-center gap-1">
                      Mulai <ChevronRight size={8} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRINSIP
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-b border-wr-border dark:border-zinc-800 bg-wr-surface dark:bg-zinc-900/50">
        <AnimatedSection className="page-container">
          <motion.p variants={fadeUp} className="section-label mb-10">Prinsip</motion.p>
          <div className="max-w-3xl flex flex-col">
            {[
              'Kelemahan diidentifikasi, bukan disembunyikan.',
              'Kemampuan diukur dengan presisi, bukan tebakan.',
              'Progres dibangun dari konsistensi, bukan keberuntungan.',
            ].map((kalimat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="py-8 md:py-10 border-b border-wr-border dark:border-zinc-800 last:border-0 flex items-start gap-6"
              >
                <span className="font-mono text-[10px] text-wr-black/10 dark:text-white/5 min-w-[2rem] mt-2 tracking-widest">
                  0{i + 1}
                </span>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-wr-black dark:text-white leading-snug tracking-tight">
                  {kalimat}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ═══════════════════════════════════════════════════
          SISTEM KELAS
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-b border-wr-border dark:border-zinc-800">
        <AnimatedSection className="page-container">
          <motion.p variants={fadeUp} className="section-label mb-4">Klasifikasi</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-2xl md:text-3xl font-black text-wr-black dark:text-white tracking-tight mb-4">
            Sistem Kelas
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-xs text-wr-gray dark:text-zinc-500 max-w-md mb-10 leading-relaxed">
            Poin dari setiap evaluasi menentukan kelasmu. Konsistensi membawa kenaikan.
          </motion.p>

          <motion.div variants={staggerContainer} className="flex flex-col gap-px bg-wr-border dark:bg-zinc-800 max-w-lg">
            {[
              { id: 'D', nama: 'Kandidat', poin: '0' },
              { id: 'C', nama: 'Subjek', poin: '500' },
              { id: 'B', nama: 'Analis', poin: '1.500' },
              { id: 'A', nama: 'Strategis', poin: '3.500' },
              { id: 'W', nama: 'Whiteroom Elite', poin: '7.000' },
            ].map((k, i) => (
              <motion.div
                key={k.id}
                variants={fadeUp}
                custom={i}
                className="flex items-center justify-between bg-white dark:bg-zinc-950 px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-base font-black font-mono text-wr-black dark:text-white w-6 text-center">
                    {k.id}
                  </span>
                  <span className="text-xs text-wr-gray dark:text-zinc-400 tracking-wide">
                    {k.nama}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-wr-gray/50 dark:text-zinc-700 tracking-widest">
                  {k.poin}+
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ═══════════════════════════════════════════════════
          FITUR
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-b border-wr-border dark:border-zinc-800">
        <AnimatedSection className="page-container">
          <motion.p variants={fadeUp} className="section-label mb-4">Platform</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-2xl md:text-3xl font-black text-wr-black dark:text-white tracking-tight mb-10">
            Yang Kamu Dapatkan
          </motion.h2>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-wr-border dark:bg-zinc-800 max-w-4xl">
            {[
              { judul: '250 Soal', desc: '50 per kategori. Diacak setiap sesi.' },
              { judul: '2 Mode', desc: 'Evaluasi (timer + skor) atau Latihan (penjelasan langsung).' },
              { judul: 'Ujian Komprehensif', desc: '50 soal campur dari 5 kategori. Poin ×2.' },
              { judul: 'Review Jawaban', desc: 'Penjelasan lengkap setiap soal setelah tes.' },
              { judul: 'Kelas & Poin', desc: 'Naik dari Kelas D ke Whiteroom Elite.' },
              { judul: '17 Badge', desc: 'Pencapaian nyata dari performa, bukan dekorasi.' },
              { judul: 'Statistik Personal', desc: 'Kekuatan, kelemahan, dan tren progres.' },
              { judul: 'Soal Visual', desc: 'Pola, grid, dan matriks interaktif.' },
              { judul: 'Tanpa Akun', desc: 'Data lokal. Langsung mulai.' },
            ].map((f, i) => (
              <motion.div
                key={f.judul}
                variants={fadeUp}
                custom={i}
                className="bg-white dark:bg-zinc-950 p-5 md:p-6"
              >
                <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-wr-black dark:text-white mb-1.5">
                  {f.judul}
                </h3>
                <p className="text-[11px] text-wr-gray dark:text-zinc-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-wr-black dark:bg-zinc-900 dark:border-t dark:border-zinc-800 relative overflow-hidden">
        {/* Decorative lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <AnimatedSection className="page-container text-center relative">
          <motion.p variants={fadeIn} className="text-[10px] font-mono text-gray-600 tracking-[0.3em] uppercase mb-6">
            Evaluasi dimulai sekarang
          </motion.p>

          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Buktikan
            <br />
            <span className="text-gray-600">Kemampuanmu.</span>
          </motion.h2>

          <motion.p variants={fadeUp} custom={2} className="text-gray-600 text-xs md:text-sm mb-10 max-w-xs mx-auto leading-relaxed">
            Tidak ada jalan pintas. Tidak ada pengecualian.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link
              to="/evaluasi"
              className="group inline-flex items-center justify-center gap-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase px-8 py-4 border border-white text-white hover:bg-white hover:text-wr-black transition-all duration-300"
            >
              Mulai Sekarang
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/filosofi"
              className="inline-flex items-center justify-center gap-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase px-8 py-4 border border-gray-800 text-gray-600 hover:border-gray-600 hover:text-gray-400 transition-all duration-300"
            >
              Filosofi
            </Link>
          </motion.div>

          <motion.p variants={fadeIn} custom={4} className="text-[9px] font-mono text-gray-800 max-w-xs mx-auto leading-relaxed tracking-wide">
            Data tersimpan lokal di perangkatmu. Tidak ada akun. Tidak ada server. Progressmu adalah milikmu.
          </motion.p>
        </AnimatedSection>
      </section>
    </div>
  )
}