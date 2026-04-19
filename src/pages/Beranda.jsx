import { Link } from 'react-router-dom'
import { Brain, Target, Eye, Zap, Shield } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'

const pilar = [
  {
    icon: Brain,
    judul: 'Logika',
    desc: 'Kemampuan berpikir sistematis, deduktif, dan analitis dalam setiap situasi.',
  },
  {
    icon: Target,
    judul: 'Strategi',
    desc: 'Perencanaan terstruktur dan taktik pengambilan keputusan yang efektif.',
  },
  {
    icon: Eye,
    judul: 'Observasi',
    desc: 'Ketajaman dalam membaca situasi, pola, dan detail yang tidak terlihat oleh rata-rata.',
  },
  {
    icon: Zap,
    judul: 'Adaptasi',
    desc: 'Kemampuan menyesuaikan diri dengan perubahan kondisi secara cepat dan efisien.',
  },
  {
    icon: Shield,
    judul: 'Pengendalian Diri',
    desc: 'Kontrol respons emosional dalam situasi tekanan tinggi dan konflik.',
  },
]

const statistik = [
  { angka: '1.247', label: 'Subjek Terdaftar' },
  { angka: '8.903', label: 'Evaluasi Diselesaikan' },
  { angka: '67.4', label: 'Rata-rata Skor' },
  { angka: 'Elite', label: 'Level Tertinggi' },
]

const prinsip = [
  'Kelemahan diidentifikasi.',
  'Performa diukur secara presisi.',
  'Kemampuan dibentuk secara sistematis.',
]

export default function Beranda() {
  return (
    <div>
      {/* SECTION 1: HERO */}
      <section className="min-h-hero-lg flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 bg-white relative overflow-hidden">
        {/* Grid dekoratif samar */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="section-label mb-4">
            Fasilitas Pelatihan Elit Digital
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-wr-black leading-none mb-4">
            WHITE
            <br />
            ROOM
          </h1>
          <p className="text-lg md:text-xl font-medium text-wr-gray mb-3 max-w-xl">
            Lingkungan Terkontrol untuk Optimalisasi Individu
          </p>
          <p className="text-sm text-wr-gray leading-relaxed max-w-lg mb-10">
            Whiteroom adalah sistem evaluasi dan pelatihan digital yang
            dirancang untuk mengidentifikasi, menganalisis, dan mengembangkan
            kemampuan individu secara sistematis dan terukur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/evaluasi" className="btn-primary">
              Mulai Evaluasi
            </Link>
            <Link to="/filosofi" className="btn-outline">
              Pelajari Filosofi
            </Link>
          </div>
          {/* Elemen dekoratif monospace */}
          <div className="mt-12 font-mono text-xs text-gray-200 select-none hidden md:block">
            <p>// SISTEM AKTIF — EVALUASI TERSEDIA</p>
            <p>// PROTOKOL: WR-EVAL-v1.0 — SUBJEK: ANONIM</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: 5 PILAR */}
      <section className="py-20 bg-wr-surface">
        <div className="page-container">
          <SectionTitle
            label="Pilar Utama"
            title="Fondasi Whiteroom"
            subtitle="Lima kemampuan inti yang menjadi dasar pengukuran dan pengembangan setiap subjek."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {pilar.map((p) => {
              const Icon = p.icon
              return (
                <div
                  key={p.judul}
                  className="card-wr flex flex-col gap-4"
                >
                  <div className="w-10 h-10 border border-wr-border flex items-center justify-center">
                    <Icon size={18} className="text-wr-black" />
                  </div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-wr-black">
                    {p.judul}
                  </h3>
                  <p className="text-sm text-wr-gray leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: PRINSIP */}
      <section className="py-24 bg-white">
        <div className="page-container">
          <p className="section-label mb-8">Prinsip Dasar</p>
          <div className="flex flex-col divide-y divide-wr-border">
            {prinsip.map((kalimat, i) => (
              <div
                key={i}
                className="py-8 flex items-start gap-6"
              >
                <span className="font-mono text-xs text-gray-300 mt-1 min-w-[2rem]">
                  0{i + 1}
                </span>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-wr-black leading-tight italic">
                  &ldquo;{kalimat}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: STATISTIK */}
      <section className="py-20 bg-wr-muted">
        <div className="page-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-wr-border">
            {statistik.map((s) => (
              <div
                key={s.label}
                className="bg-white flex flex-col justify-center items-center py-12 px-6 text-center"
              >
                <span className="text-4xl md:text-5xl font-black font-mono text-wr-black leading-none mb-2">
                  {s.angka}
                </span>
                <span className="text-xs font-mono text-wr-gray tracking-widest uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA AKHIR */}
      <section className="bg-wr-black py-24">
        <div className="page-container text-center">
          <p className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-4">
            Langkah Pertama
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Siap Untuk Dievaluasi?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
            Masuki Whiteroom dan ketahui kemampuan sebenarnya.
          </p>
          <Link
            to="/evaluasi"
            className="inline-block text-sm font-semibold tracking-widest uppercase px-8 py-4 border border-white text-white hover:bg-white hover:text-wr-black transition-all duration-200"
          >
            Mulai Sekarang
          </Link>
        </div>
      </section>
    </div>
  )
}