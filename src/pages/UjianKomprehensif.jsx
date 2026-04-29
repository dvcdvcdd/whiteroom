import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import tesData from '../data/tesData'
import {
  CheckCircle, XCircle, RotateCcw, ChevronRight,
  AlertTriangle, Clock, Share2, Copy, Check, Flame,
  X as XIcon, Brain, Database, Eye, Target, Shield,
} from 'lucide-react'
import ProgressBar from '../components/ui/ProgressBar'
import VisualSoal from '../components/ui/VisualSoal'
import { hitungPoin, simpanPoin } from '../utils/poinSystem'

const SOAL_PER_KATEGORI = 10
const DURASI = 45 * 60
const KATEGORI_LIST = [
  { id: 'logika', nama: 'Logika', icon: Brain },
  { id: 'memori', nama: 'Memori', icon: Database },
  { id: 'observasi', nama: 'Observasi', icon: Eye },
  { id: 'strategi', nama: 'Strategi', icon: Target },
  { id: 'emosi', nama: 'Kontrol Emosi', icon: Shield },
]

function acakArray(arr) {
  const hasil = [...arr]
  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[hasil[i], hasil[j]] = [hasil[j], hasil[i]]
  }
  return hasil
}

function buatSoalKomprehensif() {
  let semuaSoal = []

  KATEGORI_LIST.forEach((kat) => {
    const data = tesData[kat.id]
    if (!data) return
    const soalAcak = acakArray(data.soal).slice(0, SOAL_PER_KATEGORI)
    soalAcak.forEach((soal) => {
      const idx = soal.pilihan.map((_, i) => i)
      const acak = acakArray(idx)
      semuaSoal.push({
        ...soal,
        kategoriId: kat.id,
        kategoriNama: kat.nama,
        pilihan: acak.map((i) => soal.pilihan[i]),
        jawabanBenar: acak.indexOf(soal.jawabanBenar),
        pilihanAsli: soal.pilihan,
        jawabanBenarAsli: soal.jawabanBenar,
      })
    })
  })

  return acakArray(semuaSoal)
}

function simpanRiwayatKomprehensif(skor, total, persen, perKategori) {
  try {
    const k = 'wr_riwayat'
    const r = JSON.parse(localStorage.getItem(k) || '[]')
    r.unshift({
      kategori: 'komprehensif',
      nama: 'Ujian Komprehensif',
      skor, total, persen,
      perKategori,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    })
    localStorage.setItem(k, JSON.stringify(r.slice(0, 20)))
  } catch {}
}

function getLevel(p) {
  if (p <= 30) return { label: 'Rendah', warna: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800', pesan: 'Perlu banyak latihan di semua kategori.' }
  if (p <= 50) return { label: 'Cukup', warna: 'text-yellow-700 dark:text-yellow-400', bg: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800', pesan: 'Fondasi ada. Fokus pada kategori terlemah.' }
  if (p <= 70) return { label: 'Baik', warna: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800', pesan: 'Kemampuan merata. Tingkatkan konsistensi.' }
  if (p <= 85) return { label: 'Sangat Baik', warna: 'text-green-700 dark:text-green-400', bg: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800', pesan: 'Kemampuan kuat di hampir semua kategori.' }
  return { label: 'Luar Biasa', warna: 'text-wr-black dark:text-white', bg: 'bg-wr-muted border-wr-black dark:bg-zinc-800 dark:border-zinc-600', pesan: 'Penguasaan menyeluruh. Level tertinggi.' }
}

function skorWarna(p) {
  if (p >= 86) return 'text-green-600 dark:text-green-400'
  if (p >= 71) return 'text-blue-600 dark:text-blue-400'
  if (p >= 51) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

function barWarna(p) {
  if (p >= 86) return 'bg-green-600 dark:bg-green-500'
  if (p >= 71) return 'bg-blue-600 dark:bg-blue-500'
  if (p >= 51) return 'bg-yellow-500 dark:bg-yellow-400'
  return 'bg-red-600 dark:bg-red-500'
}

// ─── Bagikan ──────────────────────────────────────────────
function TombolBagikan({ skor, total, persen, level }) {
  const [copied, setCopied] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const siteUrl = `${window.location.origin}${import.meta.env.BASE_URL}ujian`
  const teks = `🧠 Hasil Ujian Komprehensif Whiteroom\n\n📊 Skor: ${skor}/${total} (${persen}%)\n🏆 Level: ${level}\n\nUji semua kemampuanmu!\n🔗 ${siteUrl}`

  const doCopy = async (t) => {
    try { await navigator.clipboard.writeText(t) } catch {
      const el = document.createElement('textarea'); el.value = t; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el)
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000); setShowMenu(false)
  }

  return (
    <div className="relative">
      <button onClick={() => setShowMenu(!showMenu)} className="btn-outline w-full flex items-center justify-center gap-2 text-xs md:text-sm">
        {copied ? <Check size={14} className="text-green-600" /> : <Share2 size={14} />}
        {copied ? 'Tersalin!' : 'Bagikan Hasil'}
      </button>
      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute bottom-full left-0 right-0 mb-2 z-50 bg-white dark:bg-zinc-900 border border-wr-border dark:border-zinc-700 shadow-lg">
            <div className="p-3 border-b border-wr-border dark:border-zinc-800">
              <p className="text-[10px] font-mono text-wr-gray dark:text-zinc-500 uppercase tracking-widest mb-2">Preview</p>
              <div className="text-xs text-wr-black dark:text-zinc-300 bg-wr-surface dark:bg-zinc-800 p-3 font-mono whitespace-pre-line leading-relaxed max-h-32 overflow-y-auto">{teks}</div>
            </div>
            <div className="p-2 flex flex-col gap-1">
              <button onClick={() => doCopy(teks)} className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono tracking-widest uppercase text-wr-black dark:text-zinc-300 hover:bg-wr-surface dark:hover:bg-zinc-800 transition-colors w-full text-left"><Copy size={12} />Salin Teks</button>
              <button onClick={() => doCopy(siteUrl)} className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono tracking-widest uppercase text-wr-black dark:text-zinc-300 hover:bg-wr-surface dark:hover:bg-zinc-800 transition-colors w-full text-left"><Copy size={12} />Salin Link</button>
              <button onClick={() => { window.open(`https://wa.me/?text=${encodeURIComponent(teks)}`, '_blank'); setShowMenu(false) }} className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono tracking-widest uppercase text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors w-full text-left"><Share2 size={12} />WhatsApp</button>
              <button onClick={() => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(teks)}`, '_blank'); setShowMenu(false) }} className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono tracking-widest uppercase text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors w-full text-left"><Share2 size={12} />Twitter / X</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Modal Batal ──────────────────────────────────────────
function ModalKonfirmasi({ onLanjut, onBatal }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white dark:bg-zinc-900 border border-wr-border dark:border-zinc-700 p-6 md:p-8 max-w-sm w-full mx-4">
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <AlertTriangle size={18} className="text-wr-red flex-shrink-0" />
          <h3 className="text-sm md:text-base font-bold text-wr-black dark:text-white">Batalkan Ujian?</h3>
        </div>
        <p className="text-xs md:text-sm text-wr-gray dark:text-zinc-400 leading-relaxed mb-5 md:mb-6">Ujian Komprehensif akan dibatalkan. Semua progres hilang.</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button onClick={onLanjut} className="btn-primary flex-1 text-xs md:text-sm py-2.5">Ya, Batalkan</button>
          <button onClick={onBatal} className="btn-outline flex-1 text-xs md:text-sm py-2.5">Lanjutkan</button>
        </div>
      </div>
    </div>
  )
}

// ─── Halaman Intro ────────────────────────────────────────
function IntroUjian({ onMulai }) {
  return (
    <div>
      <section className="min-h-[25vh] md:min-h-[30vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-20 bg-wr-black dark:bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-3">Ujian Komprehensif</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            Evaluasi Menyeluruh
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl">
            Ujian ini menguji semua 5 kategori kemampuan dalam satu sesi. Soal dicampur acak dari Logika, Memori, Observasi, Strategi, dan Kontrol Emosi.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="page-container">
          <div className="max-w-2xl">
            {/* Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Total Soal', val: '50' },
                { label: 'Kategori', val: '5' },
                { label: 'Waktu', val: '45 menit' },
                { label: 'Poin', val: '×2' },
              ].map((item) => (
                <div key={item.label} className="border border-wr-border dark:border-zinc-800 p-4 text-center bg-white dark:bg-zinc-900">
                  <p className="text-xl md:text-2xl font-black font-mono text-wr-black dark:text-white">{item.val}</p>
                  <p className="text-[10px] font-mono text-wr-gray dark:text-zinc-500 uppercase tracking-widest mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Kategori */}
            <p className="section-label mb-4">Kategori yang Diuji</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {KATEGORI_LIST.map((kat) => {
                const Icon = kat.icon
                return (
                  <div key={kat.id} className="flex items-center gap-3 border border-wr-border dark:border-zinc-800 p-3 bg-white dark:bg-zinc-900">
                    <Icon size={16} className="text-wr-black dark:text-white flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-wr-black dark:text-white">{kat.nama}</p>
                      <p className="text-[10px] font-mono text-wr-gray dark:text-zinc-500">{SOAL_PER_KATEGORI} soal</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Aturan */}
            <div className="border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4 mb-8">
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  <p className="font-bold mb-1">Ketentuan Ujian:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Soal dari 5 kategori dicampur acak</li>
                    <li>Timer 45 menit — tidak bisa di-pause</li>
                    <li>Skor disimpan ke riwayat dan poin dihitung ×2</li>
                    <li>Hasil menampilkan skor per kategori</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={onMulai} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Clock size={14} /> Mulai Ujian Komprehensif
              </button>
              <Link to="/evaluasi" className="btn-outline flex-1 text-center">Kembali</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Hasil Komprehensif ───────────────────────────────────
function HasilKomprehensif({ skor, total, riwayatJawaban, onUlang, hasilPoin }) {
  const persen = Math.round((skor / total) * 100)
  const level = getLevel(persen)
  const [lihatReview, setLihatReview] = useState(false)

  // Hitung per kategori
  const perKategori = KATEGORI_LIST.map((kat) => {
    const soalKat = riwayatJawaban.filter((r) => r.kategoriId === kat.id)
    const benar = soalKat.filter((r) => r.dipilih === r.jawabanBenar).length
    const totalKat = soalKat.length
    const persenKat = totalKat > 0 ? Math.round((benar / totalKat) * 100) : 0
    return { ...kat, benar, total: totalKat, persen: persenKat }
  }).sort((a, b) => b.persen - a.persen)

  return (
    <div className="px-4 sm:px-6 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        {/* Skor utama */}
        <div className="text-center mb-6 md:mb-8">
          <CheckCircle size={36} className="text-wr-black dark:text-white mx-auto mb-3" />
          <p className="section-label mb-1">Ujian Komprehensif Selesai</p>
          <p className="text-5xl md:text-6xl font-black font-mono text-wr-black dark:text-white mb-1">{skor}<span className="text-xl md:text-2xl text-wr-gray dark:text-zinc-500">/{total}</span></p>
          <p className="text-xs md:text-sm font-mono text-wr-gray dark:text-zinc-500">{persen}% benar</p>
        </div>

        {/* Level */}
        <div className={`border p-4 md:p-6 mb-4 ${level.bg}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono tracking-widest text-wr-gray dark:text-zinc-500 uppercase">Hasil Keseluruhan</span>
            <span className={`text-xs md:text-sm font-black tracking-widest uppercase ${level.warna}`}>{level.label}</span>
          </div>
          <ProgressBar value={persen} showPercent={false} />
          <p className="text-xs md:text-sm text-wr-gray dark:text-zinc-400 leading-relaxed mt-3">{level.pesan}</p>
        </div>

        {/* Skor per kategori */}
        <p className="section-label mb-4 mt-6">Skor Per Kategori</p>
        <div className="flex flex-col gap-3 mb-6">
          {perKategori.map((kat) => {
            const Icon = kat.icon
            return (
              <div key={kat.id} className="border border-wr-border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-wr-black dark:text-white" />
                    <span className="text-sm font-bold text-wr-black dark:text-white">{kat.nama}</span>
                  </div>
                  <span className={`text-lg font-black font-mono ${skorWarna(kat.persen)}`}>{kat.persen}%</span>
                </div>
                <div className="w-full bg-wr-muted dark:bg-zinc-800 h-2">
                  <div className={`h-2 ${barWarna(kat.persen)} transition-all duration-500`} style={{ width: `${kat.persen}%` }} />
                </div>
                <p className="text-[10px] font-mono text-wr-gray dark:text-zinc-500 mt-1">{kat.benar}/{kat.total} benar</p>
              </div>
            )
          })}
        </div>

        {/* Poin */}
        {hasilPoin && (
          <div className="border border-wr-border dark:border-zinc-800 p-4 md:p-5 mb-4 bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono tracking-widest text-wr-gray dark:text-zinc-500 uppercase">Poin Didapat (×2)</span>
              <span className="text-lg font-black font-mono text-wr-black dark:text-white">+{hasilPoin.poinDapat}</span>
            </div>
            {hasilPoin.streakMultiplier > 1 && (
              <p className="text-[10px] md:text-xs font-mono text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1">
                <Flame size={12} /> Streak {hasilPoin.streak} hari — bonus ×{hasilPoin.streakMultiplier}
              </p>
            )}
            <div className="flex items-center justify-between text-xs font-mono text-wr-gray dark:text-zinc-500">
              <span>{hasilPoin.kelasSesudah.nama}</span>
              <span>{hasilPoin.totalPoin} poin total</span>
            </div>
            {hasilPoin.naikKelas && (
              <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-center">
                <p className="text-sm font-bold text-amber-800 dark:text-amber-300">🎉 Naik Kelas!</p>
                <p className="text-xs font-mono text-amber-700 dark:text-amber-400 mt-1">{hasilPoin.kelasSebelum.nama} → {hasilPoin.kelasSesudah.nama}</p>
              </div>
            )}
          </div>
        )}

        {/* Bagikan */}
        <div className="mb-4">
          <TombolBagikan skor={skor} total={total} persen={persen} level={level.label} />
        </div>

        {/* Review */}
        <button onClick={() => setLihatReview(!lihatReview)} className="w-full btn-outline mb-6 text-xs md:text-sm">
          {lihatReview ? 'Sembunyikan Review' : 'Lihat Review Jawaban'}
        </button>

        {lihatReview && (
          <div className="flex flex-col gap-3 md:gap-4 mb-8">
            <p className="text-xs font-mono tracking-widest text-wr-gray dark:text-zinc-500 uppercase">Review Jawaban</p>
            {riwayatJawaban.map((item, i) => {
              const benar = item.dipilih === item.jawabanBenar
              return (
                <div key={`${item.kategoriId}-${item.id}`} className={`border p-4 md:p-5 ${benar ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'}`}>
                  <div className="flex items-start gap-2 md:gap-3">
                    {benar ? <CheckCircle size={14} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" /> : <XCircle size={14} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-500 uppercase tracking-widest">Soal {i + 1}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-wr-muted dark:bg-zinc-800 text-wr-gray dark:text-zinc-500 border border-wr-border dark:border-zinc-700">{item.kategoriNama}</span>
                      </div>
                      <p className="text-xs md:text-sm font-semibold text-wr-black dark:text-zinc-200 leading-relaxed mb-2 whitespace-pre-line break-words">{item.pertanyaan}</p>
                      {item.visual && <div className="mb-2"><VisualSoal type={item.visual.type} data={item.visual.data} /></div>}
                      <div className={`text-[10px] md:text-xs px-2 md:px-3 py-1.5 md:py-2 mb-2 font-mono break-words ${benar ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                        <span className="font-bold uppercase tracking-widest">{benar ? 'Benar:' : 'Salah:'}</span> {item.dipilih !== null ? item.pilihan[item.dipilih] : 'Tidak dijawab'}
                      </div>
                      {!benar && <div className="text-[10px] md:text-xs px-2 md:px-3 py-1.5 md:py-2 mb-2 font-mono bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 break-words"><span className="font-bold uppercase tracking-widest">Jawaban Benar:</span> {item.pilihanAsli ? item.pilihanAsli[item.jawabanBenarAsli] : item.pilihan[item.jawabanBenar]}</div>}
                      {item.penjelasan && <div className="text-[10px] md:text-xs px-2 md:px-3 py-1.5 md:py-2 bg-white dark:bg-zinc-800 border border-wr-border dark:border-zinc-700 text-wr-gray dark:text-zinc-400 leading-relaxed break-words"><span className="font-bold font-mono uppercase tracking-widest text-wr-black dark:text-zinc-200">Penjelasan: </span>{item.penjelasan}</div>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Aksi */}
        <div className="flex flex-col gap-3">
          <button onClick={onUlang} className="btn-outline w-full flex items-center justify-center gap-2 text-xs md:text-sm"><RotateCcw size={14} />Coba Lagi</button>
          <Link to="/evaluasi" className="btn-primary w-full text-center text-xs md:text-sm">Kembali ke Evaluasi</Link>
          <Link to="/profil" className="btn-ghost w-full text-center text-xs md:text-sm">Lihat Profil</Link>
        </div>
      </div>
    </div>
  )
}

// ─── Halaman Utama ────────────────────────────────────────
export default function UjianKomprehensif() {
  const navigate = useNavigate()
  const [mulai, setMulai] = useState(false)
  const [soal, setSoal] = useState([])
  const [soalIndex, setSoalIndex] = useState(0)
  const [pilihanDipilih, setPilihanDipilih] = useState(null)
  const [riwayatJawaban, setRiwayatJawaban] = useState([])
  const [selesai, setSelesai] = useState(false)
  const [waktu, setWaktu] = useState(DURASI)
  const [showModalBatal, setShowModalBatal] = useState(false)
  const [hasilPoin, setHasilPoin] = useState(null)
  const sudahSimpanRef = useRef(false)

  const handleMulai = () => {
    setSoal(buatSoalKomprehensif())
    setMulai(true)
    setWaktu(DURASI)
  }

  useEffect(() => {
    if (!mulai || selesai || soal.length === 0) return
    const iv = setInterval(() => {
      setWaktu((p) => { if (p <= 1) { clearInterval(iv); setSelesai(true); return 0 } return p - 1 })
    }, 1000)
    return () => clearInterval(iv)
  }, [mulai, selesai, soal])

  useEffect(() => {
    if (!selesai || sudahSimpanRef.current || soal.length === 0) return
    sudahSimpanRef.current = true
    const s = riwayatJawaban.filter((r) => r.dipilih === r.jawabanBenar).length
    const total = soal.length
    const persen = Math.round((s / total) * 100)

    const perKategori = KATEGORI_LIST.map((kat) => {
      const soalKat = riwayatJawaban.filter((r) => r.kategoriId === kat.id)
      const benar = soalKat.filter((r) => r.dipilih === r.jawabanBenar).length
      return { kategori: kat.id, nama: kat.nama, benar, total: soalKat.length, persen: soalKat.length > 0 ? Math.round((benar / soalKat.length) * 100) : 0 }
    })

    simpanRiwayatKomprehensif(s, total, persen, perKategori)
    const poinBase = hitungPoin(persen, 'evaluasi') * 2
    const hasil = simpanPoin(poinBase)
    setHasilPoin(hasil)
  }, [selesai, riwayatJawaban, soal])

  const handleUlang = useCallback(() => {
    setSoal(buatSoalKomprehensif())
    setSoalIndex(0)
    setPilihanDipilih(null)
    setRiwayatJawaban([])
    setSelesai(false)
    setHasilPoin(null)
    setWaktu(DURASI)
    sudahSimpanRef.current = false
  }, [])

  if (!mulai) return <IntroUjian onMulai={handleMulai} />

  if (selesai && soal.length > 0) {
    const skor = riwayatJawaban.filter((r) => r.dipilih === r.jawabanBenar).length
    return <HasilKomprehensif skor={skor} total={soal.length} riwayatJawaban={riwayatJawaban} onUlang={handleUlang} hasilPoin={hasilPoin} />
  }

  if (soal.length === 0) return <div className="min-h-[60vh] flex items-center justify-center"><p className="text-wr-gray dark:text-zinc-400 text-sm font-mono">Memuat soal...</p></div>

  const soalSaat = soal[soalIndex]
  const progres = ((soalIndex + 1) / soal.length) * 100
  const isAkhir = soalIndex + 1 >= soal.length
  const menit = Math.floor(waktu / 60)
  const detik = waktu % 60
  const timerStr = `${String(menit).padStart(2, '0')}:${String(detik).padStart(2, '0')}`
  const hampirHabis = waktu <= 120 && waktu > 0
  const sangatMendekat = waktu <= 30 && waktu > 0

  const handlePilih = (i) => setPilihanDipilih(i)

  const handleSelanjutnya = () => {
    if (pilihanDipilih === null) return
    const entri = { ...soalSaat, dipilih: pilihanDipilih }
    setRiwayatJawaban([...riwayatJawaban, entri])
    if (isAkhir) setSelesai(true)
    else { setSoalIndex(soalIndex + 1); setPilihanDipilih(null) }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      {showModalBatal && <ModalKonfirmasi onLanjut={() => { setMulai(false); navigate('/evaluasi') }} onBatal={() => setShowModalBatal(false)} />}

      {/* Header */}
      <div className="sticky top-16 z-40 bg-white dark:bg-zinc-950 border-b border-wr-border dark:border-zinc-800">
        {hampirHabis && (
          <div className={`flex items-center justify-center gap-2 py-1.5 md:py-2 text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase ${sangatMendekat ? 'bg-red-600 text-white' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-b border-amber-200 dark:border-amber-800'}`}>
            <Clock size={10} /><span className="truncate">{sangatMendekat ? `WAKTU KRITIS — ${timerStr}` : `Sisa < 2 menit — ${timerStr}`}</span>
          </div>
        )}
        <div className="page-container">
          <div className="flex items-center justify-between h-10 md:h-12">
            <div className="flex items-center gap-2 truncate mr-4">
              <span className="text-xs md:text-sm font-bold text-wr-black dark:text-white truncate">Ujian Komprehensif</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 bg-wr-muted dark:bg-zinc-800 text-wr-gray dark:text-zinc-500 border border-wr-border dark:border-zinc-700 flex-shrink-0">{soalSaat.kategoriNama}</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
              <span className={`font-mono text-xs md:text-sm font-bold ${sangatMendekat ? 'text-red-600 animate-pulse' : hampirHabis ? 'text-amber-600' : 'text-wr-black dark:text-white'}`}>{timerStr}</span>
              <span className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-500">{soalIndex + 1}/{soal.length}</span>
            </div>
          </div>
        </div>
        <ProgressBar value={progres} showPercent={false} height="thin" />
      </div>

      {/* Soal */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 md:py-12">
        <div className="max-w-2xl w-full">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <p className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-500 tracking-widest uppercase">Soal {soalIndex + 1} dari {soal.length}</p>
            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-wr-surface dark:bg-zinc-800 text-wr-gray dark:text-zinc-500 border border-wr-border dark:border-zinc-700">{soalSaat.kategoriNama}</span>
          </div>
          <p className="text-base md:text-lg font-semibold text-wr-black dark:text-zinc-200 leading-relaxed whitespace-pre-line">{soalSaat.pertanyaan}</p>

          {soalSaat.visual && <div className="my-4 md:my-6"><VisualSoal type={soalSaat.visual.type} data={soalSaat.visual.data} /></div>}
          {!soalSaat.visual && <div className="mb-6 md:mb-8" />}

          <div className="flex flex-col gap-2 md:gap-3">
            {soalSaat.pilihan.map((pil, idx) => (
              <button
                key={idx}
                onClick={() => handlePilih(idx)}
                className={`text-left px-4 py-3 md:px-5 md:py-4 border text-xs md:text-sm transition-all duration-150 cursor-pointer ${
                  pilihanDipilih === idx
                    ? 'border-wr-black dark:border-white bg-wr-muted dark:bg-zinc-800 font-semibold text-wr-black dark:text-white'
                    : 'border-wr-border dark:border-zinc-700 text-wr-gray dark:text-zinc-400 hover:border-wr-black dark:hover:border-zinc-400 hover:text-wr-black dark:hover:text-white bg-white dark:bg-zinc-900'
                }`}
              >
                {pil}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-8 md:mt-10">
            <button onClick={() => setShowModalBatal(true)} className="text-[10px] md:text-xs text-wr-gray dark:text-zinc-500 hover:text-wr-black dark:hover:text-white transition-colors font-mono tracking-widest uppercase flex items-center gap-1"><XIcon size={12} />Batal</button>
            <button
              onClick={handleSelanjutnya}
              disabled={pilihanDipilih === null}
              className={`flex items-center gap-1.5 md:gap-2 px-4 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-semibold tracking-widest uppercase border transition-all duration-200 ${
                pilihanDipilih !== null
                  ? 'bg-wr-black dark:bg-white text-white dark:text-wr-black border-wr-black dark:border-white hover:bg-white dark:hover:bg-zinc-950 hover:text-wr-black dark:hover:text-white cursor-pointer'
                  : 'bg-wr-muted dark:bg-zinc-800 text-wr-gray dark:text-zinc-600 border-wr-border dark:border-zinc-700 cursor-not-allowed'
              }`}
            >
              {isAkhir ? 'Selesai' : 'Lanjut'}<ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}