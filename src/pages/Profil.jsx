import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Flame, Trophy, ChevronRight } from 'lucide-react'
import ProgressBar from '../components/ui/ProgressBar'
import { ambilDataPoin, getKelas, getKelasBerikutnya, getProgresKelas, semuaKelas, BADGE_LIST, resetSemuaData } from '../utils/poinSystem'

function ambilRiwayat() {
  try { return JSON.parse(localStorage.getItem('wr_riwayat') || '[]') } catch { return [] }
}

function skorWarna(p) {
  if (p >= 86) return 'text-green-600 dark:text-green-400'
  if (p >= 71) return 'text-blue-600 dark:text-blue-400'
  if (p >= 51) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

export default function Profil() {
  const [data, setData] = useState(null)
  const [riwayat, setRiwayat] = useState([])

  useEffect(() => {
    setData(ambilDataPoin())
    setRiwayat(ambilRiwayat())
  }, [])

  const handleReset = () => {
    if (window.confirm('Hapus semua data? Poin, riwayat, dan badge akan hilang permanen.')) {
      resetSemuaData()
      setData(ambilDataPoin())
      setRiwayat([])
    }
  }

  if (!data) return null

  const kelas = getKelas(data.totalPoin)
  const kelasNext = getKelasBerikutnya(data.totalPoin)
  const progres = getProgresKelas(data.totalPoin)

  // Hitung rata-rata per kategori
  const kategoriStats = {}
  riwayat.forEach((r) => {
    if (!kategoriStats[r.kategori]) kategoriStats[r.kategori] = { nama: r.nama, skor: [] }
    kategoriStats[r.kategori].skor.push(r.persen)
  })
  const perKategori = Object.entries(kategoriStats).map(([kat, d]) => ({
    kategori: kat,
    nama: d.nama,
    rataRata: Math.round(d.skor.reduce((a, b) => a + b, 0) / d.skor.length),
    totalTes: d.skor.length,
  })).sort((a, b) => b.rataRata - a.rataRata)

  const terkuat = perKategori[0] || null
  const terlemah = perKategori[perKategori.length - 1] || null

  return (
    <div>
      {/* HERO */}
      <section className="min-h-[25vh] md:min-h-[30vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-20 bg-wr-black dark:bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-2">Profil Subjek</p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
                {kelas.nama}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-mono font-bold text-white">{data.totalPoin} poin</span>
                {data.streak > 0 && (
                  <span className="flex items-center gap-1 text-xs font-mono text-orange-400">
                    <Flame size={12} /> {data.streak} hari streak
                  </span>
                )}
                <span className="text-xs font-mono text-gray-500">{data.totalTes} tes selesai</span>
              </div>
            </div>

            {kelasNext && (
              <div className="text-right">
                <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-1">Kelas Berikutnya</p>
                <p className="text-sm font-mono text-gray-300">{kelasNext.nama}</p>
                <p className="text-xs font-mono text-gray-500">{progres.sisa} poin lagi</p>
              </div>
            )}
          </div>

          {/* Progres kelas */}
          {kelasNext && (
            <div className="mt-6">
              <div className="w-full bg-gray-800 h-2">
                <div className="h-2 bg-white transition-all duration-500" style={{ width: `${progres.persen}%` }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] font-mono text-gray-600">{kelas.id}</span>
                <span className="text-[10px] font-mono text-gray-600">{kelasNext.id}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Kiri: Kemampuan */}
            <div>
              <p className="section-label mb-6">Profil Kemampuan</p>

              {perKategori.length > 0 ? (
                <div className="flex flex-col gap-4 mb-8">
                  {perKategori.map((k) => (
                    <div key={k.kategori} className="border border-wr-border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-wr-black dark:text-white">{k.nama}</span>
                        <span className={`text-lg font-black font-mono ${skorWarna(k.rataRata)}`}>{k.rataRata}%</span>
                      </div>
                      <ProgressBar value={k.rataRata} showPercent={false} />
                      <p className="text-[10px] font-mono text-wr-gray dark:text-zinc-500 mt-1">{k.totalTes} tes dikerjakan</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-wr-border dark:border-zinc-800 p-6 text-center bg-white dark:bg-zinc-900 mb-8">
                  <p className="text-sm text-wr-gray dark:text-zinc-400 mb-3">Belum ada data kemampuan.</p>
                  <Link to="/evaluasi" className="text-xs font-mono text-wr-black dark:text-white hover:underline tracking-widest uppercase">Mulai tes pertama →</Link>
                </div>
              )}

              {/* Kekuatan & Kelemahan */}
              {perKategori.length >= 2 && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4">
                    <p className="text-[10px] font-mono text-green-700 dark:text-green-400 uppercase tracking-widest mb-1">Terkuat</p>
                    <p className="text-sm font-bold text-wr-black dark:text-white">{terkuat.nama}</p>
                    <p className="text-xs font-mono text-green-600 dark:text-green-400">{terkuat.rataRata}%</p>
                  </div>
                  <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
                    <p className="text-[10px] font-mono text-red-700 dark:text-red-400 uppercase tracking-widest mb-1">Perlu Latihan</p>
                    <p className="text-sm font-bold text-wr-black dark:text-white">{terlemah.nama}</p>
                    <p className="text-xs font-mono text-red-600 dark:text-red-400">{terlemah.rataRata}%</p>
                    <Link to={`/evaluasi/${terlemah.kategori}?mode=latihan`} className="text-[10px] font-mono text-red-600 dark:text-red-400 hover:underline tracking-widest uppercase mt-1 inline-block">Latihan →</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Kanan: Badge & Kelas */}
            <div>
              {/* Sistem Kelas */}
              <p className="section-label mb-6">Sistem Kelas</p>
              <div className="flex flex-col gap-2 mb-8">
                {semuaKelas().map((k) => {
                  const isAktif = kelas.id === k.id
                  const isTercapai = data.totalPoin >= k.min
                  return (
                    <div key={k.id} className={`flex items-center justify-between p-3 border transition-colors ${isAktif ? `${k.bg} border` : isTercapai ? 'bg-white dark:bg-zinc-900 border-wr-border dark:border-zinc-800' : 'bg-wr-muted dark:bg-zinc-800 border-wr-border dark:border-zinc-800 opacity-50'}`}>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-black font-mono ${isAktif ? '' : isTercapai ? 'text-wr-black dark:text-white' : 'text-wr-gray dark:text-zinc-500'}`}>{k.id}</span>
                        <span className={`text-xs font-mono ${isAktif ? '' : 'text-wr-gray dark:text-zinc-400'}`}>{k.nama}</span>
                      </div>
                      <span className="text-[10px] font-mono text-wr-gray dark:text-zinc-500">{k.min}+ poin</span>
                    </div>
                  )
                })}
              </div>

              {/* Badge */}
              <p className="section-label mb-6">Pencapaian</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BADGE_LIST.map((badge) => {
                  const unlocked = data.badges.includes(badge.id)
                  return (
                    <div key={badge.id} className={`flex items-center gap-3 p-3 border transition-colors ${unlocked ? 'border-wr-border dark:border-zinc-700 bg-white dark:bg-zinc-900' : 'border-wr-border dark:border-zinc-800 bg-wr-muted dark:bg-zinc-800 opacity-40'}`}>
                      <span className="text-lg">{unlocked ? badge.icon : '🔒'}</span>
                      <div>
                        <p className={`text-xs font-bold ${unlocked ? 'text-wr-black dark:text-white' : 'text-wr-gray dark:text-zinc-500'}`}>{badge.nama}</p>
                        <p className="text-[10px] text-wr-gray dark:text-zinc-500">{badge.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Info lokal + Reset */}
          <div className="mt-12 border-t border-wr-border dark:border-zinc-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-xs text-wr-gray dark:text-zinc-500 font-mono">
                ⚠ Semua data tersimpan lokal di perangkat ini. Menghapus cache browser akan menghilangkan progres.
              </p>
              <button onClick={handleReset} className="text-xs font-mono text-wr-gray dark:text-zinc-500 hover:text-wr-red transition-colors tracking-widest uppercase">
                Reset Semua Data
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}