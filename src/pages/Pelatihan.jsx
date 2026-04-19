import { Brain, Target, Eye, Zap, Shield } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'

const modulLatihan = [
  {
    id: 1,
    icon: Brain,
    nama: 'Pelatihan Logika',
    deskripsi:
      'Serangkaian latihan terstruktur untuk mengasah kemampuan berpikir deduktif dan induktif secara progresif.',
    progres: 65,
    sesi: 12,
    levelTersedia: ['Dasar', 'Menengah', 'Lanjutan', 'Elite'],
    levelAktif: 'Menengah',
    status: 'Lanjutkan',
  },
  {
    id: 2,
    icon: Target,
    nama: 'Pelatihan Strategi',
    deskripsi:
      'Skenario perencanaan dan pengambilan keputusan yang dirancang untuk mensimulasikan situasi nyata dengan variabel kompleks.',
    progres: 40,
    sesi: 10,
    levelTersedia: ['Dasar', 'Menengah', 'Lanjutan', 'Elite'],
    levelAktif: 'Dasar',
    status: 'Lanjutkan',
  },
  {
    id: 3,
    icon: Eye,
    nama: 'Pelatihan Observasi',
    deskripsi:
      'Latihan ketajaman visual dan perceptual untuk mendeteksi pola, anomali, dan detail tersembunyi dalam berbagai konteks.',
    progres: 80,
    sesi: 8,
    levelTersedia: ['Dasar', 'Menengah', 'Lanjutan'],
    levelAktif: 'Lanjutan',
    status: 'Lanjutkan',
  },
  {
    id: 4,
    icon: Zap,
    nama: 'Pelatihan Adaptasi',
    deskripsi:
      'Modul yang melatih fleksibilitas kognitif dan kecepatan penyesuaian diri dalam kondisi yang terus berubah.',
    progres: 0,
    sesi: 14,
    levelTersedia: ['Dasar', 'Menengah', 'Lanjutan', 'Elite'],
    levelAktif: 'Dasar',
    status: 'Mulai',
  },
  {
    id: 5,
    icon: Shield,
    nama: 'Pelatihan Pengendalian Diri',
    deskripsi:
      'Program pelatihan respons emosional untuk meningkatkan stabilitas mental di bawah tekanan dan konflik tinggi.',
    progres: 20,
    sesi: 16,
    levelTersedia: ['Dasar', 'Menengah', 'Lanjutan'],
    levelAktif: 'Dasar',
    status: 'Lanjutkan',
  },
]

export default function Pelatihan() {
  return (
    <div>
      {/* HERO */}
      <section className="min-h-hero flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 border-b border-wr-border">
        <div className="max-w-7xl mx-auto w-full">
          <p className="section-label mb-4">Pelatihan</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-wr-black mb-4 max-w-2xl">
            Latihan Berkelanjutan
          </h1>
          <p className="text-lg text-wr-gray max-w-xl">
            Kelemahan diidentifikasi. Kekuatan diasah.
          </p>
        </div>
      </section>

      {/* MODUL */}
      <section className="py-20">
        <div className="page-container">
          <SectionTitle
            label="Modul Tersedia"
            title="Program Pelatihan Aktif"
            subtitle="Setiap modul dirancang untuk mengembangkan satu dimensi kemampuan inti secara bertahap dan terukur."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modulLatihan.map((modul) => {
              const Icon = modul.icon
              return (
                <div key={modul.id} className="card-wr flex flex-col gap-5">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 border border-wr-border flex items-center justify-center">
                      <Icon size={20} className="text-wr-black" />
                    </div>
                    <span className="text-xs font-mono text-wr-gray">
                      {modul.sesi} sesi
                    </span>
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-base font-bold text-wr-black mb-2">
                      {modul.nama}
                    </h3>
                    <p className="text-sm text-wr-gray leading-relaxed">
                      {modul.deskripsi}
                    </p>
                  </div>

                  {/* Level badge */}
                  <div className="flex flex-wrap gap-2">
                    {modul.levelTersedia.map((lvl) => (
                      <Badge
                        key={lvl}
                        type="level"
                        value={lvl}
                      />
                    ))}
                  </div>

                  {/* Progress */}
                  <div>
                    <ProgressBar
                      value={modul.progres}
                      label="Progres"
                      showPercent={true}
                    />
                  </div>

                  {/* CTA */}
                  <button className="btn-primary text-xs py-3 w-full">
                    {modul.status}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}