export default function Badge({ type = 'kategori', value = '' }) {
  if (type === 'level') {
    const levelStyles = {
      Dasar: 'bg-green-50 text-green-800 border border-green-200',
      Menengah: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
      Lanjutan: 'bg-orange-50 text-orange-800 border border-orange-200',
      Elite: 'bg-red-50 text-red-800 border border-red-200',
      'Standar Whiteroom':
        'bg-wr-black text-white border border-wr-black',
    }
    const style =
      levelStyles[value] ||
      'bg-wr-muted text-wr-gray border border-wr-border'

    return (
      <span
        className={`inline-block text-xs font-mono font-bold tracking-widest uppercase px-2 py-1 ${style}`}
      >
        {value}
      </span>
    )
  }

  return (
    <span className="inline-block text-xs font-mono font-bold tracking-widest uppercase px-2 py-1 bg-wr-muted text-wr-gray border border-wr-border">
      {value}
    </span>
  )
}