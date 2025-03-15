import { Link } from "react-router-dom";
import { useRef, useState, useEffect, Dispatch, SetStateAction, RefObject } from "react";
import { faBackwardStep, faCirclePause, faCirclePlay, faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, "0");
    const seconds = Math.floor(timeInSeconds - Number(minutes) * 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
};

function timeToSeconds(minutes: number, seconds: number) {
    return minutes * 60 + seconds;
}

const Player = ({
    audio,
    duration,
    onNext,
    onPrev,
    setAudioPlayerRef,
}: {
    audio: string;
    duration: string;
    onNext: () => void;
    onPrev: () => void;
    setAudioPlayerRef: Dispatch<SetStateAction<RefObject<HTMLAudioElement | null> | undefined>>;
    setIsPlaying: boolean;
}) => {
    const audioPlayer = useRef<HTMLAudioElement | null>(null);
    const progressBar = useRef<HTMLDivElement | null>(null);
    const [localIsPlaying, setLocalIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(formatTime(0));
    const durationInSeconds = timeToSeconds(...(duration.split(':').map(Number) as [number, number]));
    const [autoPlayBlocked, setAutoPlayBlocked] = useState(false);
    const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (localIsPlaying && audioPlayer.current && audioPlayer.current.currentTime && durationInSeconds) {
                setCurrentTime(formatTime(audioPlayer.current.currentTime));
                progressBar.current?.style.setProperty('--_progress', ((audioPlayer.current.currentTime / durationInSeconds) * 100) + "%");
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [localIsPlaying, durationInSeconds]);

    useEffect(() => {
        if (audioPlayer.current && !autoPlayBlocked) {
            console.log("Iniciando reprodução automática:", audio);
            setLoadingTimeout(setTimeout(() => {
                console.error("Tempo limite de carregamento excedido.");

            }, 10000));

            audioPlayer.current.play()
                .then(() => {
                    console.log("Reprodução iniciada:", audio);
                    clearTimeout(loadingTimeout as NodeJS.Timeout);;
                    setLocalIsPlaying(true);
                    setAudioPlayerRef(audioPlayer);
                })
                .catch(error => {
                    console.error("Erro ao iniciar a reprodução automática:", error, audio);
                    clearTimeout(loadingTimeout as NodeJS.Timeout);
                    setAutoPlayBlocked(true);
                });
        }

        if (audioPlayer.current) {
            audioPlayer.current.onerror = (e) => {
                console.error("Erro no elemento audio:", e, audio);
                clearTimeout(loadingTimeout as NodeJS.Timeout);

            };

            audioPlayer.current.onstalled = (e) => {
                console.error("A música está travada:", e, audio);
                clearTimeout(loadingTimeout as NodeJS.Timeout);
            };

            audioPlayer.current.onloadedmetadata = () => {
                console.log("Metadados carregados:", audio);
            };

            audioPlayer.current.onloadeddata = () => {
                console.log("Dados carregados:", audio);
            };
        }
    }, [audio]);

    const playPause = () => {
        if (audioPlayer.current) {
            if (localIsPlaying) {
                audioPlayer.current.pause();
                setLocalIsPlaying(false);
            } else {
                audioPlayer.current.play();
                setLocalIsPlaying(true);
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
            setLocalIsPlaying(true)
        }
        onNext();
    };

    const handlePrevSong = () => {
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = 0;
            setLocalIsPlaying(true)
        }
        onPrev();
    };

    return (
        <div className="justify-self-stretch flex flex-col items-center gap-1">
            <div className="flex text-2xl items-center gap-5">
                <Link to="/songs/1">
                    <FontAwesomeIcon
                        icon={faBackwardStep}
                        className="cursor-pointer p-2 transition-transform duration-200 ease hover:scale-105 hover:text-green-300"
                        onClick={handlePrevSong}
                    />
                </Link>
                <FontAwesomeIcon
                    icon={localIsPlaying ? faCirclePause : faCirclePlay}
                    className="text-[35px] p-3 cursor-pointer transition-transform duration-200 ease hover:scale-105 hover:text-green-300"
                    onClick={() => playPause()}
                />
                <Link to="/songs/3">
                    <FontAwesomeIcon
                        icon={faForwardStep}
                        className="cursor-pointer p-2 transition-transform duration-200 ease hover:scale-105 hover:text-green-300"
                        onClick={handleNextSong}
                    />
                </Link>
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
                            className="h-full bg-white transition-[width] ease duration-200"
                            style={{ width: "var(--_progress)" }}
                        ></div>
                    </div>
                </div>
                <p>{formatTime(durationInSeconds)}</p>
            </div>
            <audio ref={audioPlayer} src={audio} autoPlay></audio>
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
                }}>
                </button>
            )}
        </div>
    );
};

export default Player;