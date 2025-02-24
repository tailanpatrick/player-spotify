import SongItem from "./SongItem"


const SongList = () => {
  return (
    <div className="song-list">
      <SongItem />
      <SongItem />
      <SongItem />
      <SongItem />
      <SongItem />
      <SongItem />
      <SongItem />

      <p className="ml-6 mt-5 cursor-pointer font-bold hover:underline">Ver mais</p>
    </div>
  )
}

export default SongList
