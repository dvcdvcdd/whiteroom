import {
  User,
  Flame,
  Award,
  TrendingUp,
  Calendar,
  Target,
} from 'lucide-react'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import SectionTitle from '../components/ui/SectionTitle'

const kemampuan = [
  { label: 'Logika', nilai: 78 },
  { label: 'Strategi', nilai: 65 },
  { label: 'Observasi', nilai: 82 },
  { label: 'Adaptasi', nilai: 71 },
  { label: 'Pengendalian Diri', nilai: 60 },
]

const riwayat = [
  {
    tanggal: '12 Jan 2025',
    kategori: 'Tes Logika',
    skor: '16/20',
    level: 'Analis',
  },
  {
    tanggal: '10 Jan 2025',
    kategori: 'Tes Observasi',
    skor: '13/15',
    level: 'Analis',
  },
  {
    tanggal: '07 Jan 2025',
    kategori: 'Tes Memori',
    skor: '11/15',
    level: 'Subjek',
  },
  {
    tanggal: '04 Jan 2025',
    kategori: 'Tes Kontrol Emosi',
    skor: '7/10',
    level: 'Analis',
  },
  {
    tanggal: '01 Jan 2025',
    kategori: 'Tes Strategi',
    skor: '6/10',
    level: 'Subjek',
  },
]

const statistikProfil = [
  { icon: Award, label: 'Skor Total', nilai: '1.284 poin' },
  { icon: TrendingUp, label: 'Peringkat Global', nilai: '#127' },
  { icon: Target, label: 'Evaluasi Selesai', nilai: '8' },
  { icon: Flame, label: 'Streak', nilai: '12 hari' },
  { icon: Calendar, label: 'Bergabung', nilai: 'Januari 2025' },
]

export default function Profil() {
  return (
    <div>
      {/* HERO — Background Hitam */}
      <section className="min-h-[25vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 bg-wr-black text-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 border border-gray-700 flex items-center justify-center">
                  <User size={20} className="text-gray-300" />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-500 tracking-widest uppercase">
                    ID Subjek
                  </p>
                  <p className="text-lg font-black font-mono text-white">
                    WR-00472
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <Badge type="level" value="Analis" />
                <span className="flex items-center gap-1 text-xs font-mono text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Aktif
                </span>
                <span className="flex items-center gap-1 text-xs font-mono text-orange-400">
                  <Flame size={12} />
                  12 hari streak
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-1">
                Bergabung
              </p>
              <p className="text-sm font-mono text-gray-300">Januari 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="py-20">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* KIRI: Profil Kemampuan */}
            <div>
              <SectionTitle
                label="Profil Kemampuan"
                title="Analisis Kompetensi"
              />
              <div className="flex flex-col gap-5 mb-8">
                {kemampuan.map((k) => (
                  <ProgressBar
                    key={k.label}
                    label={k.label}
                    value={k.nilai}
                    showPercent={true}
                  />
                ))}
              </div>

              <div className="border border-wr-border p-5 bg-wr-surface">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-wr-gray uppercase tracking-widest">
                      Kekuatan Utama
                    </span>
                    <span className="text-sm font-bold text-green-700">
                      Observasi
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-wr-gray uppercase tracking-widest">
                      Kelemahan Utama
                    </span>
                    <span className="text-sm font-bold text-wr-red">
                      Pengendalian Diri
                    </span>
                  </div>
                  <div className="border-t border-wr-border pt-3 mt-1">
                    <span className="text-xs font-mono text-wr-gray uppercase tracking-widest">
                      Rekomendasi
                    </span>
                    <p className="text-sm font-semibold text-wr-black mt-1">
                      Modul Pengendalian Diri — Level Dasar
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* KANAN: Statistik */}
            <div>
              <SectionTitle
                label="Statistik"
                title="Ringkasan Aktivitas"
              />
              <div className="grid grid-cols-1 gap-4 mb-8">
                {statistikProfil.map((s) => {
                  const Icon = s.icon
                  return (
                    <div
                      key={s.label}
                      className="card-wr flex items-center gap-4"
                    >
                      <div className="w-10 h-10 border border-wr-border flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-wr-black" />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <span className="text-xs font-mono text-wr-gray uppercase tracking-widest">
                          {s.label}
                        </span>
                        <span className="text-sm font-black font-mono text-wr-black">
                          {s.nilai}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Misi aktif */}
              <div className="border border-wr-border p-5">
                <p className="text-xs font-mono tracking-widest text-wr-gray uppercase mb-3">
                  Misi Aktif
                </p>
                <ProgressBar
                  value={66}
                  label="2 dari 3 selesai"
                  showPercent={false}
                />
              </div>
            </div>
          </div>

          {/* RIWAYAT EVALUASI */}
          <div className="mt-16">
            <SectionTitle
              label="Riwayat"
              title="Evaluasi Sebelumnya"
            />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-wr-border">
                    <th className="text-left py-3 px-4 text-xs font-mono tracking-widest text-wr-gray uppercase">
                      Tanggal
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-mono tracking-widest text-wr-gray uppercase">
                      Kategori
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-mono tracking-widest text-wr-gray uppercase">
                      Skor
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-mono tracking-widest text-wr-gray uppercase hidden md:table-cell">
                      Level
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {riwayat.map((r, i) => (
                    <tr
                      key={i}
                      className="border-b border-wr-border hover:bg-wr-surface transition-colors"
                    >
                      <td className="py-4 px-4 text-xs font-mono text-wr-gray">
                        {r.tanggal}
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-wr-black">
                        {r.kategori}
                      </td>
                      <td className="py-4 px-4 text-sm font-mono font-bold text-wr-black">
                        {r.skor}
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell">
                        <Badge type="level" value={r.level} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}