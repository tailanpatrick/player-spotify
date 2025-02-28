import { Link, useNavigate, useParams } from "react-router-dom";
import { songsArray } from "../assets/database/songs";
import { artistArray } from "../assets/database/artists";

import Player from "../components/Player";
import { SongInterface } from "../types/song";
import { ArtistInterface } from "../types/artist";
import { useEffect, useState } from "react";

const Song = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const songId = Number(id);

  const [currentSongID, setCurrentSongId] = useState(songId);

  if (isNaN(songId)) {
    return <div>Song not found</div>;
  }

  const song: SongInterface | undefined = songsArray.find((song) => song.id === currentSongID);

  if (!song) {
    return <div>Música não encontrada</div>;
  }

  const { image, name, artist, duration }: SongInterface = song;
  const artistFromSong: ArtistInterface | undefined = artistArray.find((artistItem) => artistItem.name === artist);

  if (!artistFromSong) {
    return <div>Artista não encontrado</div>;
  }

  const changeSong = (direction: "next" | "prev") => {
    const currentIndex = songsArray.findIndex((song) => song.id === currentSongID);

    if (currentIndex === -1) return;

    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex < 0) {
      newIndex = songsArray.length - 1;
    } else if (newIndex >= songsArray.length) {
      newIndex = 0;
    }

    setCurrentSongId(songsArray[newIndex].id);
  };

  useEffect(() => {
    if (currentSongID !== songId) {
      navigate(`/songs/${currentSongID}`);
    }
  }, [currentSongID, navigate]);

  return (
    <div className="grid grid-rows-[1fr_auto] flex-1">
      <div className="my-0 mx-5 rounded-tr-[15px] rounded-tl-[15px] flex justify-center items-center p-6 bg-[linear-gradient(180deg,rgba(18,18,18,1)_0%,rgba(83,83,83,0)_100%)]">
        <div className="shadow-[0_0_5px_1px_black]">
          <img className="w-full h-full" src={image} alt={`Imagem da Música ${name}`} />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_3fr_1fr] place-items-center bg-black text-white gap-4 py-4 px-6">
        <Link to={`/artists/${artistFromSong.id}`} className="justify-self-start rounded overflow-hidden">
          <img width={75} height={75} src={artistFromSong.image} alt={`Imagem do artista ${artist}`} />
        </Link>

        <Player duration={duration} onNext={() => changeSong("next")} onPrev={() => changeSong("prev")} />

        <div>
          <p className="text-[19px] font-bold">{name}</p>
          <p>{artist}</p>
        </div>
      </div>
    </div>
  );
};

export default Song;
