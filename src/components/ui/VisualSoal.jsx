export default function VisualSoal({ type, data }) {
  if (!type) return null

  switch (type) {
    case 'grid-angka':
      return <GridAngka data={data} />
    case 'pola-bentuk':
      return <PolaBentuk data={data} />
    case 'pola-warna':
      return <PolaWarna data={data} />
    case 'pola-simbol':
      return <PolaSimbol data={data} />
    case 'grid-kotak':
      return <GridKotak data={data} />
    case 'matriks':
      return <Matriks data={data} />
    case 'barisan-angka':
      return <BarisanAngka data={data} />
    case 'pola-arah':
      return <PolaArah data={data} />
    case 'tabel':
      return <Tabel data={data} />
    case 'hitungan-visual':
      return <HitunganVisual data={data} />
    default:
      return null
  }
}

// ─── Grid Angka ───────────────────────────────────────────
function GridAngka({ data }) {
  const { rows, cols, values, highlight } = data
  return (
    <div className="inline-block border border-wr-border dark:border-zinc-700 my-4">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex">
          {Array.from({ length: cols }).map((_, c) => {
            const idx = r * cols + c
            const val = values[idx]
            const isHighlight = highlight && highlight.includes(idx)
            return (
              <div
                key={c}
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-mono text-sm md:text-base font-bold border border-wr-border dark:border-zinc-700 ${
                  isHighlight
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                    : val === '?'
                    ? 'bg-wr-muted dark:bg-zinc-800 text-wr-red dark:text-red-400'
                    : 'bg-white dark:bg-zinc-900 text-wr-black dark:text-zinc-200'
                }`}
              >
                {val}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// ─── Pola Bentuk ──────────────────────────────────────────
function PolaBentuk({ data }) {
  const { shapes, size = 32 } = data
  const shapeMap = {
    'lingkaran': (i, s) => <circle key={i} cx={s/2} cy={s/2} r={s/2 - 2} className="fill-wr-black dark:fill-white" />,
    'lingkaran-kosong': (i, s) => <circle key={i} cx={s/2} cy={s/2} r={s/2 - 3} className="fill-none stroke-wr-black dark:stroke-white" strokeWidth="2" />,
    'kotak': (i, s) => <rect key={i} x="2" y="2" width={s-4} height={s-4} className="fill-wr-black dark:fill-white" />,
    'kotak-kosong': (i, s) => <rect key={i} x="3" y="3" width={s-6} height={s-6} className="fill-none stroke-wr-black dark:stroke-white" strokeWidth="2" />,
    'segitiga': (i, s) => <polygon key={i} points={`${s/2},2 2,${s-2} ${s-2},${s-2}`} className="fill-wr-black dark:fill-white" />,
    'segitiga-kosong': (i, s) => <polygon key={i} points={`${s/2},3 3,${s-3} ${s-3},${s-3}`} className="fill-none stroke-wr-black dark:stroke-white" strokeWidth="2" />,
    'bintang': (i, s) => <polygon key={i} points={starPoints(s/2, s/2, s/2-2, s/4)} className="fill-wr-black dark:fill-white" />,
    'berlian': (i, s) => <polygon key={i} points={`${s/2},2 ${s-2},${s/2} ${s/2},${s-2} 2,${s/2}`} className="fill-wr-black dark:fill-white" />,
    'tanya': (i, s) => (
      <g key={i}>
        <rect x="2" y="2" width={s-4} height={s-4} className="fill-wr-muted dark:fill-zinc-800 stroke-wr-red dark:stroke-red-500" strokeWidth="2" strokeDasharray="4" />
        <text x={s/2} y={s/2 + 5} textAnchor="middle" className="fill-wr-red dark:fill-red-400 text-lg font-bold">?</text>
      </g>
    ),
  }

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3 my-4 p-4 bg-wr-surface dark:bg-zinc-900 border border-wr-border dark:border-zinc-700">
      {shapes.map((shape, i) => (
        <svg key={i} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {shapeMap[shape] ? shapeMap[shape](i, size) : null}
        </svg>
      ))}
    </div>
  )
}

function starPoints(cx, cy, outerR, innerR, points = 5) {
  const result = []
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR
    const angle = (Math.PI / points) * i - Math.PI / 2
    result.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }
  return result.join(' ')
}

// ─── Pola Warna ───────────────────────────────────────────
function PolaWarna({ data }) {
  const { colors, labels } = data
  const colorMap = {
    'merah': 'bg-red-500',
    'biru': 'bg-blue-500',
    'hijau': 'bg-green-500',
    'kuning': 'bg-yellow-400',
    'ungu': 'bg-purple-500',
    'oranye': 'bg-orange-500',
    'hitam': 'bg-wr-black dark:bg-white',
    'putih': 'bg-white dark:bg-zinc-700 border border-wr-border dark:border-zinc-600',
    'abu': 'bg-gray-400',
    'tanya': 'bg-wr-muted dark:bg-zinc-800 border-2 border-dashed border-wr-red dark:border-red-500',
  }

  return (
    <div className="flex flex-wrap items-center gap-2 my-4 p-4 bg-wr-surface dark:bg-zinc-900 border border-wr-border dark:border-zinc-700">
      {colors.map((c, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className={`w-8 h-8 md:w-10 md:h-10 ${colorMap[c] || 'bg-gray-300'} flex items-center justify-center`}>
            {c === 'tanya' && <span className="text-wr-red dark:text-red-400 font-bold text-sm">?</span>}
          </div>
          {labels && labels[i] && (
            <span className="text-[9px] font-mono text-wr-gray dark:text-zinc-500">{labels[i]}</span>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Pola Simbol ──────────────────────────────────────────
function PolaSimbol({ data }) {
  const { symbols, gap } = data
  return (
    <div className={`flex flex-wrap items-center ${gap ? `gap-${gap}` : 'gap-1'} my-4 p-4 bg-wr-surface dark:bg-zinc-900 border border-wr-border dark:border-zinc-700 font-mono text-lg md:text-xl`}>
      {symbols.map((s, i) => (
        <span
          key={i}
          className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center ${
            s === '?'
              ? 'bg-wr-muted dark:bg-zinc-800 border-2 border-dashed border-wr-red dark:border-red-500 text-wr-red dark:text-red-400 text-sm font-bold'
              : 'text-wr-black dark:text-zinc-200'
          }`}
        >
          {s}
        </span>
      ))}
    </div>
  )
}

// ─── Grid Kotak ───────────────────────────────────────────
function GridKotak({ data }) {
  const { rows, cols, filled } = data
  return (
    <div className="inline-block my-4 p-4 bg-wr-surface dark:bg-zinc-900 border border-wr-border dark:border-zinc-700">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex">
          {Array.from({ length: cols }).map((_, c) => {
            const idx = r * cols + c
            const isFilled = filled && filled.includes(idx)
            return (
              <div
                key={c}
                className={`w-7 h-7 md:w-9 md:h-9 border border-wr-border dark:border-zinc-600 ${
                  isFilled
                    ? 'bg-wr-black dark:bg-white'
                    : 'bg-white dark:bg-zinc-800'
                }`}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

// ─── Matriks ──────────────────────────────────────────────
function Matriks({ data }) {
  const { rows, values } = data
  return (
    <div className="inline-block my-4">
      <div className="border-l-2 border-r-2 border-wr-black dark:border-white px-2 py-1">
        {rows.map((row, r) => (
          <div key={r} className="flex gap-4 md:gap-6">
            {row.map((val, c) => (
              <span
                key={c}
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-mono text-sm md:text-base font-bold ${
                  val === '?'
                    ? 'text-wr-red dark:text-red-400 bg-wr-muted dark:bg-zinc-800'
                    : 'text-wr-black dark:text-zinc-200'
                }`}
              >
                {val}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Barisan Angka ────────────────────────────────────────
function BarisanAngka({ data }) {
  const { numbers } = data
  return (
    <div className="flex flex-wrap items-center gap-1 md:gap-2 my-4 p-4 bg-wr-surface dark:bg-zinc-900 border border-wr-border dark:border-zinc-700">
      {numbers.map((n, i) => (
        <div key={i} className="flex items-center gap-1 md:gap-2">
          <span
            className={`w-9 h-9 md:w-11 md:h-11 flex items-center justify-center font-mono text-sm md:text-base font-bold border ${
              n === '?'
                ? 'border-wr-red dark:border-red-500 bg-wr-muted dark:bg-zinc-800 text-wr-red dark:text-red-400 border-dashed border-2'
                : 'border-wr-border dark:border-zinc-700 bg-white dark:bg-zinc-900 text-wr-black dark:text-zinc-200'
            }`}
          >
            {n}
          </span>
          {i < numbers.length - 1 && (
            <span className="text-wr-gray dark:text-zinc-600 text-xs">→</span>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Pola Arah ────────────────────────────────────────────
function PolaArah({ data }) {
  const { arrows } = data
  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3 my-4 p-4 bg-wr-surface dark:bg-zinc-900 border border-wr-border dark:border-zinc-700">
      {arrows.map((a, i) => (
        <span
          key={i}
          className={`w-9 h-9 md:w-11 md:h-11 flex items-center justify-center text-lg md:text-xl ${
            a === '?'
              ? 'bg-wr-muted dark:bg-zinc-800 border-2 border-dashed border-wr-red dark:border-red-500 text-wr-red dark:text-red-400 text-sm font-bold'
              : 'text-wr-black dark:text-zinc-200'
          }`}
        >
          {a}
        </span>
      ))}
    </div>
  )
}

// ─── Tabel ────────────────────────────────────────────────
function Tabel({ data }) {
  const { headers, rows } = data
  return (
    <div className="overflow-x-auto my-4">
      <table className="border-collapse border border-wr-border dark:border-zinc-700">
        {headers && (
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-3 py-2 text-xs font-mono font-bold tracking-widest uppercase text-wr-gray dark:text-zinc-400 bg-wr-surface dark:bg-zinc-800 border border-wr-border dark:border-zinc-700 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`px-3 py-2 text-sm font-mono border border-wr-border dark:border-zinc-700 ${
                    cell === '?'
                      ? 'bg-wr-muted dark:bg-zinc-800 text-wr-red dark:text-red-400 font-bold'
                      : 'text-wr-black dark:text-zinc-200 bg-white dark:bg-zinc-900'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Hitungan Visual ──────────────────────────────────────
function HitunganVisual({ data }) {
  const { items } = data
  return (
    <div className="flex flex-wrap gap-1 my-4 p-4 bg-wr-surface dark:bg-zinc-900 border border-wr-border dark:border-zinc-700">
      {items.map((item, i) => (
        <span key={i} className="text-xl md:text-2xl">
          {item}
        </span>
      ))}
    </div>
  )
}