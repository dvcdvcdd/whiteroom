import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import tesData from '../data/tesData'
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  ChevronRight,
  AlertTriangle,
  Clock,
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
    // Buat array index: [0, 1, 2, 3]
    const indexAsli = soal.pilihan.map((_, i) => i)
    // Acak index
    const indexAcak = acakArray(indexAsli)
    // Susun pilihan baru berdasarkan index acak
    const pilihanBaru = indexAcak.map((i) => soal.pilihan[i])
    // Cari posisi baru jawaban benar
    const jawabanBenrBaru = indexAcak.indexOf(soal.jawabanBenar)

    return {
      ...soal,
      pilihan: pilihanBaru,
      jawabanBenar: jawabanBenrBaru,
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
      kategori,
      nama,
      skor,
      total,
      persen,
      tanggal: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    })
    localStorage.setItem(kunci, JSON.stringify(riwayat.slice(0, 20)))
  } catch {
    // localStorage tidak tersedia
  }
}

function getLevel(persen) {
  if (persen <= 30)
    return {
      label: 'Rendah',
      warna: 'text-red-700',
      bg: 'bg-red-50 border-red-200',
      pesan: 'Kemampuanmu di kategori ini masih perlu banyak latihan. Perhatikan penjelasan tiap soal dan coba lagi.',
    }
  if (persen <= 50)
    return {
      label: 'Cukup',
      warna: 'text-yellow-700',
      bg: 'bg-yellow-50 border-yellow-200',
      pesan: 'Ada potensi yang bisa dikembangkan. Pelajari soal yang salah dan ulangi tes ini.',
    }
  if (persen <= 70)
    return {
      label: 'Baik',
      warna: 'text-blue-700',
      bg: 'bg-blue-50 border-blue-200',
      pesan: 'Kemampuanmu di atas rata-rata. Latih konsistensi untuk mencapai level berikutnya.',
    }
  if (persen <= 85)
    return {
      label: 'Sangat Baik',
      warna: 'text-green-700',
      bg: 'bg-green-50 border-green-200',
      pesan: 'Kamu menunjukkan kemampuan yang kuat. Pertahankan dan terus asah.',
    }
  return {
    label: 'Luar Biasa',
    warna: 'text-wr-black',
    bg: 'bg-wr-muted border-wr-black',
    pesan: 'Pencapaian luar biasa. Kamu berada di level tertinggi kategori ini.',
  }
}

// ─── Komponen Hasil ───────────────────────────────────────
function HasilEvaluasi({ skor, total, soalDikerjakan, onUlang }) {
  const persen = Math.round((skor / total) * 100)
  const level = getLevel(persen)
  const [lihatReview, setLihatReview] = useState(false)

  return (
    <div className="px-4 sm:px-6 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        {/* Skor utama */}
        <div className="text-center mb-6 md:mb-8">
          <CheckCircle size={36} className="text-wr-black mx-auto mb-3 md:mb-4" />
          <p className="section-label mb-2">Tes Selesai</p>
          <p className="text-5xl md:text-6xl font-black font-mono text-wr-black mb-1">
            {skor}
            <span className="text-xl md:text-2xl text-wr-gray font-mono">/{total}</span>
          </p>
          <p className="text-xs md:text-sm font-mono text-wr-gray">{persen}% jawaban benar</p>
        </div>

        {/* Level */}
        <div className={`border p-4 md:p-6 mb-4 ${level.bg}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono tracking-widest text-wr-gray uppercase">Hasil</span>
            <span className={`text-xs md:text-sm font-black tracking-widest uppercase ${level.warna}`}>
              {level.label}
            </span>
          </div>
          <ProgressBar value={persen} showPercent={false} />
          <p className="text-xs md:text-sm text-wr-gray leading-relaxed mt-3 md:mt-4">{level.pesan}</p>
        </div>

        {/* Ringkasan */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6">
          <div className="border border-wr-border p-3 md:p-4 text-center bg-white">
            <p className="text-xl md:text-2xl font-black font-mono text-green-600">{skor}</p>
            <p className="text-[10px] md:text-xs font-mono text-wr-gray uppercase tracking-widest mt-1">Benar</p>
          </div>
          <div className="border border-wr-border p-3 md:p-4 text-center bg-white">
            <p className="text-xl md:text-2xl font-black font-mono text-red-600">{total - skor}</p>
            <p className="text-[10px] md:text-xs font-mono text-wr-gray uppercase tracking-widest mt-1">Salah</p>
          </div>
          <div className="border border-wr-border p-3 md:p-4 text-center bg-white">
            <p className="text-xl md:text-2xl font-black font-mono text-wr-black">{persen}%</p>
            <p className="text-[10px] md:text-xs font-mono text-wr-gray uppercase tracking-widest mt-1">Skor</p>
          </div>
        </div>

        {/* Review toggle */}
        <button onClick={() => setLihatReview(!lihatReview)} className="w-full btn-outline mb-6 text-xs md:text-sm">
          {lihatReview ? 'Sembunyikan Review' : 'Lihat Review Jawaban'}
        </button>

        {/* Review per soal */}
        {lihatReview && (
          <div className="flex flex-col gap-3 md:gap-4 mb-8">
            <p className="text-xs font-mono tracking-widest text-wr-gray uppercase">
              Review Jawaban
            </p>
            {soalDikerjakan.map((item, i) => {
              const benar = item.dipilih === item.jawabanBenar
              return (
                <div
                  key={item.id}
                  className={`border p-4 md:p-5 ${
                    benar ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-2 md:gap-3">
                    {benar ? (
                      <CheckCircle size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={14} className="text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] md:text-xs font-mono text-wr-gray uppercase tracking-widest mb-1.5 md:mb-2">
                        Soal {i + 1}
                      </p>
                      <p className="text-xs md:text-sm font-semibold text-wr-black leading-relaxed mb-2 md:mb-3 whitespace-pre-line break-words">
                        {item.pertanyaan}
                      </p>

                      {/* Jawaban yang dipilih */}
                      <div className={`text-[10px] md:text-xs px-2 md:px-3 py-1.5 md:py-2 mb-2 font-mono break-words ${
                        benar ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        <span className="font-bold uppercase tracking-widest">
                          {benar ? 'Benar:' : 'Salah:'}
                        </span>{' '}
                        {item.dipilih !== null ? item.pilihan[item.dipilih] : 'Tidak dijawab'}
                      </div>

                      {/* Jawaban benar (tampilkan dari pilihan asli) */}
                      {!benar && (
                        <div className="text-[10px] md:text-xs px-2 md:px-3 py-1.5 md:py-2 mb-2 font-mono bg-green-100 text-green-800 break-words">
                          <span className="font-bold uppercase tracking-widest">Jawaban Benar:</span>{' '}
                          {item.pilihanAsli
                            ? item.pilihanAsli[item.jawabanBenarAsli]
                            : item.pilihan[item.jawabanBenar]}
                        </div>
                      )}

                      {/* Penjelasan */}
                      {item.penjelasan && (
                        <div className="text-[10px] md:text-xs px-2 md:px-3 py-1.5 md:py-2 bg-white border border-wr-border text-wr-gray leading-relaxed break-words">
                          <span className="font-bold font-mono uppercase tracking-widest text-wr-black">
                            Penjelasan:{' '}
                          </span>
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
      <div className="bg-white border border-wr-border p-6 md:p-8 max-w-sm w-full mx-4">
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <AlertTriangle size={18} className="text-wr-red flex-shrink-0" />
          <h3 className="text-sm md:text-base font-bold text-wr-black">Batalkan Tes?</h3>
        </div>
        <p className="text-xs md:text-sm text-wr-gray leading-relaxed mb-5 md:mb-6">
          Semua progres tes ini akan hilang dan tidak disimpan. Yakin ingin keluar?
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button onClick={onLanjut} className="btn-primary flex-1 text-xs md:text-sm py-2.5">
            Ya, Batalkan
          </button>
          <button onClick={onBatal} className="btn-outline flex-1 text-xs md:text-sm py-2.5">
            Lanjutkan Tes
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Halaman Utama ────────────────────────────────────────
export default function EvaluasiTes() {
  const { kategori } = useParams()
  const navigate = useNavigate()
  const data = tesData[kategori]

  const [soalAcak, setSoalAcak] = useState([])
  const [soalIndex, setSoalIndex] = useState(0)
  const [pilihanDipilih, setPilihanDipilih] = useState(null)
  const [riwayatJawaban, setRiwayatJawaban] = useState([])
  const [selesai, setSelesai] = useState(false)
  const [waktu, setWaktu] = useState(0)
  const [showModalBatal, setShowModalBatal] = useState(false)
  const sudahSimpanRef = useRef(false)

  // Inisialisasi: acak soal DAN pilihan jawaban
  useEffect(() => {
    if (!data) return
    setSoalAcak(acakSoalDanPilihan(data.soal))
    setWaktu(data.durasi)
  }, [data, kategori])

  // Timer countdown
  useEffect(() => {
    if (selesai || soalAcak.length === 0) return
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
  }, [selesai, soalAcak])

  // Simpan skor saat selesai
  useEffect(() => {
    if (!selesai || sudahSimpanRef.current || soalAcak.length === 0) return
    sudahSimpanRef.current = true
    const skor = riwayatJawaban.filter((r) => r.dipilih === r.jawabanBenar).length
    const total = soalAcak.length
    const persen = Math.round((skor / total) * 100)
    simpanRiwayat(kategori, data.nama, skor, total, persen)
  }, [selesai, riwayatJawaban, soalAcak, kategori, data])

  // Ulang: acak ulang soal DAN pilihan
  const handleUlang = useCallback(() => {
    setSoalAcak(acakSoalDanPilihan(data.soal))
    setSoalIndex(0)
    setPilihanDipilih(null)
    setRiwayatJawaban([])
    setSelesai(false)
    setWaktu(data.durasi)
    sudahSimpanRef.current = false
  }, [data])

  // Kategori tidak ditemukan
  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-wr-gray mb-4 text-sm">Kategori tes tidak ditemukan.</p>
          <Link to="/evaluasi" className="btn-primary text-xs">Kembali ke Evaluasi</Link>
        </div>
      </div>
    )
  }

  // Tampilkan hasil
  if (selesai && soalAcak.length > 0) {
    const skor = riwayatJawaban.filter((r) => r.dipilih === r.jawabanBenar).length
    return (
      <HasilEvaluasi
        skor={skor}
        total={soalAcak.length}
        soalDikerjakan={riwayatJawaban}
        onUlang={handleUlang}
      />
    )
  }

  // Loading
  if (soalAcak.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-wr-gray text-sm font-mono">Memuat soal...</p>
      </div>
    )
  }

  const soalSaat = soalAcak[soalIndex]
  const progres = ((soalIndex + 1) / soalAcak.length) * 100
  const menit = Math.floor(waktu / 60)
  const detik = waktu % 60
  const timerStr = `${String(menit).padStart(2, '0')}:${String(detik).padStart(2, '0')}`
  const isAkhir = soalIndex + 1 >= soalAcak.length
  const hampirHabis = waktu <= 60 && waktu > 0
  const sangatMendekat = waktu <= 10 && waktu > 0

  const handlePilih = (idx) => setPilihanDipilih(idx)

  const handleSelanjutnya = () => {
    if (pilihanDipilih === null) return
    const entri = { ...soalSaat, dipilih: pilihanDipilih }
    const riwayatBaru = [...riwayatJawaban, entri]
    setRiwayatJawaban(riwayatBaru)

    if (isAkhir) {
      setSelesai(true)
    } else {
      setSoalIndex(soalIndex + 1)
      setPilihanDipilih(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {showModalBatal && (
        <ModalKonfirmasi
          onLanjut={() => navigate('/evaluasi')}
          onBatal={() => setShowModalBatal(false)}
        />
      )}

      {/* Header bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-wr-border">
        {hampirHabis && (
          <div className={`flex items-center justify-center gap-2 py-1.5 md:py-2 text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase ${
            sangatMendekat
              ? 'bg-red-600 text-white'
              : 'bg-amber-50 text-amber-800 border-b border-amber-200'
          }`}>
            <Clock size={10} />
            <span className="truncate">
              {sangatMendekat
                ? `WAKTU HAMPIR HABIS — ${timerStr}`
                : `Sisa kurang dari 1 menit — ${timerStr}`}
            </span>
          </div>
        )}

        <div className="page-container">
          <div className="flex items-center justify-between h-10 md:h-12">
            <span className="text-xs md:text-sm font-bold text-wr-black truncate mr-4">
              {data.nama}
            </span>
            <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
              <span className={`font-mono text-xs md:text-sm font-bold ${
                sangatMendekat
                  ? 'text-red-600 animate-pulse'
                  : hampirHabis
                  ? 'text-amber-600'
                  : 'text-wr-black'
              }`}>
                {timerStr}
              </span>
              <span className="text-[10px] md:text-xs font-mono text-wr-gray">
                {soalIndex + 1}/{soalAcak.length}
              </span>
            </div>
          </div>
        </div>
        <ProgressBar value={progres} showPercent={false} height="thin" />
      </div>

      {/* Soal */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 md:py-12">
        <div className="max-w-2xl w-full">
          <p className="text-[10px] md:text-xs font-mono text-wr-gray mb-3 md:mb-4 tracking-widest uppercase">
            Soal {soalIndex + 1} dari {soalAcak.length}
          </p>
          <p className="text-base md:text-lg font-semibold text-wr-black leading-relaxed mb-6 md:mb-8 whitespace-pre-line">
            {soalSaat.pertanyaan}
          </p>

          {/* Pilihan jawaban (sudah teracak) */}
          <div className="flex flex-col gap-2 md:gap-3 mb-8 md:mb-10">
            {soalSaat.pilihan.map((pilihan, idx) => (
              <button
                key={idx}
                onClick={() => handlePilih(idx)}
                className={`text-left px-4 py-3 md:px-5 md:py-4 border text-xs md:text-sm transition-all duration-150 ${
                  pilihanDipilih === idx
                    ? 'border-wr-black bg-wr-muted font-semibold text-wr-black'
                    : 'border-wr-border text-wr-gray hover:border-wr-black hover:text-wr-black bg-white'
                }`}
              >
                {pilihan}
              </button>
            ))}
          </div>

          {/* Navigasi */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowModalBatal(true)}
              className="text-[10px] md:text-xs text-wr-gray hover:text-wr-black transition-colors font-mono tracking-widest uppercase flex items-center gap-1"
            >
              <XIcon size={12} />
              Batal
            </button>

            <button
              onClick={handleSelanjutnya}
              disabled={pilihanDipilih === null}
              className={`flex items-center gap-1.5 md:gap-2 px-4 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-semibold tracking-widest uppercase border transition-all duration-200 ${
                pilihanDipilih !== null
                  ? 'bg-wr-black text-white border-wr-black hover:bg-white hover:text-wr-black cursor-pointer'
                  : 'bg-wr-muted text-wr-gray border-wr-border cursor-not-allowed'
              }`}
            >
              {isAkhir ? 'Selesai' : 'Lanjut'}
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}