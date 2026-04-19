import { useState } from 'react'
import { Clock, BookOpen } from 'lucide-react'
import Badge from '../components/ui/Badge'
import SectionTitle from '../components/ui/SectionTitle'

const artikel = [
  {
    id: 1,
    judul: 'Bias Konfirmasi dan Bahayanya',
    kategori: 'Bias Kognitif',
    waktu: 8,
    level: 'Menengah',
    ringkasan:
      'Bias konfirmasi mendorong kita untuk hanya mencari informasi yang mendukung keyakinan yang sudah ada. Pelajari bagaimana ini merusak pengambilan keputusan rasional.',
  },
  {
    id: 2,
    judul: 'Teknik Chunking untuk Memori',
    kategori: 'Kognisi',
    waktu: 6,
    level: 'Dasar',
    ringkasan:
      'Chunking adalah teknik mengorganisir informasi menjadi kelompok bermakna untuk meningkatkan kapasitas memori kerja secara signifikan.',
  },
  {
    id: 3,
    judul: 'Teori Permainan dalam Kompetisi',
    kategori: 'Strategi',
    waktu: 12,
    level: 'Lanjutan',
    ringkasan:
      'Game theory memberikan kerangka matematis untuk memahami pengambilan keputusan dalam situasi di mana pilihan satu pihak mempengaruhi hasil pihak lain.',
  },
  {
    id: 4,
    judul: 'Membaca Pola Perilaku Manusia',
    kategori: 'Perilaku',
    waktu: 10,
    level: 'Menengah',
    ringkasan:
      'Setiap individu memiliki pola perilaku yang dapat diidentifikasi melalui observasi sistematis. Artikel ini mengajarkan teknik deteksi pola perilaku dasar.',
  },
  {
    id: 5,
    judul: 'Stoikisme dan Pengendalian Emosi',
    kategori: 'Psikologi',
    waktu: 9,
    level: 'Dasar',
    ringkasan:
      'Filosofi Stoik menawarkan kerangka praktis untuk memisahkan hal yang dapat dikontrol dari yang tidak, dan membangun ketahanan emosional jangka panjang.',
  },
  {
    id: 6,
    judul: 'Efek Dunning-Kruger',
    kategori: 'Bias Kognitif',
    waktu: 7,
    level: 'Menengah',
    ringkasan:
      'Individu dengan kompetensi rendah cenderung melebih-lebihkan kemampuan mereka, sementara individu ahli justru meragukan dirinya. Pahami siklus ini.',
  },
  {
    id: 7,
    judul: 'Dinamika Kelompok dan Kepemimpinan',
    kategori: 'Kepemimpinan',
    waktu: 11,
    level: 'Menengah',
    ringkasan:
      'Kelompok memiliki dinamika unik yang berbeda dari perilaku individunya. Memahami dinamika ini adalah kunci kepemimpinan yang efektif dan strategis.',
  },
  {
    id: 8,
    judul: 'Kepemimpinan Berbasis Data',
    kategori: 'Kepemimpinan',
    waktu: 14,
    level: 'Lanjutan',
    ringkasan:
      'Era modern menuntut pemimpin yang mampu membaca, menginterpretasikan, dan mengambil keputusan berdasarkan data—bukan intuisi semata.',
  },
  {
    id: 9,
    judul: 'Heuristik: Kapan Ikuti, Kapan Abaikan',
    kategori: 'Kognisi',
    waktu: 8,
    level: 'Lanjutan',
    ringkasan:
      'Heuristik adalah jalan pintas mental yang berguna dalam situasi tertentu namun berbahaya di situasi lain. Kenali kapan harus mengandalkan intuisi dan kapan tidak.',
  },
]

const semuaKategori = [
  'Semua',
  'Kognisi',
  'Psikologi',
  'Strategi',
  'Perilaku',
  'Kepemimpinan',
  'Bias Kognitif',
]

export default function Arsip() {
  const [filterAktif, setFilterAktif] = useState('Semua')

  const artikelTerfilter =
    filterAktif === 'Semua'
      ? artikel
      : artikel.filter((a) => a.kategori === filterAktif)

  return (
    <div>
      {/* HERO */}
      <section className="min-h-hero flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 border-b border-wr-border">
        <div className="max-w-7xl mx-auto w-full">
          <p className="section-label mb-4">Arsip</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-wr-black mb-4 max-w-2xl">
            Pengetahuan Sebagai Senjata
          </h1>
          <p className="text-lg text-wr-gray max-w-xl">
            Materi terstruktur untuk memperkuat fondasi intelektual.
          </p>
        </div>
      </section>

      {/* FILTER + ARTIKEL */}
      <section className="py-20">
        <div className="page-container">
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            {semuaKategori.map((kat) => (
              <button
                key={kat}
                onClick={() => setFilterAktif(kat)}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase border transition-all duration-200 ${
                  filterAktif === kat
                    ? 'bg-wr-black text-white border-wr-black'
                    : 'bg-white text-wr-gray border-wr-border hover:border-wr-black hover:text-wr-black'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>

          <SectionTitle
            label={`${artikelTerfilter.length} artikel`}
            title={
              filterAktif === 'Semua'
                ? 'Semua Materi'
                : filterAktif
            }
          />

          {/* Grid Artikel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artikelTerfilter.map((art) => (
              <article key={art.id} className="card-wr flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Badge type="kategori" value={art.kategori} />
                  <Badge type="level" value={art.level} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-wr-black mb-2 leading-snug">
                    {art.judul}
                  </h3>
                  <p className="text-sm text-wr-gray leading-relaxed">
                    {art.ringkasan}
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-wr-border pt-4 mt-auto">
                  <div className="flex items-center gap-1 text-xs font-mono text-wr-gray">
                    <Clock size={12} />
                    <span>{art.waktu} menit baca</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-wr-gray">
                    <BookOpen size={12} />
                    <span>Arsip</span>
                  </div>
                </div>

                <button className="btn-outline text-xs py-2 w-full">
                  Baca Artikel
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}