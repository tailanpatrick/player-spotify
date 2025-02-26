import { Song } from "../types/song"
import SongItem from "./SongItem"


const SongList = ({ artistSongs }: { artistSongs: Song[] }) => {
  const items = 5;

  return (
    <div className="song-list">
      {artistSongs.filter((_, index) => index < items )
      .map(( song, index )=> (
        <SongItem {...song} key={String(index)} number={index + 1}/>
      ))}

      <p className="ml-6 mt-5 cursor-pointer font-bold hover:underline">Ver mais</p>
    </div>
  )
}

export default SongList
