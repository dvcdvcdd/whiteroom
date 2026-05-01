import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Countdown({ onSelesai, namaTest }) {
  const [hitung, setHitung] = useState(3)
  const [fase, setFase] = useState('angka')

  useEffect(() => {
    if (fase === 'selesai') return

    const timer = setTimeout(() => {
      if (hitung > 1) {
        setHitung(hitung - 1)
      } else if (fase === 'angka') {
        setFase('mulai')
      } else if (fase === 'mulai') {
        setFase('selesai')
        onSelesai()
      }
    }, fase === 'mulai' ? 800 : 1000)

    return () => clearTimeout(timer)
  }, [hitung, fase, onSelesai])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-wr-black dark:bg-zinc-950">
      {/* Nama tes */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-mono text-gray-600 tracking-widest uppercase mb-8"
      >
        {namaTest}
      </motion.p>

      {/* Angka / MULAI */}
      <AnimatePresence mode="wait">
        {fase === 'angka' && (
          <motion.div
            key={hitung}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <span className="text-8xl md:text-9xl font-black font-mono text-white leading-none">
              {hitung}
            </span>
            <span className="text-xs font-mono text-gray-600 tracking-widest uppercase mt-4">
              Bersiap
            </span>
          </motion.div>
        )}

        {fase === 'mulai' && (
          <motion.div
            key="mulai"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <span className="text-5xl md:text-6xl font-black tracking-widest text-white uppercase">
              Mulai
            </span>
            <div className="w-16 h-0.5 bg-white mt-4" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Garis dekoratif */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '120px' }}
        transition={{ duration: 3, ease: 'linear' }}
        className="h-px bg-gray-800 mt-12"
      />
    </div>
  )
}