import { Link, useNavigate, useParams } from "react-router-dom";
import Player from "../components/Player";
import { SongInterface } from "../types/song";
import { ArtistInterface } from "../types/artist";
import { useEffect, useRef, useState, Dispatch, SetStateAction, RefObject } from "react";
import { api } from "../api/api.ts";

const Song = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const songId = Number(id);

    const [currentSongID, setCurrentSongId] = useState(songId);
    const [song, setSong] = useState<SongInterface | null>(null);
    const [artistFromSong, setArtistFromSong] = useState<ArtistInterface | null>(null);
    const [allSongs, setAllSongs] = useState<SongInterface[]>([]);
    const [audioPlayerRef, setAudioPlayerRef] = useState<RefObject<HTMLAudioElement | null>>();
    const progressBar = useRef<HTMLDivElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [autoPlayBlocked, setAutoPlayBlocked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [songResponse, allSongsResponse] = await Promise.all([
                    api.get(`/song/${currentSongID}`),
                    api.get('/song'),
                ]);

                setSong(songResponse.data as SongInterface);
                setAllSongs(allSongsResponse.data as SongInterface[]);

                const artistsResponse = await api.get(`/artist`);

                const artist = artistsResponse.data.filter((artist: ArtistInterface) => artist.name === songResponse.data.artist);

                if (artist.length > 0) {
                    setArtistFromSong(artist[0]);
                } else {
                    setArtistFromSong(null);
                }
            } catch (err: any) {
                console.error('Erro ao buscar dados:', err);
            }
        };
        fetchData();

        if (audioPlayerRef?.current && !autoPlayBlocked) {
            audioPlayerRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(error => {
                    console.error("Erro ao iniciar a reprodução automática:", error);
                    setAutoPlayBlocked(true);
                });
        }
    }, [currentSongID, audioPlayerRef, autoPlayBlocked]);

    useEffect(() => {
        if (currentSongID !== songId) {
            navigate(`/songs/${currentSongID}`);
        }
    }, [currentSongID, navigate, songId]);

    const changeSong = (direction: "next" | "prev") => {
        setIsPlaying(false);
        setCurrentTime('00:00');
        progressBar.current?.style.setProperty('--_progress', '0%');

        const currentIndex = allSongs.findIndex((song) => song.id === currentSongID);

        if (currentIndex === -1) return;

        let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

        if (newIndex < 0) {
            newIndex = allSongs.length - 1;
        } else if (newIndex >= allSongs.length) {
            newIndex = 0;
        }

        setCurrentSongId(allSongs[newIndex].id);
    };

    const handleNext = () => {
        if (audioPlayerRef?.current) {
            audioPlayerRef.current.pause();
            audioPlayerRef.current.currentTime = 0;
        }
        changeSong("next");
        setIsPlaying(true);
    };

    const handlePrev = () => {
        if (audioPlayerRef?.current) {
            audioPlayerRef.current.pause();
            audioPlayerRef.current.currentTime = 0;
        }
        changeSong("prev");
        setIsPlaying(true);
    };

    return (
        <div className="grid grid-rows-[1fr_auto] flex-1">
            <div className="my-0 mx-5 rounded-tr-[15px] rounded-tl-[15px] flex justify-center items-center p-6 bg-[linear-gradient(180deg,rgba(18,18,18,1)_0%,rgba(83,83,83,0)_100%)]">
                <div className="shadow-[0_0_5px_1px_black]">
                    <img className="w-full h-full" src={song?.image} alt={`Imagem da Música ${song?.name}`} />
                </div>
            </div>
            <div className="bg-black text-white gap-3 py-4 px-6 sm:grid sm:grid-cols-[1fr_3fr_1fr] sm:place-items-center flex flex-col items-center">
                <div className="hidden sm:block justify-self-start rounded overflow-hidden">
                    <Link to={`/artists/${artistFromSong?.id}`} className="block">
                        <img width={75} height={70} src={artistFromSong?.image} alt={`Imagem do artista ${song?.artist}`} />
                    </Link>
                </div>
                <div className="w-full sm:w-[500px]">
                    <Player
                        duration={song?.duration ?? '00:00'}
                        onNext={() => handleNext()}
                        onPrev={() => handlePrev()}
                        audio={song?.audio ?? ''}
                        setAudioPlayerRef={setAudioPlayerRef}
                        setIsPlaying={isPlaying}
                    />
                </div>
                {autoPlayBlocked && (
                    <button onClick={() => {
                        if (audioPlayerRef?.current) {
                            audioPlayerRef.current.play()
                                .then(() => {
                                    setIsPlaying(true);
                                    setAutoPlayBlocked(false);
                                })
                                .catch(error => {
                                    console.error("Erro ao iniciar a reprodução:", error);
                                });
                        }
                    }}>
                        Tocar Música
                    </button>
                )}
                <div className="text-center mt-4 sm:mt-0">
                    <p className="text-[19px] font-bold">{song?.name}</p>
                    <p>{song?.artist}</p>
                </div>
            </div>
        </div>
    );
};

export default Song;