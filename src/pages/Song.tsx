import Player from "../components/Player"

const Song = () => {
  return (
    <div className="grid grid-rows-[1fr_auto] flex-1">
      <div className="my-0 mx-5 rounded-tr-[15px] rounded-tl-[15px] flex justify-center items-center p-6 bg-[linear-gradient(180deg,rgba(18,18,18,1)_0%,rgba(83,83,83,0)_100%)]">
        <div className="shadow-[0_0_5px_1px_black]">
          <img  className="w-full h-full" src="https://i.scdn.co/image/ab67616d00001e02af41105c5cd91b28f2cf219d" alt="Imagem da Música X"/>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_3fr_1fr] place-items-center bg-black text-white gap-4 py-4 px-6">

        <div className="justify-self-start rounded overflow-hidden">
          <img width={75} height={75} src="https://i.scdn.co/image/ab6761610000517477937baabc49dea13c17c706" alt="Imagem do artista X" />
        </div>

        <Player />

        <div>
          <p className="text-[19px] font-bold">Xonei</p>
          <p>Jorge & Mateus</p>
        </div>
      </div>
    </div>
  )
}

export default Song
