import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Trophy, Target, TrendingUp, TrendingDown, Trash2 } from 'lucide-react'
import ProgressBar from '../components/ui/ProgressBar'

function ambilRiwayat() {
  try {
    return JSON.parse(localStorage.getItem('wr_riwayat') || '[]')
  } catch {
    return []
  }
}

function hitungStatistik(riwayat) {
  if (riwayat.length === 0) return null

  const totalTes = riwayat.length
  const rataRata = Math.round(riwayat.reduce((sum, r) => sum + r.persen, 0) / totalTes)
  const skorTertinggi = Math.max(...riwayat.map((r) => r.persen))
  const skorTerendah = Math.min(...riwayat.map((r) => r.persen))

  // Per kategori
  const kategoriMap = {}
  riwayat.forEach((r) => {
    if (!kategoriMap[r.kategori]) {
      kategoriMap[r.kategori] = { nama: r.nama, skor: [], kategori: r.kategori }
    }
    kategoriMap[r.kategori].skor.push(r.persen)
  })

  const perKategori = Object.values(kategoriMap).map((k) => ({
    ...k,
    rataRata: Math.round(k.skor.reduce((a, b) => a + b, 0) / k.skor.length),
    tertinggi: Math.max(...k.skor),
    totalTes: k.skor.length,
  }))

  // Sorting untuk cari terkuat & terlemah
  const sorted = [...perKategori].sort((a, b) => b.rataRata - a.rataRata)
  const terkuat = sorted[0] || null
  const terlemah = sorted[sorted.length - 1] || null

  return {
    totalTes,
    rataRata,
    skorTertinggi,
    skorTerendah,
    perKategori: sorted,
    terkuat,
    terlemah,
  }
}

function skorWarna(persen) {
  if (persen >= 86) return 'text-green-700'
  if (persen >= 71) return 'text-blue-700'
  if (persen >= 51) return 'text-yellow-700'
  return 'text-red-700'
}

function barWarna(persen) {
  if (persen >= 86) return 'bg-green-600'
  if (persen >= 71) return 'bg-blue-600'
  if (persen >= 51) return 'bg-yellow-600'
  return 'bg-red-600'
}

export default function Statistik() {
  const [riwayat, setRiwayat] = useState([])
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const data = ambilRiwayat()
    setRiwayat(data)
    setStats(hitungStatistik(data))
  }, [])

  const handleHapus = () => {
    try { localStorage.removeItem('wr_riwayat') } catch { /* abaikan */ }
    setRiwayat([])
    setStats(null)
  }

  // Belum ada data
  if (!stats) {
    return (
      <div>
        <section className="min-h-[25vh] md:min-h-[30vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-20 border-b border-wr-border">
          <div className="max-w-7xl mx-auto w-full">
            <p className="section-label mb-3 md:mb-4">Statistik</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-wr-black mb-3 md:mb-4">
              Progres Belajar
            </h1>
          </div>
        </section>
        <section className="py-20">
          <div className="page-container text-center">
            <BarChart3 size={48} className="text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-wr-black mb-2">Belum Ada Data</h2>
            <p className="text-sm text-wr-gray mb-6 max-w-sm mx-auto">
              Kerjakan tes dalam Mode Evaluasi untuk mulai mengumpulkan statistik.
            </p>
            <Link to="/evaluasi" className="btn-primary text-xs">
              Mulai Tes Pertama
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      {/* HERO */}
      <section className="min-h-[25vh] md:min-h-[30vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-20 bg-wr-black text-white">
        <div className="max-w-7xl mx-auto w-full">
          <p className="section-label text-gray-500 mb-3 md:mb-4">Statistik</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-3 md:mb-4">
            Progres Belajar
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl">
            Ringkasan performa dari semua tes yang pernah dikerjakan dalam Mode Evaluasi.
          </p>
        </div>
      </section>

      {/* RINGKASAN */}
      <section className="py-16 md:py-20">
        <div className="page-container">
          {/* 4 angka besar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
            <div className="border border-wr-border p-4 md:p-6 text-center bg-white">
              <p className="text-3xl md:text-4xl font-black font-mono text-wr-black">{stats.totalTes}</p>
              <p className="text-[10px] md:text-xs font-mono text-wr-gray uppercase tracking-widest mt-1">Total Tes</p>
            </div>
            <div className="border border-wr-border p-4 md:p-6 text-center bg-white">
              <p className={`text-3xl md:text-4xl font-black font-mono ${skorWarna(stats.rataRata)}`}>{stats.rataRata}%</p>
              <p className="text-[10px] md:text-xs font-mono text-wr-gray uppercase tracking-widest mt-1">Rata-rata</p>
            </div>
            <div className="border border-wr-border p-4 md:p-6 text-center bg-white">
              <p className="text-3xl md:text-4xl font-black font-mono text-green-600">{stats.skorTertinggi}%</p>
              <p className="text-[10px] md:text-xs font-mono text-wr-gray uppercase tracking-widest mt-1">Tertinggi</p>
            </div>
            <div className="border border-wr-border p-4 md:p-6 text-center bg-white">
              <p className="text-3xl md:text-4xl font-black font-mono text-red-600">{stats.skorTerendah}%</p>
              <p className="text-[10px] md:text-xs font-mono text-wr-gray uppercase tracking-widest mt-1">Terendah</p>
            </div>
          </div>

          {/* Terkuat & Terlemah */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 md:mb-16">
            {stats.terkuat && (
              <div className="border border-green-200 bg-green-50 p-5 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} className="text-green-600" />
                  <span className="text-xs font-mono font-bold tracking-widest text-green-700 uppercase">
                    Kategori Terkuat
                  </span>
                </div>
                <p className="text-lg md:text-xl font-bold text-wr-black mb-1">{stats.terkuat.nama}</p>
                <p className="text-sm text-green-700 font-mono font-bold">
                  Rata-rata: {stats.terkuat.rataRata}% · Tertinggi: {stats.terkuat.tertinggi}%
                </p>
              </div>
            )}
            {stats.terlemah && stats.perKategori.length > 1 && (
              <div className="border border-red-200 bg-red-50 p-5 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown size={16} className="text-red-600" />
                  <span className="text-xs font-mono font-bold tracking-widest text-red-700 uppercase">
                    Perlu Ditingkatkan
                  </span>
                </div>
                <p className="text-lg md:text-xl font-bold text-wr-black mb-1">{stats.terlemah.nama}</p>
                <p className="text-sm text-red-700 font-mono font-bold">
                  Rata-rata: {stats.terlemah.rataRata}% · Tertinggi: {stats.terlemah.tertinggi}%
                </p>
                <Link
                  to={`/evaluasi/${stats.terlemah.kategori}?mode=latihan`}
                  className="inline-block mt-3 text-xs font-mono text-red-700 hover:text-wr-black transition-colors tracking-widest uppercase"
                >
                  Latihan sekarang →
                </Link>
              </div>
            )}
          </div>

          {/* Per Kategori */}
          <div className="mb-12 md:mb-16">
            <p className="section-label mb-6">Skor Per Kategori</p>
            <div className="flex flex-col gap-4">
              {stats.perKategori.map((k) => (
                <div key={k.kategori} className="border border-wr-border p-4 md:p-5 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-wr-black">{k.nama}</h3>
                      <p className="text-[10px] md:text-xs font-mono text-wr-gray">
                        {k.totalTes} tes dikerjakan · Tertinggi: {k.tertinggi}%
                      </p>
                    </div>
                    <span className={`text-xl md:text-2xl font-black font-mono ${skorWarna(k.rataRata)}`}>
                      {k.rataRata}%
                    </span>
                  </div>
                  {/* Bar visual */}
                  <div className="w-full bg-wr-muted h-3 md:h-4 relative">
                    <div
                      className={`h-full ${barWarna(k.rataRata)} transition-all duration-500`}
                      style={{ width: `${k.rataRata}%` }}
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link
                      to={`/evaluasi/${k.kategori}?mode=evaluasi`}
                      className="text-[10px] md:text-xs font-mono text-wr-gray hover:text-wr-black transition-colors tracking-widest uppercase"
                    >
                      Evaluasi →
                    </Link>
                    <Link
                      to={`/evaluasi/${k.kategori}?mode=latihan`}
                      className="text-[10px] md:text-xs font-mono text-blue-600 hover:text-wr-black transition-colors tracking-widest uppercase"
                    >
                      Latihan →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Riwayat Terakhir */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <p className="section-label">Riwayat</p>
                <h2 className="text-xl md:text-2xl font-black text-wr-black">Tes Terakhir</h2>
              </div>
              <button
                onClick={handleHapus}
                className="text-xs font-mono text-wr-gray hover:text-wr-red transition-colors tracking-widest uppercase flex items-center gap-1 self-start sm:self-auto"
              >
                <Trash2 size={12} />
                Hapus Semua Data
              </button>
            </div>

            {/* Mobile: card */}
            <div className="flex flex-col gap-3 sm:hidden">
              {riwayat.slice(0, 10).map((r, i) => (
                <div key={i} className="border border-wr-border p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-wr-black">{r.nama}</span>
                    <span className={`text-sm font-black font-mono ${skorWarna(r.persen)}`}>
                      {r.persen}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs font-mono text-wr-gray">
                      <span>{r.tanggal}</span>
                      <span>{r.skor}/{r.total}</span>
                    </div>
                    <Link
                      to={`/evaluasi/${r.kategori}?mode=evaluasi`}
                      className="text-xs font-mono text-wr-gray hover:text-wr-black transition-colors tracking-widest uppercase"
                    >
                      Ulangi
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-wr-border">
                    <th className="text-left py-3 px-4 text-xs font-mono tracking-widest text-wr-gray uppercase">Tanggal</th>
                    <th className="text-left py-3 px-4 text-xs font-mono tracking-widest text-wr-gray uppercase">Tes</th>
                    <th className="text-left py-3 px-4 text-xs font-mono tracking-widest text-wr-gray uppercase">Skor</th>
                    <th className="text-left py-3 px-4 text-xs font-mono tracking-widest text-wr-gray uppercase">Persen</th>
                    <th className="py-3 px-4" />
                  </tr>
                </thead>
                <tbody>
                  {riwayat.slice(0, 10).map((r, i) => (
                    <tr key={i} className="border-b border-wr-border hover:bg-wr-surface transition-colors">
                      <td className="py-3 px-4 text-xs font-mono text-wr-gray">{r.tanggal}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-wr-black">{r.nama}</td>
                      <td className="py-3 px-4 text-sm font-mono font-bold text-wr-black">{r.skor}/{r.total}</td>
                      <td className="py-3 px-4">
                        <span className={`text-sm font-black font-mono ${skorWarna(r.persen)}`}>{r.persen}%</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          to={`/evaluasi/${r.kategori}?mode=evaluasi`}
                          className="text-xs font-mono text-wr-gray hover:text-wr-black transition-colors tracking-widest uppercase"
                        >
                          Ulangi
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="border-t border-wr-border pt-8 text-center">
            <p className="text-sm text-wr-gray mb-4">Terus latihan untuk meningkatkan skor.</p>
            <Link to="/evaluasi" className="btn-primary text-xs">
              Kerjakan Tes Lagi
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}