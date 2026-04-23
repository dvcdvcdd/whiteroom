import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import tesData from '../data/tesData'
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  ChevronRight,
  AlertTriangle,
  Clock,
  BookOpen,
  Share2,
  Copy,
  Check,
  X as XIcon,
} from 'lucide-react'
import ProgressBar from '../components/ui/ProgressBar'

// ─── Utilitas ─────────────────────────────────────────────
function acakArray(arr) {
  const hasil = [...arr]
  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[hasil[i], hasil[j]] = [hasil[j], hasil[i]]
  }
  return hasil
}

function acakSoalDanPilihan(soalAsli) {
  const soalTeracak = acakArray(soalAsli)
  return soalTeracak.map((soal) => {
    const indexAsli = soal.pilihan.map((_, i) => i)
    const indexAcak = acakArray(indexAsli)
    const pilihanBaru = indexAcak.map((i) => soal.pilihan[i])
    const jawabanBenarBaru = indexAcak.indexOf(soal.jawabanBenar)
    return {
      ...soal,
      pilihan: pilihanBaru,
      jawabanBenar: jawabanBenarBaru,
      pilihanAsli: soal.pilihan,
      jawabanBenarAsli: soal.jawabanBenar,
    }
  })
}

function simpanRiwayat(kategori, nama, skor, total, persen) {
  try {
    const kunci = 'wr_riwayat'
    const riwayat = JSON.parse(localStorage.getItem(kunci) || '[]')
    riwayat.unshift({
      kategori, nama, skor, total, persen,
      tanggal: new Date().toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric',
      }),
    })
    localStorage.setItem(kunci, JSON.stringify(riwayat.slice(0, 20)))
  } catch { /* abaikan */ }
}

function getLevel(persen) {
  if (persen <= 30) return { label: 'Rendah', warna: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800', pesan: 'Kemampuanmu di kategori ini masih perlu banyak latihan. Perhatikan penjelasan tiap soal dan coba lagi.' }
  if (persen <= 50) return { label: 'Cukup', warna: 'text-yellow-700 dark:text-yellow-400', bg: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800', pesan: 'Ada potensi yang bisa dikembangkan. Pelajari soal yang salah dan ulangi tes ini.' }
  if (persen <= 70) return { label: 'Baik', warna: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800', pesan: 'Kemampuanmu di atas rata-rata. Latih konsistensi untuk mencapai level berikutnya.' }
  if (persen <= 85) return { label: 'Sangat Baik', warna: 'text-green-700 dark:text-green-400', bg: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800', pesan: 'Kamu menunjukkan kemampuan yang kuat. Pertahankan dan terus asah.' }
  return { label: 'Luar Biasa', warna: 'text-wr-black dark:text-white', bg: 'bg-wr-muted border-wr-black dark:bg-zinc-800 dark:border-zinc-600', pesan: 'Pencapaian luar biasa. Kamu berada di level tertinggi kategori ini.' }
}

// ─── Komponen Bagikan ─────────────────────────────────────
function TombolBagikan({ skor, total, persen, namaKategori, level }) {
  const [copied, setCopied] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const siteUrl = `${window.location.origin}${import.meta.env.BASE_URL}evaluasi`

  const teksBagikan = `🧠 Hasil Tes Whiteroom — ${namaKategori}\n\n📊 Skor: ${skor}/${total} (${persen}%)\n🏆 Level: ${level}\n\nAsah kemampuan berpikirmu juga!\n🔗 ${siteUrl}`

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(teksBagikan)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const el = document.createElement('textarea')
      el.value = teksBagikan
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    setShowMenu(false)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = siteUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    setShowMenu(false)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hasil Tes Whiteroom — ${namaKategori}`,
          text: teksBagikan,
          url: siteUrl,
        })
      } catch { /* user batal */ }
    }
    setShowMenu(false)
  }

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(teksBagikan)}`
    window.open(url, '_blank')
    setShowMenu(false)
  }

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(teksBagikan)}`
    window.open(url, '_blank')
    setShowMenu(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="btn-outline w-full flex items-center justify-center gap-2 text-xs md:text-sm"
      >
        {copied ? <Check size={14} className="text-green-600" /> : <Share2 size={14} />}
        {copied ? 'Tersalin!' : 'Bagikan Hasil'}
      </button>

      {/* Dropdown menu */}
      {showMenu && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />

          <div className="absolute bottom-full left-0 right-0 mb-2 z-50 bg-white dark:bg-zinc-900 border border-wr-border dark:border-zinc-700 shadow-lg">
            {/* Preview teks */}
            <div className="p-3 border-b border-wr-border dark:border-zinc-800">
              <p className="text-[10px] font-mono text-wr-gray dark:text-zinc-500 uppercase tracking-widest mb-2">
                Preview
              </p>
              <div className="text-xs text-wr-black dark:text-zinc-300 bg-wr-surface dark:bg-zinc-800 p-3 font-mono whitespace-pre-line leading-relaxed max-h-32 overflow-y-auto">
                {teksBagikan}
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="p-2 flex flex-col gap-1">
              <button
                onClick={handleCopyText}
                className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono tracking-widest uppercase text-wr-black dark:text-zinc-300 hover:bg-wr-surface dark:hover:bg-zinc-800 transition-colors w-full text-left"
              >
                <Copy size={12} />
                Salin Teks Hasil
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono tracking-widest uppercase text-wr-black dark:text-zinc-300 hover:bg-wr-surface dark:hover:bg-zinc-800 transition-colors w-full text-left"
              >
                <Copy size={12} />
                Salin Link Website
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono tracking-widest uppercase text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors w-full text-left"
              >
                <Share2 size={12} />
                WhatsApp
              </button>

              <button
                onClick={handleShareTwitter}
                className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono tracking-widest uppercase text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors w-full text-left"
              >
                <Share2 size={12} />
                Twitter / X
              </button>

              {navigator.share && (
                <button
                  onClick={handleNativeShare}
                  className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono tracking-widest uppercase text-wr-black dark:text-zinc-300 hover:bg-wr-surface dark:hover:bg-zinc-800 transition-colors w-full text-left"
                >
                  <Share2 size={12} />
                  Bagikan Lainnya...
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Feedback Soal (Mode Latihan) ─────────────────────────
function FeedbackSoal({ soal, dipilih, onLanjut, isAkhir }) {
  const benar = dipilih === soal.jawabanBenar

  return (
    <div className={`border p-4 md:p-6 mt-4 ${benar ? 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20'}`}>
      <div className="flex items-center gap-2 mb-3">
        {benar ? (
          <CheckCircle size={18} className="text-green-600 dark:text-green-400" />
        ) : (
          <XCircle size={18} className="text-red-600 dark:text-red-400" />
        )}
        <span className={`text-sm font-bold ${benar ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
          {benar ? 'Jawaban Benar!' : 'Jawaban Salah'}
        </span>
      </div>

      {!benar && (
        <div className="text-xs md:text-sm px-3 py-2 mb-3 font-mono bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 break-words">
          <span className="font-bold uppercase tracking-widest">Jawaban Benar: </span>
          {soal.pilihanAsli ? soal.pilihanAsli[soal.jawabanBenarAsli] : soal.pilihan[soal.jawabanBenar]}
        </div>
      )}

      {soal.penjelasan && (
        <div className="text-xs md:text-sm px-3 py-2 bg-white dark:bg-zinc-800 border border-wr-border dark:border-zinc-700 text-wr-gray dark:text-zinc-400 leading-relaxed break-words mb-4">
          <span className="font-bold font-mono uppercase tracking-widest text-wr-black dark:text-zinc-200">Penjelasan: </span>
          {soal.penjelasan}
        </div>
      )}

      <button
        onClick={onLanjut}
        className="btn-primary text-xs md:text-sm py-2.5 w-full flex items-center justify-center gap-2"
      >
        {isAkhir ? 'Lihat Hasil' : 'Soal Berikutnya'}
        <ChevronRight size={14} />
      </button>
    </div>
  )
}

// ─── Komponen Hasil ───────────────────────────────────────
function HasilEvaluasi({ skor, total, soalDikerjakan, onUlang, modeLatihan, namaKategori }) {
  const persen = Math.round((skor / total) * 100)
  const level = getLevel(persen)
  const [lihatReview, setLihatReview] = useState(false)

  return (
    <div className="px-4 sm:px-6 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        {/* Skor utama */}
        <div className="text-center mb-6 md:mb-8">
          <CheckCircle size={36} className="text-wr-black dark:text-white mx-auto mb-3 md:mb-4" />
          <p className="section-label mb-1">
            {modeLatihan ? 'Latihan Selesai' : 'Tes Selesai'}
          </p>
          {modeLatihan && (
            <p className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-500 mb-2">
              Mode latihan — skor tidak disimpan ke riwayat
            </p>
          )}
          <p className="text-5xl md:text-6xl font-black font-mono text-wr-black dark:text-white mb-1">
            {skor}
            <span className="text-xl md:text-2xl text-wr-gray dark:text-zinc-500 font-mono">/{total}</span>
          </p>
          <p className="text-xs md:text-sm font-mono text-wr-gray dark:text-zinc-500">{persen}% jawaban benar</p>
        </div>

        {/* Level */}
        <div className={`border p-4 md:p-6 mb-4 ${level.bg}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono tracking-widest text-wr-gray dark:text-zinc-500 uppercase">Hasil</span>
            <span className={`text-xs md:text-sm font-black tracking-widest uppercase ${level.warna}`}>
              {level.label}
            </span>
          </div>
          <ProgressBar value={persen} showPercent={false} />
          <p className="text-xs md:text-sm text-wr-gray dark:text-zinc-400 leading-relaxed mt-3 md:mt-4">{level.pesan}</p>
        </div>

        {/* Ringkasan */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6">
          <div className="border border-wr-border dark:border-zinc-800 p-3 md:p-4 text-center bg-white dark:bg-zinc-900">
            <p className="text-xl md:text-2xl font-black font-mono text-green-600 dark:text-green-400">{skor}</p>
            <p className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-500 uppercase tracking-widest mt-1">Benar</p>
          </div>
          <div className="border border-wr-border dark:border-zinc-800 p-3 md:p-4 text-center bg-white dark:bg-zinc-900">
            <p className="text-xl md:text-2xl font-black font-mono text-red-600 dark:text-red-400">{total - skor}</p>
            <p className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-500 uppercase tracking-widest mt-1">Salah</p>
          </div>
          <div className="border border-wr-border dark:border-zinc-800 p-3 md:p-4 text-center bg-white dark:bg-zinc-900">
            <p className="text-xl md:text-2xl font-black font-mono text-wr-black dark:text-white">{persen}%</p>
            <p className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-500 uppercase tracking-widest mt-1">Skor</p>
          </div>
        </div>

        {/* Tombol Bagikan */}
        <div className="mb-4">
          <TombolBagikan
            skor={skor}
            total={total}
            persen={persen}
            namaKategori={namaKategori}
            level={level.label}
          />
        </div>

        {/* Review toggle */}
        <button onClick={() => setLihatReview(!lihatReview)} className="w-full btn-outline mb-6 text-xs md:text-sm">
          {lihatReview ? 'Sembunyikan Review' : 'Lihat Review Jawaban'}
        </button>

        {/* Review per soal */}
        {lihatReview && (
          <div className="flex flex-col gap-3 md:gap-4 mb-8">
            <p className="text-xs font-mono tracking-widest text-wr-gray dark:text-zinc-500 uppercase">Review Jawaban</p>
            {soalDikerjakan.map((item, i) => {
              const benar = item.dipilih === item.jawabanBenar
              return (
                <div key={item.id} className={`border p-4 md:p-5 ${benar ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'}`}>
                  <div className="flex items-start gap-2 md:gap-3">
                    {benar ? (
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={14} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-500 uppercase tracking-widest mb-1.5 md:mb-2">
                        Soal {i + 1}
                      </p>
                      <p className="text-xs md:text-sm font-semibold text-wr-black dark:text-zinc-200 leading-relaxed mb-2 md:mb-3 whitespace-pre-line break-words">
                        {item.pertanyaan}
                      </p>

                      <div className={`text-[10px] md:text-xs px-2 md:px-3 py-1.5 md:py-2 mb-2 font-mono break-words ${benar ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                        <span className="font-bold uppercase tracking-widest">{benar ? 'Benar:' : 'Salah:'}</span>{' '}
                        {item.dipilih !== null ? item.pilihan[item.dipilih] : 'Tidak dijawab'}
                      </div>

                      {!benar && (
                        <div className="text-[10px] md:text-xs px-2 md:px-3 py-1.5 md:py-2 mb-2 font-mono bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 break-words">
                          <span className="font-bold uppercase tracking-widest">Jawaban Benar:</span>{' '}
                          {item.pilihanAsli ? item.pilihanAsli[item.jawabanBenarAsli] : item.pilihan[item.jawabanBenar]}
                        </div>
                      )}

                      {item.penjelasan && (
                        <div className="text-[10px] md:text-xs px-2 md:px-3 py-1.5 md:py-2 bg-white dark:bg-zinc-800 border border-wr-border dark:border-zinc-700 text-wr-gray dark:text-zinc-400 leading-relaxed break-words">
                          <span className="font-bold font-mono uppercase tracking-widest text-wr-black dark:text-zinc-200">Penjelasan: </span>
                          {item.penjelasan}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Aksi */}
        <div className="flex flex-col gap-3">
          <button onClick={onUlang} className="btn-outline w-full flex items-center justify-center gap-2 text-xs md:text-sm">
            <RotateCcw size={14} />
            Coba Lagi (Soal & Pilihan Diacak)
          </button>
          <Link to="/evaluasi" className="btn-primary w-full text-center text-xs md:text-sm">
            Pilih Tes Lain
          </Link>
        </div>
      </div>
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
          <h3 className="text-sm md:text-base font-bold text-wr-black dark:text-white">Batalkan Tes?</h3>
        </div>
        <p className="text-xs md:text-sm text-wr-gray dark:text-zinc-400 leading-relaxed mb-5 md:mb-6">
          Semua progres akan hilang dan tidak disimpan. Yakin ingin keluar?
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button onClick={onLanjut} className="btn-primary flex-1 text-xs md:text-sm py-2.5">Ya, Batalkan</button>
          <button onClick={onBatal} className="btn-outline flex-1 text-xs md:text-sm py-2.5">Lanjutkan</button>
        </div>
      </div>
    </div>
  )
}

// ─── Halaman Utama ────────────────────────────────────────
export default function EvaluasiTes() {
  const { kategori } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const data = tesData[kategori]

  const modeLatihan = searchParams.get('mode') === 'latihan'

  const [soalAcak, setSoalAcak] = useState([])
  const [soalIndex, setSoalIndex] = useState(0)
  const [pilihanDipilih, setPilihanDipilih] = useState(null)
  const [riwayatJawaban, setRiwayatJawaban] = useState([])
  const [selesai, setSelesai] = useState(false)
  const [waktu, setWaktu] = useState(0)
  const [showModalBatal, setShowModalBatal] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const sudahSimpanRef = useRef(false)

  useEffect(() => {
    if (!data) return
    setSoalAcak(acakSoalDanPilihan(data.soal))
    setWaktu(modeLatihan ? 0 : data.durasi)
  }, [data, kategori, modeLatihan])

  useEffect(() => {
    if (selesai || soalAcak.length === 0 || modeLatihan) return
    const interval = setInterval(() => {
      setWaktu((prev) => {
        if (prev <= 1) { clearInterval(interval); setSelesai(true); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [selesai, soalAcak, modeLatihan])

  useEffect(() => {
    if (!selesai || sudahSimpanRef.current || soalAcak.length === 0 || modeLatihan) return
    sudahSimpanRef.current = true
    const skor = riwayatJawaban.filter((r) => r.dipilih === r.jawabanBenar).length
    const total = soalAcak.length
    const persen = Math.round((skor / total) * 100)
    simpanRiwayat(kategori, data.nama, skor, total, persen)
  }, [selesai, riwayatJawaban, soalAcak, kategori, data, modeLatihan])

  const handleUlang = useCallback(() => {
    setSoalAcak(acakSoalDanPilihan(data.soal))
    setSoalIndex(0)
    setPilihanDipilih(null)
    setRiwayatJawaban([])
    setSelesai(false)
    setShowFeedback(false)
    setWaktu(modeLatihan ? 0 : data.durasi)
    sudahSimpanRef.current = false
  }, [data, modeLatihan])

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-wr-gray dark:text-zinc-400 mb-4 text-sm">Kategori tes tidak ditemukan.</p>
          <Link to="/evaluasi" className="btn-primary text-xs">Kembali ke Evaluasi</Link>
        </div>
      </div>
    )
  }

  if (selesai && soalAcak.length > 0) {
    const skor = riwayatJawaban.filter((r) => r.dipilih === r.jawabanBenar).length
    return (
      <HasilEvaluasi
        skor={skor}
        total={soalAcak.length}
        soalDikerjakan={riwayatJawaban}
        onUlang={handleUlang}
        modeLatihan={modeLatihan}
        namaKategori={data.nama}
      />
    )
  }

  if (soalAcak.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-wr-gray dark:text-zinc-400 text-sm font-mono">Memuat soal...</p>
      </div>
    )
  }

  const soalSaat = soalAcak[soalIndex]
  const progres = ((soalIndex + 1) / soalAcak.length) * 100
  const isAkhir = soalIndex + 1 >= soalAcak.length

  const menit = Math.floor(waktu / 60)
  const detik = waktu % 60
  const timerStr = `${String(menit).padStart(2, '0')}:${String(detik).padStart(2, '0')}`
  const hampirHabis = !modeLatihan && waktu <= 60 && waktu > 0
  const sangatMendekat = !modeLatihan && waktu <= 10 && waktu > 0

  const handlePilih = (idx) => {
    if (showFeedback) return
    setPilihanDipilih(idx)
  }

  const handleSelanjutnya = () => {
    if (pilihanDipilih === null) return
    if (modeLatihan && !showFeedback) { setShowFeedback(true); return }
    const entri = { ...soalSaat, dipilih: pilihanDipilih }
    const riwayatBaru = [...riwayatJawaban, entri]
    setRiwayatJawaban(riwayatBaru)
    if (isAkhir) { setSelesai(true) } else { setSoalIndex(soalIndex + 1); setPilihanDipilih(null); setShowFeedback(false) }
  }

  const handleLanjutDariFeedback = () => {
    const entri = { ...soalSaat, dipilih: pilihanDipilih }
    const riwayatBaru = [...riwayatJawaban, entri]
    setRiwayatJawaban(riwayatBaru)
    if (isAkhir) { setSelesai(true) } else { setSoalIndex(soalIndex + 1); setPilihanDipilih(null); setShowFeedback(false) }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      {showModalBatal && (
        <ModalKonfirmasi onLanjut={() => navigate('/evaluasi')} onBatal={() => setShowModalBatal(false)} />
      )}

      {/* Header */}
      <div className="sticky top-16 z-40 bg-white dark:bg-zinc-950 border-b border-wr-border dark:border-zinc-800">
        {hampirHabis && (
          <div className={`flex items-center justify-center gap-2 py-1.5 md:py-2 text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase ${
            sangatMendekat ? 'bg-red-600 text-white' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-b border-amber-200 dark:border-amber-800'
          }`}>
            <Clock size={10} />
            <span className="truncate">{sangatMendekat ? `WAKTU HAMPIR HABIS — ${timerStr}` : `Sisa kurang dari 1 menit — ${timerStr}`}</span>
          </div>
        )}

        <div className="page-container">
          <div className="flex items-center justify-between h-10 md:h-12">
            <div className="flex items-center gap-2 truncate mr-4">
              <span className="text-xs md:text-sm font-bold text-wr-black dark:text-white truncate">{data.nama}</span>
              <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.5 border flex-shrink-0 ${
                modeLatihan ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' : 'bg-wr-muted text-wr-gray border-wr-border dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'
              }`}>
                {modeLatihan ? 'Latihan' : 'Evaluasi'}
              </span>
            </div>
            <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
              {!modeLatihan && (
                <span className={`font-mono text-xs md:text-sm font-bold ${sangatMendekat ? 'text-red-600 animate-pulse' : hampirHabis ? 'text-amber-600' : 'text-wr-black dark:text-white'}`}>
                  {timerStr}
                </span>
              )}
              {modeLatihan && (
                <span className="text-[10px] md:text-xs font-mono text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <BookOpen size={10} /> Santai
                </span>
              )}
              <span className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-500">{soalIndex + 1}/{soalAcak.length}</span>
            </div>
          </div>
        </div>
        <ProgressBar value={progres} showPercent={false} height="thin" />
      </div>

      {/* Soal */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 md:py-12">
        <div className="max-w-2xl w-full">
          <p className="text-[10px] md:text-xs font-mono text-wr-gray dark:text-zinc-500 mb-3 md:mb-4 tracking-widest uppercase">
            Soal {soalIndex + 1} dari {soalAcak.length}
          </p>
          <p className="text-base md:text-lg font-semibold text-wr-black dark:text-zinc-200 leading-relaxed mb-6 md:mb-8 whitespace-pre-line">
            {soalSaat.pertanyaan}
          </p>

          <div className="flex flex-col gap-2 md:gap-3">
            {soalSaat.pilihan.map((pilihan, idx) => {
              let btnClass = 'border-wr-border dark:border-zinc-700 text-wr-gray dark:text-zinc-400 hover:border-wr-black dark:hover:border-zinc-400 hover:text-wr-black dark:hover:text-white bg-white dark:bg-zinc-900'

              if (showFeedback) {
                if (idx === soalSaat.jawabanBenar) {
                  btnClass = 'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 font-semibold'
                } else if (idx === pilihanDipilih && idx !== soalSaat.jawabanBenar) {
                  btnClass = 'border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 font-semibold'
                } else {
                  btnClass = 'border-wr-border dark:border-zinc-800 text-wr-gray dark:text-zinc-600 bg-white dark:bg-zinc-900 opacity-50'
                }
              } else if (pilihanDipilih === idx) {
                btnClass = 'border-wr-black dark:border-white bg-wr-muted dark:bg-zinc-800 font-semibold text-wr-black dark:text-white'
              }

              return (
                <button
                  key={idx}
                  onClick={() => handlePilih(idx)}
                  disabled={showFeedback}
                  className={`text-left px-4 py-3 md:px-5 md:py-4 border text-xs md:text-sm transition-all duration-150 ${btnClass} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {pilihan}
                </button>
              )
            })}
          </div>

          {showFeedback && (
            <FeedbackSoal soal={soalSaat} dipilih={pilihanDipilih} onLanjut={handleLanjutDariFeedback} isAkhir={isAkhir} />
          )}

          {!showFeedback && (
            <div className="flex justify-between items-center mt-8 md:mt-10">
              <button
                onClick={() => setShowModalBatal(true)}
                className="text-[10px] md:text-xs text-wr-gray dark:text-zinc-500 hover:text-wr-black dark:hover:text-white transition-colors font-mono tracking-widest uppercase flex items-center gap-1"
              >
                <XIcon size={12} /> Batal
              </button>
              <button
                onClick={handleSelanjutnya}
                disabled={pilihanDipilih === null}
                className={`flex items-center gap-1.5 md:gap-2 px-4 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-semibold tracking-widest uppercase border transition-all duration-200 ${
                  pilihanDipilih !== null
                    ? 'bg-wr-black dark:bg-white text-white dark:text-wr-black border-wr-black dark:border-white hover:bg-white dark:hover:bg-zinc-950 hover:text-wr-black dark:hover:text-white cursor-pointer'
                    : 'bg-wr-muted dark:bg-zinc-800 text-wr-gray dark:text-zinc-600 border-wr-border dark:border-zinc-700 cursor-not-allowed'
                }`}
              >
                {modeLatihan ? 'Cek Jawaban' : isAkhir ? 'Selesai' : 'Lanjut'}
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}