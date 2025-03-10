import { Link } from "react-router-dom"
import { useRef, useState, useEffect } from "react"

import { faBackwardStep, faCirclePause, faCirclePlay, faForwardStep } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, "0");
  const seconds = Math.floor(timeInSeconds - Number(minutes) * 60).toString().padStart(2, "0");;

  return `${minutes}:${seconds}`
}

function timeToSeconds(minutes: number, seconds: number) {
  return minutes * 60 + seconds;
}

const Player = ({
  audio,
  duration,
  onNext,
  onPrev
}: {
  audio: string;
  duration: string;
  onNext: () => void;
  onPrev: () => void
}) => {

  const audioPlayer = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatTime(0));

  //console.log(audioPlayer.current?.play())

  useEffect(() => {
    const intervalId = setInterval(() => {

      isPlaying
      ? setCurrentTime(formatTime(audioPlayer.current?.currentTime || 0))
      : null

    }, 1000)
    return () => clearInterval(intervalId)

  }, [isPlaying])

  const playPause = () => {
    isPlaying ? audioPlayer.current?.pause() : audioPlayer.current?.play();

    setIsPlaying(!isPlaying);

  }

  return (
    <div className="justify-self-stretch flex flex-col items-center gap-1">

      <div className="flex text-2xl items-center gap-5">
        <Link to="/songs/1">

          <FontAwesomeIcon
            icon={faBackwardStep}
            className="cursor-pointer p-2 transition-transform duration-200 ease hover:scale-105 hover:text-green-300"
            onClick={onPrev}
          />
        </Link>

        <FontAwesomeIcon
          icon={isPlaying ? faCirclePause : faCirclePlay}
          className="text-[35px] p-3 cursor-pointer transition-transform duration-200 ease hover:scale-105 hover:text-green-300"
          onClick={() => playPause()}
        />
        <Link to="/songs/3">
          <FontAwesomeIcon
            icon={faForwardStep}
            className="cursor-pointer p-2 transition-transform duration-200 ease hover:scale-105 hover:text-green-300"
            onClick={onNext}
          />
        </Link>

      </div>

      <div className="flex gap-[10px] items-center justify-between w-[100%] max-w-[600px]">
        <p>{currentTime}</p>
        <div className="w-[100%] h-1 bg-[#666666] rounded overflow-hidden">

          <div
            className="h-full bg-white transition-[width] ease duration-200"
            style={{ width: "var(--_progress)" }}
          ></div>

        </div>
        <p>{formatTime(timeToSeconds(...(duration.split(':').map(Number) as [number, number])))}</p>
      </div>

      <audio ref={audioPlayer} src={audio}></audio>
    </div>
  )
}

export default Player
