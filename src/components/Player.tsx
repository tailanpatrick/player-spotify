import { faBackwardStep, faCirclePlay, faForwardStep } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Player = () => {
  return (
    <div className="justify-self-stretch flex flex-col items-center gap-1">
      <div className="flex text-2xl items-center gap-5">
        <Link to="/songs/1">

          <FontAwesomeIcon
            icon={faBackwardStep}
            className="cursor-pointer transition-transform duration-200 ease hover:scale-105 hover:text-green-300"
          />
        </Link>

        <FontAwesomeIcon
          icon={faCirclePlay}
          className="text-[35px] p-3 cursor-pointer transition-transform duration-200 ease hover:scale-105 hover:text-green-300"
        />
        <Link to="/songs/3">
          <FontAwesomeIcon
            icon={faForwardStep}
            className="cursor-pointer transition-transform duration-200 ease hover:scale-105 hover:text-green-300"
          />
        </Link>

      </div>

      <div className="flex gap-[10px] items-center justify-between w-[100%] max-w-[600px]">
        <p>00:00</p>
        <div className="w-[100%] h-1 bg-[#666666] rounded overflow-hidden">

          <div
            className="h-full bg-white transition-[width] ease duration-200"
            style={{ width: "var(--_progress)" }}
          ></div>

        </div>
        <p>03:40</p>
      </div>
    </div>
  )
}

export default Player
