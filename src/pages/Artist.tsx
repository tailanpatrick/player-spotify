import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import SongList from '../components/SongList';

import { artistArray } from './../assets/database/artists';
import { ArtistInterface } from '../types/artist';
import { songsArray } from './../assets/database/songs';
import { SongInterface } from '../types/song';

const Artist = () => {
  const { id } = useParams();

  const { name, banner } = artistArray.filter(
    (artist: ArtistInterface) => artist.id === Number(id)
  )[0] as ArtistInterface;

  const artistSongs = songsArray.filter((song: SongInterface) => song.artist === name) as SongInterface[];

  const randomIndex = Math.floor(Math.random() * (artistSongs.length - 1) );
  const randomIdSongFromArtist = artistSongs[randomIndex].id;

  return (
    <div className="rounded-xl mt-0 mr-0 mb-4">

      <div className={`bg-black bg-opacity-25 flex items-end p-6 h-[30svh] md:h-[50svh] bg-cover bg-[40%_40%]`}
        style={{backgroundImage: `url(${banner})`}}>
        <h2 className="text-[36px] md:text-8xl md:leading-[100%] text-shadow-md">{name}</h2>
      </div>

      <div className="flex flex-col gap-6 py-6 px-4 md:py-9 md:px-6 bg-[linear-gradient(180deg,rgba(18,18,18,1)_0%,rgba(83,83,83,0)_100%)]">
        <h2 className="text-2xl">Populares</h2>

        <SongList artistSongs={artistSongs}/>
      </div>

      <Link to={`/songs/${randomIdSongFromArtist}`}>

        <FontAwesomeIcon
          icon={faCirclePlay}
          className="fixed text-5xl opacity-100 text-[#1ed760] right-6 bottom-6 hover:cursor-pointer"
        />
      </Link>
    </div>
  )
}

export default Artist
