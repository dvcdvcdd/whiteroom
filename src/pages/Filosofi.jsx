export default function Filosofi() {
  const sections = [
    { nomor: '01', judul: 'MENGAPA WHITEROOM ADA', isi: 'Whiteroom lahir dari satu pertanyaan: mengapa sebagian individu mampu berpikir lebih tajam dari yang lain? Jawabannya bukan bakat bawaan — melainkan latihan yang konsisten dan terstruktur. Whiteroom menyediakan latihan itu.' },
    { nomor: '02', judul: 'PRINSIP KEUNGGULAN', isi: 'Keunggulan berpikir bukan kondisi bawaan, melainkan hasil dari proses berulang yang disengaja. Otak yang terlatih memproses informasi lebih cepat, mengenali pola lebih tajam, dan membuat keputusan lebih tepat.' },
    { nomor: '03', judul: 'RASIONALITAS DI ATAS REAKSI', isi: 'Emosi adalah data, bukan instruksi. Keputusan terbaik lahir dari analisis, bukan impuls. Whiteroom melatih kemampuan membedakan keduanya melalui tes kontrol emosi.' },
    { nomor: '04', judul: 'LATIHAN ADALAH KUNCI', isi: 'Tidak ada jalan pintas untuk otak yang tajam. Seperti otot yang perlu dilatih, kemampuan kognitif membutuhkan stimulus berulang. Setiap tes yang dikerjakan adalah satu langkah menuju pemikiran yang lebih jernih.' },
    { nomor: '05', judul: 'UKUR, BUKAN TEBAK', isi: 'Tanpa pengukuran, tidak ada perbaikan. Whiteroom menampilkan skor langsung setelah tes selesai — bukan untuk menghakimi, tapi untuk menunjukkan titik pijak dan arah perkembangan.' },
  ]

  return (
    <div>
      {/* HERO */}
      <section className="min-h-[25vh] md:min-h-[30vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-20 border-b border-wr-border dark:border-zinc-800">
        <div className="max-w-7xl mx-auto w-full">
          <p className="section-label mb-3 md:mb-4">Filosofi</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-wr-black dark:text-white mb-3 md:mb-4 max-w-2xl">
            Dasar Pemikiran
          </h1>
          <p className="text-base md:text-lg text-wr-gray dark:text-zinc-400 max-w-xl">
            Kemampuan berpikir bisa dilatih. Whiteroom menyediakan alatnya.
          </p>
        </div>
      </section>

      {/* KONTEN */}
      <section className="py-16 md:py-20">
        <div className="page-container">
          <div className="max-w-3xl mx-auto flex flex-col divide-y divide-wr-border dark:divide-zinc-800">
            {sections.map((s) => (
              <div key={s.nomor} className="py-8 md:py-12">
                <div className="flex items-start gap-4 md:gap-6">
                  <span className="font-mono text-2xl md:text-3xl font-bold text-gray-100 dark:text-zinc-800 min-w-[2rem] md:min-w-[3rem]">
                    {s.nomor}
                  </span>
                  <div>
                    <h2 className="text-xs md:text-sm font-mono font-bold tracking-widest text-wr-gray dark:text-zinc-500 uppercase mb-3 md:mb-4">
                      {s.judul}
                    </h2>
                    <p className="text-sm md:text-base text-wr-black dark:text-zinc-300 leading-relaxed">{s.isi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-12 md:py-16 bg-wr-surface dark:bg-zinc-900">
        <div className="page-container">
          <div className="max-w-3xl mx-auto">
            <blockquote className="border-l-4 border-wr-black dark:border-white pl-6 md:pl-8 py-4">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold italic text-wr-black dark:text-white leading-relaxed mb-3 md:mb-4">
                &ldquo;Otak yang tidak dilatih adalah potensi yang terbuang.&rdquo;
              </p>
              <cite className="text-xs md:text-sm font-mono text-wr-gray dark:text-zinc-500 tracking-widest uppercase not-italic">
                — Whiteroom
              </cite>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  )
}