import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Beranda from './pages/Beranda'
import Filosofi from './pages/Filosofi'
import Evaluasi from './pages/Evaluasi'
import EvaluasiTes from './pages/EvaluasiTes'
import Pelatihan from './pages/Pelatihan'
import Misi from './pages/Misi'
import Peringkat from './pages/Peringkat'
import Arsip from './pages/Arsip'
import Simulasi from './pages/Simulasi'
import Profil from './pages/Profil'
import Masuk from './pages/Masuk'
import Daftar from './pages/Daftar'

export default function App() {
  return (
    <BrowserRouter basename="/whiteroom">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/filosofi" element={<Filosofi />} />
            <Route path="/evaluasi" element={<Evaluasi />} />
            <Route path="/evaluasi/:kategori" element={<EvaluasiTes />} />
            <Route path="/pelatihan" element={<Pelatihan />} />
            <Route path="/misi" element={<Misi />} />
            <Route path="/peringkat" element={<Peringkat />} />
            <Route path="/arsip" element={<Arsip />} />
            <Route path="/simulasi" element={<Simulasi />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/masuk" element={<Masuk />} />
            <Route path="/daftar" element={<Daftar />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}