
import { Link } from 'react-router-dom'
import logoSpotify from '../assets/logo/spotify-logo.png'

const Header = () => {
  return (
    <div className="flex border-b-2 border-black gap-3 p-4 bg-black">
       <Link to="/" className="flex items-center gap-2"> 
          <img src={logoSpotify} alt="Logo Spotify" className="h-8" />
          <h1 className="text-amber-50 pt-1 font-bold text-lg">Spotify</h1>
        </Link>
    </div>
  )
}

export default Header
