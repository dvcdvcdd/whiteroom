export default function ProgressBar({ value = 0, label = '', showPercent = true, height = 'normal' }) {
  const clamped = Math.min(100, Math.max(0, value))
  const barHeight = height === 'thin' ? 'h-1' : 'h-2'

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-xs font-mono font-semibold tracking-widest text-wr-black uppercase">
              {label}
            </span>
          )}
          {showPercent && (
            <span className="text-xs font-mono text-wr-gray">{clamped}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-wr-muted ${barHeight}`}>
        <div
          className={`${barHeight} bg-wr-black transition-all duration-500`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}