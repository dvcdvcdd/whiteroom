export default function SectionTitle({ label = '', title = '', subtitle = '' }) {
  return (
    <div className="flex flex-col items-start mb-12">
      {label && (
        <span className="text-xs font-mono font-bold tracking-widest text-wr-gray uppercase mb-3">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-wr-black mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-wr-gray text-base md:text-lg max-w-2xl">{subtitle}</p>
      )}
    </div>
  )
}