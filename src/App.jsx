import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Anime from './pages/Anime'
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import Genre from './pages/Genre'

function App() {
  return (
    <Router>
      <div data-theme="luxury">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/anime' element={<Anime />} />
          <Route path='/genre' element={<Genre />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
