export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) {
  const base =
    'font-semibold tracking-widest uppercase border transition-all duration-200 cursor-pointer inline-block text-center'

  const variants = {
    primary:
      'bg-wr-black text-white border-wr-black hover:bg-white hover:text-wr-black',
    outline:
      'bg-transparent text-wr-black border-wr-black hover:bg-wr-black hover:text-white',
    ghost:
      'bg-transparent text-wr-gray border-transparent hover:text-wr-black hover:border-wr-border',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const disabledClass = disabled
    ? 'opacity-40 cursor-not-allowed pointer-events-none'
    : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  )
}