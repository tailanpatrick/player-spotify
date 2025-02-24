import { Link } from "react-router-dom"

const SongItem = () => {
  return (
    <Link to="/songs/1" className="flex justify-between items-center py-[15px] px-[25px] mr-4 gap-4 rounded hover:bg-[rgba(49,50,50,1)] transition duration-300 ease-in-out cursor-pointer">
     <div className="flex items-center gap-6">
      <p>1</p>

      <div className="flex items-center gap-3">

        <img className="w-10 h-10 rounded" src="https://i.scdn.co/image/ab67616d00001e02af41105c5cd91b28f2cf219d" alt="Imagem da Música X" />
        <p className="hover:underline">Cantada Boba - Ao Vivo</p>
      </div>

     </div>
      <p>03:03</p>
    </Link>
  )
}

export default SongItem
