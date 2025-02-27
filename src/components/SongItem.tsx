import { Link } from "react-router-dom"
import { SongInterface } from "../types/song"


const SongItem = ({ name, image, duration, id, number } : SongInterface) => {

  return (
    <Link to={`/songs/${id}`} className="flex justify-between items-center py-[15px] px-[25px] mr-4 gap-4 rounded hover:bg-[rgba(49,50,50,1)] transition duration-300 ease-in-out cursor-pointer">
     <div className="flex items-center gap-6">
      <p>{number}</p>

      <div className="flex items-center gap-3">

        <img className="w-10 h-10 rounded" src={`${image}`} alt={`Imagem da música ${name}`} />
        <p className="hover:underline">{name}</p>
      </div>

     </div>
      <p>{duration}</p>
    </Link>
  )
}

export default SongItem
