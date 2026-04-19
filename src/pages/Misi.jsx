import { useState } from 'react'
import { CheckCircle, Circle, Lock } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import ProgressBar from '../components/ui/ProgressBar'

const misiHarian = [
  {
    id: 1,
    nama: 'Sesi Logika Harian',
    deskripsi: 'Selesaikan 1 sesi tes logika dari modul pelatihan.',
    progres: 100,
    poin: 50,
    status: 'Selesai',
  },
  {
    id: 2,
    nama: 'Baca Arsip',
    deskripsi: 'Baca 1 artikel di perpustakaan Arsip Whiteroom.',
    progres: 100,
    poin: 30,
    status: 'Selesai',
  },
  {
    id: 3,
    nama: 'Latihan Memori',
    deskripsi: 'Selesaikan 1 sesi latihan memori dari modul pelatihan.',
    progres: 60,
    poin: 40,
    status: 'Berlangsung',
  },
  {
    id: 4,
    nama: 'Pertahankan Streak',
    deskripsi: 'Login dan lakukan minimal 1 sesi latihan hari ini.',
    progres: 100,
    poin: 20,
    status: 'Selesai',
  },
  {
    id: 5,
    nama: 'Evaluasi Observasi',
    deskripsi: 'Selesaikan tes observasi dari menu evaluasi.',
    progres: 0,
    poin: 50,
    status: 'Belum',
  },
]

const tantanganMingguan = [
  {
    id: 1,
    nama: 'Rangkaian Logika 5 Hari',
    deskripsi: 'Selesaikan sesi logika selama 5 hari berturut-turut.',
    progres: 60,
    poin: 250,
    status: 'Berlangsung',
  },
  {
    id: 2,
    nama: 'Kuasai 3 Kategori Evaluasi',
    deskripsi: 'Selesaikan evaluasi di minimal 3 kategori berbeda dalam seminggu.',
    progres: 33,
    poin: 300,
    status: 'Berlangsung',
  },
  {
    id: 3,
    nama: 'Skor Perfek Memori',
    deskripsi: 'Raih skor 100% pada tes memori dalam satu minggu.',
    progres: 0,
    poin: 400,
    status: 'Terkunci',
  },
]

const evaluasiBulanan = [
  {
    id: 1,
    nama: 'Evaluasi Komprehensif Bulanan',
    deskripsi: 'Selesaikan semua 5 kategori evaluasi dalam satu bulan.',
    progres: 40,
    poin: 1000,
    status: 'Berlangsung',
  },
  {
    id: 2,
    nama: 'Naik Level',
    deskripsi: 'Tingkatkan level profil kemampuanmu dalam bulan ini.',
    progres: 0,
    poin: 800,
    status: 'Terkunci',
  },
]

const tabs = [
  { label: 'Misi Harian', data: misiHarian },
  { label: 'Tantangan Mingguan', data: tantanganMingguan },
  { label: 'Evaluasi Bulanan', data: evaluasiBulanan },
]

function StatusIcon({ status }) {
  if (status === 'Selesai')
    return <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
  if (status === 'Terkunci')
    return <Lock size={18} className="text-gray-300 flex-shrink-0" />
  return <Circle size={18} className="text-wr-gray flex-shrink-0" />
}

function StatusBadge({ status }) {
  const styles = {
    Selesai: 'bg-green-50 text-green-800 border-green-200',
    Berlangsung: 'bg-blue-50 text-blue-800 border-blue-200',
    Terkunci: 'bg-gray-50 text-gray-400 border-gray-200',
    Belum: 'bg-wr-muted text-wr-gray border-wr-border',
  }
  return (
    <span
      className={`text-xs font-mono font-bold tracking-widest uppercase px-2 py-1 border ${
        styles[status] || styles.Belum
      }`}
    >
      {status}
    </span>
  )
}

function MisiCard({ misi }) {
  return (
    <div
      className={`border p-5 transition-all duration-200 ${
        misi.status === 'Terkunci'
          ? 'border-wr-border bg-wr-muted opacity-60'
          : 'border-wr-border bg-white hover:border-wr-black'
      }`}
    >
      <div className="flex items-start gap-4">
        <StatusIcon status={misi.status} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="text-sm font-bold text-wr-black">{misi.nama}</h3>
            <StatusBadge status={misi.status} />
          </div>
          <p className="text-xs text-wr-gray leading-relaxed mb-3">
            {misi.deskripsi}
          </p>
          <div className="mb-2">
            <ProgressBar
              value={misi.progres}
              showPercent={false}
              height="thin"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-wr-gray font-mono">
              {misi.progres}% selesai
            </span>
            <span className="text-xs font-mono font-bold text-wr-black">
              +{misi.poin} poin
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Misi() {
  const [tabAktif, setTabAktif] = useState(0)

  return (
    <div>
      {/* HERO */}
      <section className="min-h-hero flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 border-b border-wr-border">
        <div className="max-w-7xl mx-auto w-full">
          <p className="section-label mb-4">Misi</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-wr-black mb-4 max-w-2xl">
            Disiplin yang Terukur
          </h1>
          <p className="text-lg text-wr-gray max-w-xl">
            Selesaikan misi untuk membuktikan konsistensimu.
          </p>
        </div>
      </section>

      {/* TAB + MISI */}
      <section className="py-20">
        <div className="page-container">
          {/* Tabs */}
          <div className="flex gap-0 border-b border-wr-border mb-10 overflow-x-auto">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setTabAktif(i)}
                className={`px-6 py-3 text-xs font-semibold tracking-widest uppercase whitespace-nowrap transition-all duration-200 border-b-2 ${
                  tabAktif === i
                    ? 'border-wr-black text-wr-black'
                    : 'border-transparent text-wr-gray hover:text-wr-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Daftar Misi */}
          <div className="max-w-3xl">
            <SectionTitle
              label={tabs[tabAktif].label}
              title={`${tabs[tabAktif].label}`}
              subtitle={`${tabs[tabAktif].data.length} misi tersedia`}
            />
            <div className="flex flex-col gap-4">
              {tabs[tabAktif].data.map((misi) => (
                <MisiCard key={misi.id} misi={misi} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}