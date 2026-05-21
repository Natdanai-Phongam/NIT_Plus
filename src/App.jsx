import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar      from './components/NavBar'
import HomePage    from './pages/HomePage'
import ReferPage   from './pages/ReferPage'
import ReferInPage from './pages/ReferPage/ReferInPage'

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/"          element={<HomePage />}                          />
        <Route path="/refer"     element={<Navigate to="/refer/out" replace />}  />
        <Route path="/refer/out" element={<ReferPage />}                         />
        <Route path="/refer/in"  element={<ReferInPage />}                       />
        {/* Fallback → home */}
        <Route path="*"          element={<Navigate to="/" replace />}           />
      </Routes>
    </BrowserRouter>
  )
}
