import { Link } from 'react-router-dom'
import { Brain, Database, Eye, Target, Shield } from 'lucide-react'
import Badge from '../components/ui/Badge'
import SectionTitle from '../components/ui/SectionTitle'

const kategoriTes = [
  {
    id: 'logika',
    nama: 'Tes Logika',
    icon: Brain,
    desc: 'Mengukur kemampuan berpikir deduktif, induktif, dan analitis dalam berbagai situasi.',
    soal: 20,
    waktu: '15 menit',
    level: 'Menengah',
  },
  {
    id: 'memori',
    nama: 'Tes Memori',
    icon: Database,
    desc: 'Mengukur kapasitas memori jangka pendek dan daya ingat visual secara terstruktur.',
    soal: 15,
    waktu: '10 menit',
    level: 'Dasar',
  },
  {
    id: 'observasi',
    nama: 'Tes Observasi',
    icon: Eye,
    desc: 'Mengukur ketajaman dalam menangkap detail dan pola tersembunyi yang tidak terlihat rata-rata.',
    soal: 15,
    waktu: '12 menit',
    level: 'Menengah',
  },
  {
    id: 'strategi',
    nama: 'Tes Strategi',
    icon: Target,
    desc: 'Mengukur kemampuan perencanaan dan pengambilan keputusan taktis dalam situasi kompleks.',
    soal: 10,
    waktu: '20 menit',
    level: 'Lanjutan',
  },
  {
    id: 'emosi',
    nama: 'Tes Kontrol Emosi',
    icon: Shield,
    desc: 'Mengukur stabilitas respons dan pengendalian diri dalam situasi tekanan tinggi.',
    soal: 10,
    waktu: '10 menit',
    level: 'Menengah',
  },
]

export default function Evaluasi() {
  return (
    <div>
      {/* HERO */}
      <section className="min-h-hero flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 border-b border-wr-border">
        <div className="max-w-7xl mx-auto w-full">
          <p className="section-label mb-4">Evaluasi</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-wr-black mb-4 max-w-2xl">
            Ukur Kemampuan Sebenarnya
          </h1>
          <p className="text-lg text-wr-gray max-w-xl mb-4">
            Pilih kategori evaluasi untuk memulai pengukuran kemampuanmu.
          </p>
          <p className="text-xs font-mono text-wr-gray border border-wr-border inline-block px-3 py-2 bg-wr-surface">
            ⚠ Setiap evaluasi akan mempengaruhi profil kemampuanmu.
          </p>
        </div>
      </section>

      {/* GRID KATEGORI */}
      <section className="py-20">
        <div className="page-container">
          <SectionTitle
            label="Pilih Kategori"
            title="Modul Evaluasi Tersedia"
            subtitle="Setiap modul mengukur dimensi kemampuan yang berbeda dan saling melengkapi."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kategoriTes.map((tes) => {
              const Icon = tes.icon
              return (
                <div
                  key={tes.id}
                  className="card-wr flex flex-col gap-5"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 border border-wr-border flex items-center justify-center">
                      <Icon size={20} className="text-wr-black" />
                    </div>
                    <Badge type="level" value={tes.level} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-wr-black mb-2">
                      {tes.nama}
                    </h3>
                    <p className="text-sm text-wr-gray leading-relaxed">
                      {tes.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-wr-gray border-t border-wr-border pt-4">
                    <span>{tes.soal} soal</span>
                    <span className="text-wr-border">·</span>
                    <span>{tes.waktu}</span>
                  </div>
                  <Link
                    to={`/evaluasi/${tes.id}`}
                    className="btn-primary text-xs py-3 text-center"
                  >
                    Mulai Evaluasi
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}