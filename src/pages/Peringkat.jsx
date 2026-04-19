import { useState } from 'react'
import { Crown, Medal } from 'lucide-react'
import Badge from '../components/ui/Badge'

const leaderboard = [
  { rank: 1, id: 'WR-00001', level: 'Standar Whiteroom', skor: 9847, spesialisasi: 'Strategi' },
  { rank: 2, id: 'WR-00023', level: 'Strategis', skor: 8234, spesialisasi: 'Logika' },
  { rank: 3, id: 'WR-00007', level: 'Strategis', skor: 7891, spesialisasi: 'Observasi' },
  { rank: 4, id: 'WR-00156', level: 'Analis', skor: 6543, spesialisasi: 'Adaptasi' },
  { rank: 5, id: 'WR-00089', level: 'Analis', skor: 6127, spesialisasi: 'Logika' },
  { rank: 6, id: 'WR-00234', level: 'Subjek', skor: 5890, spesialisasi: 'Strategi' },
  { rank: 7, id: 'WR-00312', level: 'Subjek', skor: 5234, spesialisasi: 'Memori' },
  { rank: 8, id: 'WR-00445', level: 'Kandidat', skor: 4567, spesialisasi: 'Observasi' },
  { rank: 9, id: 'WR-00523', level: 'Kandidat', skor: 4123, spesialisasi: 'Logika' },
  { rank: 10, id: 'WR-00601', level: 'Kandidat', skor: 3891, spesialisasi: 'Adaptasi' },
]

const tabs = ['Mingguan', 'Bulanan', 'Sepanjang Waktu']

function RankIcon({ rank }) {
  if (rank === 1)
    return <Crown size={16} className="text-yellow-500" />
  if (rank === 2)
    return <Medal size={16} className="text-gray-400" />
  if (rank === 3)
    return <Medal size={16} className="text-orange-600" />
  return (
    <span className="text-xs font-mono text-wr-gray w-4 text-center">
      {rank}
    </span>
  )
}

function getRowClass(rank) {
  if (rank === 1) return 'bg-yellow-50 border-yellow-200'
  if (rank === 2) return 'bg-gray-50 border-gray-200'
  if (rank === 3) return 'bg-orange-50 border-orange-100'
  return 'bg-white border-wr-border'
}

export default function Peringkat() {
  const [tabAktif, setTabAktif] = useState(0)

  return (
    <div>
      {/* HERO */}
      <section className="min-h-hero flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 border-b border-wr-border">
        <div className="max-w-7xl mx-auto w-full">
          <p className="section-label mb-4">Peringkat</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-wr-black mb-4 max-w-2xl">
            Posisi Mencerminkan Kemampuan
          </h1>
          <p className="text-lg text-wr-gray max-w-xl">
            Leaderboard diperbarui setiap 24 jam.
          </p>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="py-20">
        <div className="page-container">
          {/* Tabs */}
          <div className="flex gap-0 border-b border-wr-border mb-10 overflow-x-auto">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setTabAktif(i)}
                className={`px-6 py-3 text-xs font-semibold tracking-widest uppercase whitespace-nowrap transition-all duration-200 border-b-2 ${
                  tabAktif === i
                    ? 'border-wr-black text-wr-black'
                    : 'border-transparent text-wr-gray hover:text-wr-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Podium Top 3 */}
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl">
            {leaderboard.slice(0, 3).map((entry) => (
              <div
                key={entry.rank}
                className={`border p-4 text-center ${getRowClass(entry.rank)}`}
              >
                <div className="flex justify-center mb-2">
                  <RankIcon rank={entry.rank} />
                </div>
                <p className="text-xs font-mono font-bold text-wr-black mb-1">
                  {entry.id}
                </p>
                <p className="text-lg font-black font-mono text-wr-black">
                  {entry.skor.toLocaleString('id-ID')}
                </p>
                <p className="text-xs text-wr-gray mt-1">{entry.spesialisasi}</p>
              </div>
            ))}
          </div>

          {/* Tabel Lengkap */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-wr-border">
                  <th className="text-left py-3 px-4 text-xs font-mono tracking-widest text-wr-gray uppercase">
                    #
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-mono tracking-widest text-wr-gray uppercase">
                    ID Subjek
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-mono tracking-widest text-wr-gray uppercase hidden sm:table-cell">
                    Level
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-mono tracking-widest text-wr-gray uppercase">
                    Skor
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-mono tracking-widest text-wr-gray uppercase hidden md:table-cell">
                    Spesialisasi
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr
                    key={entry.rank}
                    className={`border-b transition-colors ${getRowClass(entry.rank)} hover:opacity-80`}
                  >
                    <td className="py-4 px-4">
                      <RankIcon rank={entry.rank} />
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm font-bold text-wr-black">
                        {entry.id}
                      </span>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <Badge type="level" value={entry.level} />
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-mono text-sm font-bold text-wr-black">
                        {entry.skor.toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className="text-xs text-wr-gray font-mono">
                        {entry.spesialisasi}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs font-mono text-wr-gray mt-6 text-center">
            Data diperbarui setiap 24 jam · {new Date().toLocaleDateString('id-ID')}
          </p>
        </div>
      </section>
    </div>
  )
}