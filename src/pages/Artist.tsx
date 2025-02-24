import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SongList from '../components/SongList';

const Artist = () => {
  return (
    <div className="rounded-xl mt-0 mr-0 mb-4">

      <div className="bg-black bg-opacity-25 flex items-end p-6 h-[30svh] md:h-[50svh] bg-cover bg-[40%_40%] bg-[url('https://i.scdn.co/image/ab67618600001016e2952bec9cfd4e6862e23607')]">
        <h2 className="text-[36px] md:text-8xl md:leading-[100%] text-shadow-md">Jorge & Matheus</h2>
      </div>

      <div className="flex flex-col gap-6 py-6 px-4 md:py-9 md:px-6 bg-[linear-gradient(180deg,rgba(18,18,18,1)_0%,rgba(83,83,83,0)_100%)]">
        <h2 className="text-2xl">Populares</h2>

        <SongList />
      </div>
      <Link to="/songs/1">

        <FontAwesomeIcon
          icon={faCirclePlay}
          className="fixed text-5xl opacity-100 text-[#1ed760] right-6 bottom-6 hover:cursor-pointer"
        />
      </Link>
    </div>
  )
}

export default Artist
