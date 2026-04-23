import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, TrendingUp, TrendingDown, Trash2 } from 'lucide-react'
import ProgressBar from '../components/ui/ProgressBar'

function ambilRiwayat() {
  try { return JSON.parse(localStorage.getItem('wr_riwayat') || '[]') } catch { return [] }
}

function hitungStatistik(riwayat) {
  if (riwayat.length === 0) return null
  const totalTes = riwayat.length
  const rataRata = Math.round(riwayat.reduce((sum, r) => sum + r.persen, 0) / totalTes)
  const skorTertinggi = Math.max(...riwayat.map((r) => r.persen))
  const skorTerendah = Math.min(...riwayat.map((r) => r.persen))
  const kategoriMap = {}
  riwayat.forEach((r) => {
    if (!kategoriMap[r.kategori]) kategoriMap[r.kategori] = { nama: r.nama, skor: [], kategori: r.kategori }
    kategoriMap[r.kategori].skor.push(r.persen)
  })
  const perKategori = Object.values(kategoriMap).map((k) => ({
    ...k,
    rataRata: Math.round(k.skor.reduce((a, b) => a + b, 0) / k.skor.length),
    tertinggi: Math.max(...k.skor),
    totalTes: k.skor.length,
  }))
  const sorted = [...perKategori].sort((a, b) => b.rataRata - a.rataRata)
  return { totalTes, rataRata, skorTertinggi, skorTerendah, perKategori: sorted, terkuat: sorted[0] || null, terlemah: sorted[sorted.length - 1] || null }
}

function skorWarna(persen) {
  if (persen >= 86) return 'text-green-600 dark:text-green-400'
  if (persen >= 71) return 'text-blue-600 dark:text-blue-400'
  if (persen >= 51) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

function barWarna(persen) {
  if (persen >= 86) return 'bg-green-600 dark:bg-green-500'
  if (persen >= 71) return 'bg-blue-600 dark:bg-blue-500'
  if (persen >= 51) return 'bg-yellow-500 dark:bg-yellow-400'
  return 'bg-red-600 dark:bg-red-500'
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

  if (!stats) {
    return (
      <div>
        <section className="min-h-[25vh] md:min-h-[30vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-20 border-b border-wr-border dark:border-zinc-800">
          <div className="max-w-7xl mx-auto w-full">
            <p className="section-label mb-3 md:mb-4">Statistik</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-wr-black dark:text-white mb-3 md:mb-4">
              Progres Belajar
            </h1>
          </div>
        </section>
        <section className="py-20">
          <div className="page-container text-center">
            <BarChart3 size={48} className="text-gray-200 dark:text-zinc-700 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-wr-black dark:text-white mb-2">Belum Ada Data</h2>
            <p className="text-sm text-wr-gray dark:text-zinc-400 mb-6 max-w-sm mx-auto">
              Kerjakan tes dalam Mode Evaluasi untuk mulai mengumpulkan statistik.
            </p>
            <Link to="/evaluasi" className="btn-primary text-xs">Mulai Tes Pertama</Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      {/* HERO */}
      <section className="min-h-[25vh] md:min-h-[30vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-20 bg-wr-black dark:bg-zinc-900 dark:border-b dark:border-zinc-800 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <p className="section-label text-gray-500 mb-3 md:mb-4">Statistik</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-3 md:mb-4">
            Progres Belajar
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl">
            Ringkasan performa dari semua tes dalam Mode Evaluasi.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="page-container">
          {/* 4 angka */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
            {[
              { label: 'Total Tes', nilai: stats.totalTes, warna: 'text-wr-black dark:text-white' },
              { label: 'Rata-rata', nilai: `${stats.rataRata}%`, warna: skorWarna(stats.rataRata) },
              { label: 'Tertinggi', nilai: `${stats.skorTertinggi}%`, warna: 'text-green-600 dark:text-green-400' },
              { label: 'Terendah', nilai: `${stats.skorTerendah}%`, warna: 'text-red-600 dark:text-red-400' },
            ].map((s) => (
              <div key={s.label} className="border border-wr-border dark:border-zinc-800 p-4 md:p-6 text-center bg-white dark:bg-zinc-900">
                <p className={`text-3xl md:text-4xl font-black font-mono ${s.warna}`}>{s.nilai}</p>
                <p className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-500 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Terkuat & Terlemah */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 md:mb-16">
            {stats.terkuat && (
              <div className="border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 p-5 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
                  <span className="text-xs font-mono font-bold tracking-widest text-green-700 dark:text-green-400 uppercase">Kategori Terkuat</span>
                </div>
                <p className="text-lg md:text-xl font-bold text-wr-black dark:text-white mb-1">{stats.terkuat.nama}</p>
                <p className="text-sm text-green-700 dark:text-green-400 font-mono font-bold">
                  Rata-rata: {stats.terkuat.rataRata}% · Tertinggi: {stats.terkuat.tertinggi}%
                </p>
              </div>
            )}
            {stats.terlemah && stats.perKategori.length > 1 && (
              <div className="border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 p-5 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown size={16} className="text-red-600 dark:text-red-400" />
                  <span className="text-xs font-mono font-bold tracking-widest text-red-700 dark:text-red-400 uppercase">Perlu Ditingkatkan</span>
                </div>
                <p className="text-lg md:text-xl font-bold text-wr-black dark:text-white mb-1">{stats.terlemah.nama}</p>
                <p className="text-sm text-red-700 dark:text-red-400 font-mono font-bold">
                  Rata-rata: {stats.terlemah.rataRata}% · Tertinggi: {stats.terlemah.tertinggi}%
                </p>
                <Link to={`/evaluasi/${stats.terlemah.kategori}?mode=latihan`} className="inline-block mt-3 text-xs font-mono text-red-700 dark:text-red-400 hover:text-wr-black dark:hover:text-white transition-colors tracking-widest uppercase">
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
                <div key={k.kategori} className="border border-wr-border dark:border-zinc-800 p-4 md:p-5 bg-white dark:bg-zinc-900">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-wr-black dark:text-white">{k.nama}</h3>
                      <p className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-500">{k.totalTes} tes · Tertinggi: {k.tertinggi}%</p>
                    </div>
                    <span className={`text-xl md:text-2xl font-black font-mono ${skorWarna(k.rataRata)}`}>{k.rataRata}%</span>
                  </div>
                  <div className="w-full bg-wr-muted dark:bg-zinc-800 h-3 md:h-4">
                    <div className={`h-full ${barWarna(k.rataRata)} transition-all duration-500`} style={{ width: `${k.rataRata}%` }} />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link to={`/evaluasi/${k.kategori}?mode=evaluasi`} className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-500 hover:text-wr-black dark:hover:text-white transition-colors tracking-widest uppercase">Evaluasi →</Link>
                    <Link to={`/evaluasi/${k.kategori}?mode=latihan`} className="text-[10px] md:text-xs font-mono text-blue-600 dark:text-blue-400 hover:text-wr-black dark:hover:text-white transition-colors tracking-widest uppercase">Latihan →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Riwayat */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <p className="section-label">Riwayat</p>
                <h2 className="text-xl md:text-2xl font-black text-wr-black dark:text-white">Tes Terakhir</h2>
              </div>
              <button onClick={handleHapus} className="text-xs font-mono text-wr-gray dark:text-zinc-500 hover:text-wr-red transition-colors tracking-widest uppercase flex items-center gap-1 self-start sm:self-auto">
                <Trash2 size={12} /> Hapus Semua Data
              </button>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-3 sm:hidden">
              {riwayat.slice(0, 10).map((r, i) => (
                <div key={i} className="border border-wr-border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-wr-black dark:text-white">{r.nama}</span>
                    <span className={`text-sm font-black font-mono ${skorWarna(r.persen)}`}>{r.persen}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs font-mono text-wr-gray dark:text-zinc-500">
                      <span>{r.tanggal}</span>
                      <span>{r.skor}/{r.total}</span>
                    </div>
                    <Link to={`/evaluasi/${r.kategori}?mode=evaluasi`} className="text-xs font-mono text-wr-gray dark:text-zinc-500 hover:text-wr-black dark:hover:text-white transition-colors tracking-widest uppercase">Ulangi</Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-wr-border dark:border-zinc-800">
                    {['Tanggal', 'Tes', 'Skor', 'Persen', ''].map((h, i) => (
                      <th key={i} className="text-left py-3 px-4 text-xs font-mono tracking-widest text-wr-gray dark:text-zinc-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {riwayat.slice(0, 10).map((r, i) => (
                    <tr key={i} className="border-b border-wr-border dark:border-zinc-800 hover:bg-wr-surface dark:hover:bg-zinc-900 transition-colors">
                      <td className="py-3 px-4 text-xs font-mono text-wr-gray dark:text-zinc-500">{r.tanggal}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-wr-black dark:text-white">{r.nama}</td>
                      <td className="py-3 px-4 text-sm font-mono font-bold text-wr-black dark:text-white">{r.skor}/{r.total}</td>
                      <td className="py-3 px-4"><span className={`text-sm font-black font-mono ${skorWarna(r.persen)}`}>{r.persen}%</span></td>
                      <td className="py-3 px-4 text-right">
                        <Link to={`/evaluasi/${r.kategori}?mode=evaluasi`} className="text-xs font-mono text-wr-gray dark:text-zinc-500 hover:text-wr-black dark:hover:text-white transition-colors tracking-widest uppercase">Ulangi</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-wr-border dark:border-zinc-800 pt-8 text-center">
            <p className="text-sm text-wr-gray dark:text-zinc-400 mb-4">Terus latihan untuk meningkatkan skor.</p>
            <Link to="/evaluasi" className="btn-primary text-xs">Kerjakan Tes Lagi</Link>
          </div>
        </div>
      </section>
    </div>
  )
}