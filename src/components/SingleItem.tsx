import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const SingleItem = () => {
    return (

        <div className="group flex flex-col w-[167px] h-[250px] md:w-[180px] md:h-[280px] items-center py-2 px-1 rounded-md bg-transparent hover:bg-[rgba(49,50,50,1)] transition duration-300 ease-in-out cursor-pointer">
            <div className="relative overflow-hidden flex justify-center items-center">
                <img
                    className="rounded-full md:w-full overflow-hidden"
                    src="https://i.scdn.co/image/ab676161000051744dcd8a3bff84cd7703892cf4"
                    alt="Imagem do artista Henrique & Juliano"
                />
                <FontAwesomeIcon
                    icon={faCirclePlay}
                    className="absolute text-5xl right-2 bottom-2 text-[#1ed760] opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in-out z-10"
                />
            </div>
            <div className="w-full justify-start md:px-2 py-2">
                <p className="text-md hover:underline">Henrique & Juliano</p>
                <p className="text-sm text-[#8d8d8d]">Artista</p>
            </div>
        </div>

    )
}

export default SingleItem
