import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PageTransition from './components/layout/PageTransition'
import Beranda from './pages/Beranda'
import Filosofi from './pages/Filosofi'
import Evaluasi from './pages/Evaluasi'
import EvaluasiTes from './pages/EvaluasiTes'
import UjianKomprehensif from './pages/UjianKomprehensif'
import Statistik from './pages/Statistik'
import Profil from './pages/Profil'
import NotFound from './pages/404'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Beranda /></PageTransition>} />
        <Route path="/filosofi" element={<PageTransition><Filosofi /></PageTransition>} />
        <Route path="/evaluasi" element={<PageTransition><Evaluasi /></PageTransition>} />
        <Route path="/evaluasi/:kategori" element={<PageTransition><EvaluasiTes /></PageTransition>} />
        <Route path="/ujian" element={<PageTransition><UjianKomprehensif /></PageTransition>} />
        <Route path="/statistik" element={<PageTransition><Statistik /></PageTransition>} />
        <Route path="/profil" element={<PageTransition><Profil /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}