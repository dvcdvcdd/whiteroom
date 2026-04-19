export default function Card({ children, className = '', onClick }) {
  const clickable = onClick
    ? 'cursor-pointer hover:border-wr-black hover:shadow-sm'
    : 'hover:border-wr-black hover:shadow-sm'

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-wr-border p-6 transition-all duration-200 ${clickable} ${className}`}
    >
      {children}
    </div>
  )
}