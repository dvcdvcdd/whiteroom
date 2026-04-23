export default function ProgressBar({ value = 0, label = '', showPercent = true, height = 'normal' }) {
  const clamped = Math.min(100, Math.max(0, value))
  const barHeight = height === 'thin' ? 'h-1' : 'h-2'

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-xs font-mono font-semibold tracking-widest text-wr-black uppercase dark:text-zinc-300">
              {label}
            </span>
          )}
          {showPercent && (
            <span className="text-xs font-mono text-wr-gray dark:text-zinc-500">{clamped}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-wr-muted dark:bg-zinc-800 ${barHeight}`}>
        <div
          className={`${barHeight} bg-wr-black dark:bg-white transition-all duration-500`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}