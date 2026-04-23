import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Database, Eye, Target, Shield, RotateCcw, Clock, BookOpen } from 'lucide-react'
import Badge from '../components/ui/Badge'

const kategoriTes = [
  { id: 'logika', nama: 'Tes Logika', icon: Brain, desc: 'Berpikir deduktif, induktif, dan analitis.', soal: 50, waktu: '25 menit', level: 'Menengah' },
  { id: 'memori', nama: 'Tes Memori', icon: Database, desc: 'Kapasitas memori jangka pendek dan daya ingat.', soal: 50, waktu: '20 menit', level: 'Dasar' },
  { id: 'observasi', nama: 'Tes Observasi', icon: Eye, desc: 'Ketajaman menangkap detail dan pola tersembunyi.', soal: 50, waktu: '20 menit', level: 'Menengah' },
  { id: 'strategi', nama: 'Tes Strategi', icon: Target, desc: 'Perencanaan dan pengambilan keputusan taktis.', soal: 50, waktu: '30 menit', level: 'Lanjutan' },
  { id: 'emosi', nama: 'Tes Kontrol Emosi', icon: Shield, desc: 'Stabilitas respons dalam situasi tekanan tinggi.', soal: 50, waktu: '20 menit', level: 'Menengah' },
]

function ambilRiwayat() {
  try { return JSON.parse(localStorage.getItem('wr_riwayat') || '[]') } catch { return [] }
}
function hapusRiwayatStorage() {
  try { localStorage.removeItem('wr_riwayat') } catch { /* abaikan */ }
}
function skorWarna(persen) {
  if (persen >= 86) return 'text-green-600 dark:text-green-400'
  if (persen >= 71) return 'text-blue-600 dark:text-blue-400'
  if (persen >= 51) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

export default function Evaluasi() {
  const [riwayat, setRiwayat] = useState([])

  useEffect(() => { setRiwayat(ambilRiwayat()) }, [])

  const handleHapusRiwayat = () => { hapusRiwayatStorage(); setRiwayat([]) }

  return (
    <div>
      {/* HERO */}
      <section className="min-h-[25vh] md:min-h-[30vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-20 border-b border-wr-border dark:border-zinc-800">
        <div className="max-w-7xl mx-auto w-full">
          <p className="section-label mb-3 md:mb-4">Evaluasi</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-wr-black dark:text-white mb-3 md:mb-4 max-w-2xl">
            Pilih Tes
          </h1>
          <p className="text-base md:text-lg text-wr-gray dark:text-zinc-400 max-w-xl mb-4">
            Pilih kategori dan mode yang kamu inginkan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="flex items-start gap-2 text-xs text-wr-gray dark:text-zinc-400 bg-wr-surface dark:bg-zinc-900 border border-wr-border dark:border-zinc-700 p-3">
              <Clock size={14} className="flex-shrink-0 mt-0.5 text-wr-black dark:text-white" />
              <div>
                <span className="font-bold text-wr-black dark:text-white">Mode Evaluasi</span>
                <span className="block">Ada timer, skor disimpan ke riwayat.</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs text-wr-gray dark:text-zinc-400 bg-wr-surface dark:bg-zinc-900 border border-wr-border dark:border-zinc-700 p-3">
              <BookOpen size={14} className="flex-shrink-0 mt-0.5 text-wr-black dark:text-white" />
              <div>
                <span className="font-bold text-wr-black dark:text-white">Mode Latihan</span>
                <span className="block">Tanpa timer, penjelasan langsung muncul tiap soal.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID TES */}
      <section className="py-16 md:py-20">
        <div className="page-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
            {kategoriTes.map((tes) => {
              const Icon = tes.icon
              return (
                <div key={tes.id} className="card-wr flex flex-col gap-4 md:gap-5">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 md:w-12 md:h-12 border border-wr-border dark:border-zinc-700 flex items-center justify-center">
                      <Icon size={18} className="text-wr-black dark:text-white" />
                    </div>
                    <Badge type="level" value={tes.level} />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-wr-black dark:text-white mb-1.5 md:mb-2">{tes.nama}</h3>
                    <p className="text-xs md:text-sm text-wr-gray dark:text-zinc-400 leading-relaxed">{tes.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-wr-gray dark:text-zinc-500 border-t border-wr-border dark:border-zinc-800 pt-3 md:pt-4">
                    <span>{tes.soal} soal</span>
                    <span>·</span>
                    <span>{tes.waktu}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link to={`/evaluasi/${tes.id}?mode=evaluasi`} className="btn-primary text-xs py-2.5 text-center flex items-center justify-center gap-2">
                      <Clock size={12} /> Mode Evaluasi
                    </Link>
                    <Link to={`/evaluasi/${tes.id}?mode=latihan`} className="btn-outline text-xs py-2.5 text-center flex items-center justify-center gap-2">
                      <BookOpen size={12} /> Mode Latihan
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* RIWAYAT */}
          {riwayat.length > 0 && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <p className="section-label">Riwayat Tes</p>
                  <h2 className="text-xl md:text-2xl font-black text-wr-black dark:text-white">Hasil Sebelumnya</h2>
                </div>
                <button onClick={handleHapusRiwayat} className="text-xs font-mono text-wr-gray dark:text-zinc-500 hover:text-wr-red transition-colors tracking-widest uppercase flex items-center gap-1 self-start sm:self-auto">
                  <RotateCcw size={12} /> Hapus Riwayat
                </button>
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-3 sm:hidden">
                {riwayat.map((r, i) => (
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
                      <Link to={`/evaluasi/${r.kategori}?mode=evaluasi`} className="text-xs font-mono text-wr-gray dark:text-zinc-500 hover:text-wr-black dark:hover:text-white transition-colors tracking-widest uppercase">
                        Ulangi
                      </Link>
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
                    {riwayat.map((r, i) => (
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
          )}
        </div>
      </section>
    </div>
  )
}