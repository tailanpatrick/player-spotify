import Header from "./components/Header"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Artists from "./pages/Artists"
import Artist from "./pages/Artist"
import Songs from "./pages/Songs"
import Song from "./pages/Song"


const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/artists" element={<Artists />}/>
          <Route path="/songs" element={<Songs />}/>
          <Route path="/artists/:id" element={<Artist />}/>
          <Route path="/songs/:id" element={<Song />}/>
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
