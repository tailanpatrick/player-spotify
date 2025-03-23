import { useState, useRef, useEffect } from "react";
import { faBackwardStep, faCirclePause, faCirclePlay, faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface PlayerProps {
    audio: string;
    onNext: () => void;
    onPrev: () => void;
    setAudioPlayerRef: React.Dispatch<React.SetStateAction<React.RefObject<HTMLAudioElement | null> | undefined>>;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, "0");
    const seconds = Math.floor(timeInSeconds - Number(minutes) * 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
};

const Player = ({
    audio,
    onNext,
    onPrev,
    setAudioPlayerRef,
    setIsPlaying,
}: PlayerProps) => {
    const audioPlayer = useRef<HTMLAudioElement | null>(null);
    const progressBar = useRef<HTMLDivElement | null>(null);
    const [localIsPlaying, setLocalIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(formatTime(0));
    const [durationInSeconds, setDurationInSeconds] = useState<number | null>(null);
    const [autoPlayBlocked, setAutoPlayBlocked] = useState(false);
    const [loadingTimeout, ] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const audioRef = audioPlayer.current;
        if (audioRef) {
            const handleLoadedMetadata = () => {
                setDurationInSeconds(audioRef.duration);
            };

            const handleError = (e: any) => {
                console.error("Erro no elemento audio:", e, audio);
                clearTimeout(loadingTimeout as NodeJS.Timeout);
            };

            const handleStalled = (e: any) => {
                console.error("A música está travada:", e, audio);
                clearTimeout(loadingTimeout as NodeJS.Timeout);
            };

            const handleLoadedData = () => {
                console.log("Dados carregados:", audio);
            };

            audioRef.addEventListener('loadedmetadata', handleLoadedMetadata);
            audioRef.addEventListener('error', handleError);
            audioRef.addEventListener('stalled', handleStalled);
            audioRef.addEventListener('loadeddata', handleLoadedData);

            return () => {
                audioRef.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audioRef.removeEventListener('error', handleError);
                audioRef.removeEventListener('stalled', handleStalled);
                audioRef.removeEventListener('loadeddata', handleLoadedData);
            };
        }
    }, [audio]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (localIsPlaying && audioPlayer.current && audioPlayer.current.currentTime && durationInSeconds) {
                setCurrentTime(formatTime(audioPlayer.current.currentTime));
                progressBar.current?.style.setProperty('--_progress', ((audioPlayer.current.currentTime / durationInSeconds) * 100) + "%");
            }
        }, 500);
        return () => clearInterval(intervalId);
    }, [localIsPlaying, durationInSeconds]);


    useEffect(() => {
      if (audioPlayer.current && !autoPlayBlocked) {
          const timeout = setTimeout(() => {
              console.error("Tempo limite de carregamento excedido.");
          }, 10000);

          audioPlayer.current.play()
              .then(() => {
                  clearTimeout(timeout);
                  setLocalIsPlaying(true);

                  setAudioPlayerRef(prevRef => (prevRef === audioPlayer ? prevRef : audioPlayer));
              })
              .catch(error => {
                  console.error("Erro ao iniciar a reprodução automática:", error, audio);
                  clearTimeout(timeout);
                  setAutoPlayBlocked(true);
              });

          return () => clearTimeout(timeout);
      }
  }, [audio, autoPlayBlocked, setAudioPlayerRef]);


    const playPause = () => {
        if (audioPlayer.current) {
            if (localIsPlaying) {
                audioPlayer.current.pause();
                setLocalIsPlaying(false);
                setIsPlaying(false);
            } else {
                audioPlayer.current.play();
                setLocalIsPlaying(true);
                setIsPlaying(true);
            }
        }
    };

    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (audioPlayer.current && durationInSeconds) {
            const progressBarRect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - progressBarRect.left;
            const progressBarWidth = progressBarRect.width;
            const newTime = (clickX / progressBarWidth) * durationInSeconds;
            audioPlayer.current.currentTime = newTime;
            setCurrentTime(formatTime(newTime));
            progressBar.current?.style.setProperty('--_progress', ((newTime / durationInSeconds) * 100) + "%");
        }
    };

    const handleNextSong = () => {
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = 0;
            setLocalIsPlaying(true);
        }
        onNext();
    };

    const handlePrevSong = () => {
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = 0;
            setLocalIsPlaying(true);
        }
        onPrev();
    };

    return (
        <div className="justify-self-stretch flex flex-col items-center gap-1">
            <div className="flex text-2xl items-center gap-5">
                <FontAwesomeIcon
                    icon={faBackwardStep}
                    className="cursor-pointer p-2 transition-transform duration-200 ease hover:scale-105 hover:text-green-300"
                    onClick={handlePrevSong}
                />
                <FontAwesomeIcon
                    icon={localIsPlaying ? faCirclePause : faCirclePlay}
                    className="text-[35px] p-3 cursor-pointer transition-transform duration-200 ease hover:scale-105 hover:text-green-300"
                    onClick={() => playPause()}
                />
                <FontAwesomeIcon
                    icon={faForwardStep}
                    className="cursor-pointer p-2 transition-transform duration-200 ease hover:scale-105 hover:text-green-300"
                    onClick={handleNextSong}
                />
            </div>
            <div className="flex gap-[10px] items-center justify-between w-[100%] max-w-[600px]">
                <p>{currentTime}</p>
                <div
                    className="w-[100%] h-4 bg-transparent"
                    onClick={(e) => handleProgressBarClick(e)}
                >
                    <div className="w-[100%] h-1 bg-[#666666] rounded overflow-hidden">
                        <div
                            ref={progressBar}
                            className="h-full bg-white transition-[width]  ease duration-200"
                            style={{ width: "var(--_progress)" }}
                        ></div>
                    </div>
                </div>
                <p>{durationInSeconds ? formatTime(durationInSeconds) : "00:00"}</p>
            </div>
            <audio ref={audioPlayer} src={audio} autoPlay onEnded={() => handleNextSong()}></audio>
            {autoPlayBlocked && (
                <button onClick={() => {
                    if (audioPlayer.current) {
                        audioPlayer.current.play()
                            .then(() => {
                                setLocalIsPlaying(true);
                                setAutoPlayBlocked(false);
                            })
                            .catch(error => {
                                console.error("Erro ao iniciar a reprodução:", error);
                            });
                    }
                }} />
            )}
        </div>
    );
};

export default Player;
