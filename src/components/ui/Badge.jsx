export default function Badge({ type = 'kategori', value = '' }) {
  if (type === 'level') {
    const styles = {
      Dasar: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
      Menengah: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
      Lanjutan: 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800',
      Elite: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
    }
    const style = styles[value] || 'bg-wr-muted text-wr-gray border-wr-border dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'
    return (
      <span className={`inline-block text-xs font-mono font-bold tracking-widest uppercase px-2 py-1 border ${style}`}>
        {value}
      </span>
    )
  }
  return (
    <span className="inline-block text-xs font-mono font-bold tracking-widest uppercase px-2 py-1 bg-wr-muted text-wr-gray border border-wr-border dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700">
      {value}
    </span>
  )
}