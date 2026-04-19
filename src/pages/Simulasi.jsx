import { useState } from 'react'
import { Play, AlertTriangle } from 'lucide-react'
import Badge from '../components/ui/Badge'
import SectionTitle from '../components/ui/SectionTitle'

const skenario = [
  {
    id: 'SIM-001',
    judul: 'Infiltrasi Informasi',
    kategori: 'Sosial',
    kesulitan: 'Menengah',
    deskripsi:
      'Kamu bergabung dalam tim beranggotakan 5 orang. Satu anggota diketahui menyebarkan informasi palsu kepada kelompok lain. Identifikasi pelaku tanpa melakukan konfrontasi langsung.',
    waktu: '20 menit',
    tersedia: true,
  },
  {
    id: 'SIM-002',
    judul: 'Kepemimpinan Dalam Krisis',
    kategori: 'Taktis',
    kesulitan: 'Lanjutan',
    deskripsi:
      'Proyek timmu mengalami kegagalan di tengah pelaksanaan. Dua anggota ingin mundur, satu ingin mengambil alih kepemimpinan. Kamu adalah pemimpin saat ini. Bagaimana strategimu?',
    waktu: '30 menit',
    tersedia: true,
  },
  {
    id: 'SIM-003',
    judul: 'Negosiasi Terbatas',
    kategori: 'Taktis',
    kesulitan: 'Menengah',
    deskripsi:
      'Kamu memiliki sumber daya terbatas. Dua pihak yang berbeda memintamu untuk memilih salah satu. Memilih satu berarti kehilangan yang lain. Tentukan strategi terbaikmu.',
    waktu: '25 menit',
    tersedia: true,
  },
  {
    id: 'SIM-004',
    judul: 'Deteksi Anomali',
    kategori: 'Analitis',
    kesulitan: 'Lanjutan',
    deskripsi:
      'Dari sekumpulan data perilaku anggota tim, terdapat satu pola yang menyimpang dari norma kelompok. Identifikasi anomali tersebut sebelum berdampak pada performa keseluruhan tim.',
    waktu: '35 menit',
    tersedia: true,
  },
  {
    id: 'SIM-005',
    judul: 'Aliansi Strategis',
    kategori: 'Sosial',
    kesulitan: 'Menengah',
    deskripsi:
      'Kamu perlu membangun aliansi dalam situasi di mana setiap pihak memiliki agenda tersembunyi. Siapa yang harus kamu dekati pertama kali?',
    waktu: '20 menit',
    tersedia: true,
  },
  {
    id: 'SIM-006',
    judul: 'Tekanan Optimal',
    kategori: 'Analitis',
    kesulitan: 'Elite',
    deskripsi:
      'Di bawah tekanan waktu ekstrem dan informasi yang tidak lengkap, kamu harus membuat keputusan yang mempengaruhi seluruh kelompok. Setiap detik memiliki nilai.',
    waktu: '15 menit',
    tersedia: false,
  },
]

const kesulitanColor = {
  Dasar: 'text-green-700',
  Menengah: 'text-yellow-700',
  Lanjutan: 'text-orange-700',
  Elite: 'text-wr-red',
}

export default function Simulasi() {
  const [dipilih, setDipilih] = useState(null)

  return (
    <div>
      {/* HERO */}
      <section className="min-h-hero flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 border-b border-wr-border">
        <div className="max-w-7xl mx-auto w-full">
          <p className="section-label mb-4">Simulasi</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-wr-black mb-4 max-w-2xl">
            Uji Kemampuan Dalam Skenario Nyata
          </h1>
          <p className="text-lg text-wr-gray max-w-xl mb-4">
            Setiap keputusan memiliki konsekuensi.
          </p>
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 p-4 max-w-xl">
            <AlertTriangle
              size={16}
              className="text-amber-600 flex-shrink-0 mt-0.5"
            />
            <p className="text-xs text-amber-800 leading-relaxed">
              Pilihan yang kamu ambil akan dianalisis dan mempengaruhi skor
              strategimu secara keseluruhan.
            </p>
          </div>
        </div>
      </section>

      {/* SKENARIO */}
      <section className="py-20">
        <div className="page-container">
          <SectionTitle
            label="Skenario Tersedia"
            title="Pilih Simulasi"
            subtitle="Setiap skenario dirancang berdasarkan situasi nyata dengan variabel dan konsekuensi yang terukur."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skenario.map((s) => (
              <div
                key={s.id}
                className={`card-wr flex flex-col gap-4 ${
                  !s.tersedia ? 'opacity-50' : ''
                } ${dipilih === s.id ? 'border-wr-black' : ''}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <span className="text-xs font-mono text-wr-gray tracking-widest">
                    {s.id}
                  </span>
                  <Badge type="kategori" value={s.kategori} />
                </div>

                {/* Judul */}
                <h3 className="text-base font-bold text-wr-black">
                  {s.judul}
                </h3>

                {/* Kesulitan */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-wr-gray">
                    Kesulitan:
                  </span>
                  <span
                    className={`text-xs font-mono font-bold uppercase tracking-widest ${
                      kesulitanColor[s.kesulitan] || 'text-wr-gray'
                    }`}
                  >
                    {s.kesulitan}
                  </span>
                </div>

                {/* Deskripsi */}
                <p className="text-sm text-wr-gray leading-relaxed">
                  {s.deskripsi}
                </p>

                {/* Waktu */}
                <p className="text-xs font-mono text-wr-gray border-t border-wr-border pt-3">
                  Estimasi: {s.waktu}
                </p>

                {/* CTA */}
                <button
                  disabled={!s.tersedia}
                  onClick={() => s.tersedia && setDipilih(s.id)}
                  className={`flex items-center justify-center gap-2 text-xs py-3 w-full font-semibold tracking-widest uppercase border transition-all duration-200 ${
                    !s.tersedia
                      ? 'bg-wr-muted text-wr-gray border-wr-border cursor-not-allowed'
                      : dipilih === s.id
                      ? 'bg-wr-black text-white border-wr-black'
                      : 'btn-outline'
                  }`}
                >
                  <Play size={12} />
                  {!s.tersedia
                    ? 'Terkunci'
                    : dipilih === s.id
                    ? 'Dipilih'
                    : 'Mulai Simulasi'}
                </button>
              </div>
            ))}
          </div>

          {/* Panel konfirmasi */}
          {dipilih && (
            <div className="mt-10 border border-wr-black p-6 bg-wr-surface max-w-xl">
              <p className="text-xs font-mono tracking-widest text-wr-gray uppercase mb-2">
                Skenario Dipilih
              </p>
              <p className="text-lg font-bold text-wr-black mb-2">
                {skenario.find((s) => s.id === dipilih)?.judul}
              </p>
              <p className="text-sm text-wr-gray mb-4">
                Sistem akan mencatat dan menganalisis setiap keputusan yang kamu
                buat dalam simulasi ini.
              </p>
              <div className="flex gap-3">
                <button className="btn-primary text-xs py-3 flex-1">
                  Konfirmasi & Mulai
                </button>
                <button
                  onClick={() => setDipilih(null)}
                  className="btn-ghost text-xs py-3"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}