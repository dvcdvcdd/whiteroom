import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { tesData } from '../data/tesData'
import { CheckCircle, RotateCcw, ChevronRight } from 'lucide-react'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'

function getLevel(skor) {
  if (skor <= 30)
    return {
      label: 'Tidak Memenuhi Syarat',
      warna: 'text-red-700',
      bg: 'bg-red-50 border-red-200',
      pesan:
        'Kemampuan saat ini belum mencapai ambang batas minimum Whiteroom. Disarankan untuk mengulang modul pelatihan dasar sebelum evaluasi berikutnya.',
      rekomendasi: 'Modul Penguatan Dasar — Semua Kategori',
    }
  if (skor <= 50)
    return {
      label: 'Kandidat',
      warna: 'text-gray-700',
      bg: 'bg-gray-50 border-gray-200',
      pesan:
        'Kamu menunjukkan potensi awal. Dengan pelatihan yang konsisten, peningkatan signifikan dapat dicapai dalam waktu singkat.',
      rekomendasi: 'Modul Pelatihan Dasar — Level 1',
    }
  if (skor <= 70)
    return {
      label: 'Subjek',
      warna: 'text-blue-800',
      bg: 'bg-blue-50 border-blue-200',
      pesan:
        'Kemampuanmu berada di atas rata-rata. Fokus pada peningkatan konsistensi dan kecepatan respons untuk naik ke level berikutnya.',
      rekomendasi: 'Modul Menengah — Penguatan Respons',
    }
  if (skor <= 85)
    return {
      label: 'Analis',
      warna: 'text-gray-800',
      bg: 'bg-wr-surface border-wr-border',
      pesan:
        'Kemampuan analitis kamu tergolong tinggi. Whiteroom merekomendasikan sesi lanjutan untuk menyempurnakan ketajaman keputusan.',
      rekomendasi: 'Modul Lanjutan — Analisis Mendalam',
    }
  if (skor <= 95)
    return {
      label: 'Strategis',
      warna: 'text-wr-black',
      bg: 'bg-wr-muted border-wr-border',
      pesan:
        'Kemampuan strategismu sangat tinggi. Kamu berada di 10% teratas subjek Whiteroom. Terus pertahankan dan kembangkan.',
      rekomendasi: 'Modul Elite — Simulasi Skenario Nyata',
    }
  return {
    label: 'Standar Whiteroom',
    warna: 'text-white',
    bg: 'bg-wr-black border-wr-black',
    pesan:
      'Kamu mencapai standar tertinggi Whiteroom. Kemampuanmu berada di level yang hanya dicapai oleh sebagian kecil subjek.',
    rekomendasi: 'Akses Eksklusif — Program Whiteroom Elite',
  }
}

function HasilEvaluasi({ skor, total, kategori, onUlang }) {
  const persen = Math.round((skor / total) * 100)
  const level = getLevel(persen)

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-white">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <CheckCircle size={40} className="text-wr-black mx-auto mb-4" />
          <p className="section-label mb-2">Evaluasi Selesai</p>
          <h2 className="text-4xl font-black text-wr-black mb-1">
            {skor}/{total}
          </h2>
          <p className="text-wr-gray text-sm font-mono">{persen}% jawaban benar</p>
        </div>

        <div className={`border p-6 mb-6 ${level.bg}`}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono tracking-widest text-wr-gray uppercase">
              Level Dicapai
            </p>
            <span
              className={`text-sm font-black tracking-widest uppercase ${level.warna}`}
            >
              {level.label}
            </span>
          </div>
          <ProgressBar value={persen} showPercent={false} />
          <p className="text-sm text-wr-gray leading-relaxed mt-4">
            {level.pesan}
          </p>
        </div>

        <div className="border border-wr-border p-4 mb-8 bg-wr-surface">
          <p className="text-xs font-mono tracking-widest text-wr-gray uppercase mb-2">
            Rekomendasi
          </p>
          <p className="text-sm font-semibold text-wr-black">
            {level.rekomendasi}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={onUlang} className="btn-outline flex-1 flex items-center justify-center gap-2">
            <RotateCcw size={14} />
            Coba Lagi
          </button>
          <Link to="/pelatihan" className="btn-primary flex-1 text-center">
            Lihat Pelatihan
          </Link>
          <Link to="/evaluasi" className="btn-ghost flex-1 text-center">
            Kembali
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function EvaluasiTes() {
  const { kategori } = useParams()
  const data = tesData[kategori]

  const [soalIndex, setSoalIndex] = useState(0)
  const [pilihanDipilih, setPilihanDipilih] = useState(null)
  const [jawabanBenar, setJawabanBenar] = useState(0)
  const [selesai, setSelesai] = useState(false)
  const [waktu, setWaktu] = useState(data ? data.durasi : 0)

  useEffect(() => {
    if (selesai || !data) return
    const interval = setInterval(() => {
      setWaktu((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setSelesai(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [selesai, data])

  const handleUlang = () => {
    setSoalIndex(0)
    setPilihanDipilih(null)
    setJawabanBenar(0)
    setSelesai(false)
    setWaktu(data.durasi)
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-wr-gray mb-4">Kategori tes tidak ditemukan.</p>
          <Link to="/evaluasi" className="btn-primary">
            Kembali ke Evaluasi
          </Link>
        </div>
      </div>
    )
  }

  if (selesai) {
    return (
      <HasilEvaluasi
        skor={jawabanBenar}
        total={data.soal.length}
        kategori={kategori}
        onUlang={handleUlang}
      />
    )
  }

  const soalSaat = data.soal[soalIndex]
  const progres = ((soalIndex + 1) / data.soal.length) * 100
  const menit = Math.floor(waktu / 60)
  const detik = waktu % 60
  const timerStr = `${String(menit).padStart(2, '0')}:${String(detik).padStart(2, '0')}`

  const handlePilih = (idx) => {
    setPilihanDipilih(idx)
  }

  const handleSelanjutnya = () => {
    const benar = pilihanDipilih === soalSaat.jawabanBenar
    const totalBenar = benar ? jawabanBenar + 1 : jawabanBenar

    if (soalIndex + 1 >= data.soal.length) {
      setJawabanBenar(totalBenar)
      setSelesai(true)
    } else {
      setJawabanBenar(totalBenar)
      setSoalIndex(soalIndex + 1)
      setPilihanDipilih(null)
    }
  }

  const isAkhir = soalIndex + 1 >= data.soal.length

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-wr-border">
        <div className="page-container">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-wr-black">
                {data.nama}
              </span>
              <Badge type="kategori" value={kategori} />
            </div>
            <div className="flex items-center gap-6">
              <span
                className={`font-mono text-sm font-bold ${
                  waktu < 60 ? 'text-wr-red' : 'text-wr-black'
                }`}
              >
                {timerStr}
              </span>
              <span className="text-xs font-mono text-wr-gray">
                {soalIndex + 1} / {data.soal.length}
              </span>
            </div>
          </div>
        </div>
        <ProgressBar value={progres} showPercent={false} height="thin" />
      </div>

      {/* Konten soal */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          <div className="mb-8">
            <p className="text-xs font-mono text-wr-gray mb-4 tracking-widest uppercase">
              Soal {soalIndex + 1}
            </p>
            <p className="text-lg font-semibold text-wr-black leading-relaxed">
              {soalSaat.pertanyaan}
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-10">
            {soalSaat.pilihan.map((pilihan, idx) => (
              <button
                key={idx}
                onClick={() => handlePilih(idx)}
                className={`text-left px-5 py-4 border text-sm transition-all duration-150 ${
                  pilihanDipilih === idx
                    ? 'border-wr-black bg-wr-muted font-semibold text-wr-black'
                    : 'border-wr-border text-wr-gray hover:border-wr-black hover:text-wr-black bg-white'
                }`}
              >
                {pilihan}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/evaluasi"
              className="text-xs text-wr-gray hover:text-wr-black transition-colors font-mono tracking-widest uppercase"
            >
              Batalkan
            </Link>
            <button
              onClick={handleSelanjutnya}
              disabled={pilihanDipilih === null}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-widest uppercase border transition-all duration-200 ${
                pilihanDipilih !== null
                  ? 'bg-wr-black text-white border-wr-black hover:bg-white hover:text-wr-black cursor-pointer'
                  : 'bg-wr-muted text-wr-gray border-wr-border cursor-not-allowed'
              }`}
            >
              {isAkhir ? 'Selesai' : 'Selanjutnya'}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}