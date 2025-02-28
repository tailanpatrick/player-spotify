import { useState } from "react"
import { SongInterface } from "../types/song"
import SongItem from "./SongItem"


const SongList = ({ artistSongs }: { artistSongs: SongInterface[] }) => {
  const [items, setItems] = useState(5);

  return (
    <div className="song-list">
      {artistSongs.filter((_, index) => index < items)
        .map((song, index) => (
          <SongItem {...song} key={String(index)} number={index + 1} />
        ))}

      {items < artistSongs.length && <p className="ml-6 mt-5 cursor-pointer font-bold hover:underline"
        onClick={() => setItems(prev => prev + 5)}
      >
        Ver mais
      </p>
      }
    </div>
  )
}

export default SongList
