import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Beranda from './pages/Beranda'
import Filosofi from './pages/Filosofi'
import Evaluasi from './pages/Evaluasi'
import EvaluasiTes from './pages/EvaluasiTes'
import Statistik from './pages/Statistik'
import NotFound from './pages/404'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/filosofi" element={<Filosofi />} />
            <Route path="/evaluasi" element={<Evaluasi />} />
            <Route path="/evaluasi/:kategori" element={<EvaluasiTes />} />
            <Route path="/statistik" element={<Statistik />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}