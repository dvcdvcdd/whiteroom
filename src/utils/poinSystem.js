// ─── Definisi Kelas ───────────────────────────────────────
const KELAS = [
  { id: 'D', nama: 'Kelas D — Kandidat', min: 0, warna: 'text-zinc-500 dark:text-zinc-400', bg: 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700' },
  { id: 'C', nama: 'Kelas C — Subjek', min: 500, warna: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-800' },
  { id: 'B', nama: 'Kelas B — Analis', min: 1500, warna: 'text-purple-700 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-800' },
  { id: 'A', nama: 'Kelas A — Strategis', min: 3500, warna: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-800' },
  { id: 'W', nama: 'Whiteroom Elite', min: 7000, warna: 'text-wr-black dark:text-white', bg: 'bg-wr-black dark:bg-white text-white dark:text-wr-black border-wr-black dark:border-white' },
]

// ─── Hitung Poin dari Hasil Tes ───────────────────────────
export function hitungPoin(persen, mode) {
  if (mode === 'latihan') return 0

  let poin = 0

  // Base poin
  if (persen >= 90) poin = 150
  else if (persen >= 70) poin = 100
  else if (persen >= 50) poin = 60
  else if (persen >= 30) poin = 30
  else poin = 10

  // Bonus skor sempurna
  if (persen === 100) poin += 50

  return poin
}

// ─── Ambil Data Poin dari localStorage ────────────────────
export function ambilDataPoin() {
  try {
    const data = JSON.parse(localStorage.getItem('wr_poin') || '{}')
    return {
      totalPoin: data.totalPoin || 0,
      totalTes: data.totalTes || 0,
      streak: data.streak || 0,
      lastActive: data.lastActive || null,
      badges: data.badges || [],
    }
  } catch {
    return { totalPoin: 0, totalTes: 0, streak: 0, lastActive: null, badges: [] }
  }
}

// ─── Simpan Poin ──────────────────────────────────────────
export function simpanPoin(poinBaru) {
  try {
    const data = ambilDataPoin()
    const hari = new Date().toDateString()

    // Hitung streak
    let streak = data.streak
    if (data.lastActive) {
      const kemarin = new Date()
      kemarin.setDate(kemarin.getDate() - 1)
      if (data.lastActive === kemarin.toDateString()) {
        streak += 1
      } else if (data.lastActive !== hari) {
        streak = 1
      }
    } else {
      streak = 1
    }

    // Streak bonus
    let streakMultiplier = 1
    if (streak >= 30) streakMultiplier = 2.0
    else if (streak >= 14) streakMultiplier = 1.5
    else if (streak >= 7) streakMultiplier = 1.3
    else if (streak >= 3) streakMultiplier = 1.1

    const poinFinal = Math.round(poinBaru * streakMultiplier)

    const updated = {
      totalPoin: data.totalPoin + poinFinal,
      totalTes: data.totalTes + 1,
      streak,
      lastActive: hari,
      badges: data.badges,
    }

    // Cek badges baru
    updated.badges = cekBadges(updated)

    localStorage.setItem('wr_poin', JSON.stringify(updated))

    return {
      poinDapat: poinFinal,
      poinBase: poinBaru,
      streakMultiplier,
      streak,
      kelasSebelum: getKelas(data.totalPoin),
      kelasSesudah: getKelas(updated.totalPoin),
      naikKelas: getKelas(data.totalPoin).id !== getKelas(updated.totalPoin).id,
      ...updated,
    }
  } catch {
    return null
  }
}

// ─── Ambil Kelas Berdasarkan Poin ─────────────────────────
export function getKelas(poin) {
  let kelas = KELAS[0]
  for (const k of KELAS) {
    if (poin >= k.min) kelas = k
  }
  return kelas
}

// ─── Ambil Kelas Berikutnya ───────────────────────────────
export function getKelasBerikutnya(poin) {
  for (const k of KELAS) {
    if (poin < k.min) return k
  }
  return null
}

// ─── Progres ke Kelas Berikutnya ──────────────────────────
export function getProgresKelas(poin) {
  const sekarang = getKelas(poin)
  const berikutnya = getKelasBerikutnya(poin)

  if (!berikutnya) return { persen: 100, sisa: 0 }

  const range = berikutnya.min - sekarang.min
  const progress = poin - sekarang.min
  const persen = Math.min(100, Math.round((progress / range) * 100))

  return {
    persen,
    sisa: berikutnya.min - poin,
  }
}

// ─── Daftar Semua Kelas ───────────────────────────────────
export function semuaKelas() {
  return KELAS
}

// ─── Cek Badges ───────────────────────────────────────────
function cekBadges(data) {
  const badges = [...(data.badges || [])]
  const riwayat = ambilRiwayatUntukBadge()

  const tambah = (id) => {
    if (!badges.includes(id)) badges.push(id)
  }

  // Tes pertama
  if (data.totalTes >= 1) tambah('pertama')

  // Streak
  if (data.streak >= 3) tambah('streak3')
  if (data.streak >= 7) tambah('streak7')
  if (data.streak >= 30) tambah('streak30')

  // Total tes
  if (data.totalTes >= 10) tambah('rajin10')
  if (data.totalTes >= 50) tambah('rajin50')

  // Kelas
  const kelas = getKelas(data.totalPoin)
  if (kelas.id === 'C') tambah('kelasC')
  if (kelas.id === 'B') tambah('kelasB')
  if (kelas.id === 'A') tambah('kelasA')
  if (kelas.id === 'W') tambah('kelasW')

  // Skor per kategori
  const kategoriBagus = {}
  riwayat.forEach((r) => {
    if (r.persen >= 90) {
      kategoriBagus[r.kategori] = true
    }
    if (r.persen === 100) {
      tambah('sempurna')
    }
  })

  if (kategoriBagus['logika']) tambah('logika90')
  if (kategoriBagus['memori']) tambah('memori90')
  if (kategoriBagus['observasi']) tambah('observasi90')
  if (kategoriBagus['strategi']) tambah('strategi90')
  if (kategoriBagus['emosi']) tambah('emosi90')

  // Semua kategori 90%+
  if (kategoriBagus['logika'] && kategoriBagus['memori'] && kategoriBagus['observasi'] && kategoriBagus['strategi'] && kategoriBagus['emosi']) {
    tambah('master')
  }

  return badges
}

function ambilRiwayatUntukBadge() {
  try {
    return JSON.parse(localStorage.getItem('wr_riwayat') || '[]')
  } catch {
    return []
  }
}

// ─── Definisi Badge ───────────────────────────────────────
export const BADGE_LIST = [
  { id: 'pertama', nama: 'Langkah Pertama', icon: '🏅', desc: 'Selesaikan tes pertamamu' },
  { id: 'streak3', nama: 'Konsisten', icon: '🔥', desc: 'Streak 3 hari berturut-turut' },
  { id: 'streak7', nama: 'Disiplin', icon: '🔥', desc: 'Streak 7 hari berturut-turut' },
  { id: 'streak30', nama: 'Tak Terbendung', icon: '💎', desc: 'Streak 30 hari berturut-turut' },
  { id: 'rajin10', nama: 'Rajin Berlatih', icon: '📝', desc: 'Selesaikan 10 tes' },
  { id: 'rajin50', nama: 'Veteran', icon: '⚔️', desc: 'Selesaikan 50 tes' },
  { id: 'logika90', nama: 'Otak Tajam', icon: '🧠', desc: 'Skor 90%+ di Logika' },
  { id: 'memori90', nama: 'Memori Fotografis', icon: '📸', desc: 'Skor 90%+ di Memori' },
  { id: 'observasi90', nama: 'Mata Elang', icon: '👁️', desc: 'Skor 90%+ di Observasi' },
  { id: 'strategi90', nama: 'Ahli Strategi', icon: '🎯', desc: 'Skor 90%+ di Strategi' },
  { id: 'emosi90', nama: 'Ketenangan Baja', icon: '🧊', desc: 'Skor 90%+ di Kontrol Emosi' },
  { id: 'sempurna', nama: 'Sempurna', icon: '🏆', desc: 'Raih skor 100% di tes manapun' },
  { id: 'kelasC', nama: 'Naik Kelas C', icon: '📊', desc: 'Capai Kelas C — Subjek' },
  { id: 'kelasB', nama: 'Naik Kelas B', icon: '🎯', desc: 'Capai Kelas B — Analis' },
  { id: 'kelasA', nama: 'Naik Kelas A', icon: '⚔️', desc: 'Capai Kelas A — Strategis' },
  { id: 'kelasW', nama: 'Whiteroom Elite', icon: '👑', desc: 'Capai level Whiteroom Elite' },
  { id: 'master', nama: 'Master', icon: '🌟', desc: 'Skor 90%+ di SEMUA kategori' },
]

// ─── Reset Semua Data ─────────────────────────────────────
export function resetSemuaData() {
  try {
    localStorage.removeItem('wr_poin')
    localStorage.removeItem('wr_riwayat')
  } catch {}
}