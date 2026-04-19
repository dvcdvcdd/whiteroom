export default function Filosofi() {
  const sections = [
    {
      nomor: '01',
      judul: 'MENGAPA WHITEROOM ADA',
      isi: 'Whiteroom lahir dari satu pertanyaan mendasar: mengapa sebagian individu mampu melampaui batasnya, sementara yang lain tidak? Jawabannya bukan pada bakat bawaan, melainkan pada sistem. Sistem evaluasi yang tepat, pelatihan yang terstruktur, dan lingkungan yang dikontrol adalah variabel penentu. Whiteroom adalah sistem tersebut. Kami percaya bahwa setiap individu memiliki kapasitas tersembunyi yang belum tereksplor—dan tugas kami adalah menciptakan kondisi di mana kapasitas itu dapat diidentifikasi, diukur, dan dikembangkan.',
    },
    {
      nomor: '02',
      judul: 'PRINSIP KEUNGGULAN',
      isi: 'Keunggulan bukan kondisi yang diwarisi, melainkan hasil dari proses berulang yang disengaja. Di Whiteroom, keunggulan didefinisikan sebagai kemampuan untuk berfungsi secara optimal di bawah kondisi apapun. Bukan hanya saat kondisi ideal, tetapi justru saat tekanan, ambiguitas, dan keterbatasan menjadi variabel dominan. Individu yang unggul adalah mereka yang tidak hanya mampu tampil baik di kondisi nyaman, tetapi yang dapat mempertahankan performa di bawah tekanan yang terus meningkat.',
    },
    {
      nomor: '03',
      judul: 'RASIONALITAS DI ATAS REAKSI',
      isi: 'Emosi adalah data, bukan instruksi. Whiteroom tidak melatih individu untuk menekan emosi, melainkan untuk memahaminya sebagai sinyal yang dapat dianalisis. Keputusan terbaik lahir dari analisis dingin, bukan dari impuls reaktif. Individu yang mampu membedakan keduanya memiliki keunggulan signifikan dalam setiap situasi kompetitif. Rasionalitas bukan berarti ketidakpedulian—melainkan kemampuan untuk memproses informasi emosional tanpa membiarkannya mendominasi proses pengambilan keputusan.',
    },
    {
      nomor: '04',
      judul: 'ADAPTASI ATAU TERTINGGAL',
      isi: 'Kondisi selalu berubah. Strategi yang berhasil kemarin belum tentu relevan hari ini. Kemampuan adaptasi bukan sekadar fleksibilitas, melainkan kapasitas untuk membaca perubahan lebih awal dari yang lain, merespons lebih cepat, dan menemukan keuntungan dalam ketidakpastian. Itulah yang dilatih di Whiteroom. Mereka yang stagnan dalam pola pikir lama akan selalu berada di belakang mereka yang terus memperbarui model mental mereka berdasarkan informasi baru.',
    },
    {
      nomor: '05',
      judul: 'DISIPLIN SEBAGAI FONDASI',
      isi: 'Tanpa disiplin, semua strategi hanya teori. Whiteroom percaya bahwa konsistensi dalam hal-hal kecil adalah cerminan kemampuan dalam hal-hal besar. Setiap sesi latihan, setiap misi yang diselesaikan, setiap evaluasi yang dihadapi dengan jujur adalah batu bata yang membangun fondasi keunggulan. Disiplin bukan hukuman—melainkan bentuk penghormatan tertinggi terhadap potensi diri sendiri. Mereka yang disiplin dalam proses kecil adalah mereka yang siap untuk tantangan besar.',
    },
  ]

  return (
    <div>
      {/* HERO */}
      <section className="min-h-hero flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 border-b border-wr-border">
        <div className="max-w-7xl mx-auto w-full">
          <p className="section-label mb-4">Filosofi</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-wr-black mb-4 max-w-2xl">
            Dasar Pemikiran Whiteroom
          </h1>
          <p className="text-lg text-wr-gray max-w-xl">
            Setiap individu memiliki batas. Batas itu dapat digeser.
          </p>
        </div>
      </section>

      {/* KONTEN ARTIKEL */}
      <section className="py-20">
        <div className="page-container">
          <div className="max-w-3xl mx-auto flex flex-col divide-y divide-wr-border">
            {sections.map((s) => (
              <div key={s.nomor} className="py-12">
                <div className="flex items-start gap-6">
                  <span className="font-mono text-3xl font-bold text-gray-100 min-w-[3rem]">
                    {s.nomor}
                  </span>
                  <div>
                    <h2 className="text-sm font-mono font-bold tracking-widest text-wr-gray uppercase mb-4">
                      {s.judul}
                    </h2>
                    <p className="text-base text-wr-black leading-relaxed">
                      {s.isi}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE PENUTUP */}
      <section className="py-20 bg-wr-surface">
        <div className="page-container">
          <div className="max-w-3xl mx-auto">
            <blockquote className="border-l-4 border-wr-black pl-8 py-4">
              <p className="text-2xl md:text-3xl font-bold italic text-wr-black leading-relaxed mb-4">
                &ldquo;Individu yang tidak berkembang adalah individu yang
                memilih untuk mundur.&rdquo;
              </p>
              <cite className="text-sm font-mono text-wr-gray tracking-widest uppercase not-italic">
                — Whiteroom
              </cite>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  )
}