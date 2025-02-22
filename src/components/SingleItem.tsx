import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export type SingleItemProps = {
    id: string;
    name:string;
    image: string;
    banner: string;
    artist?:string;
    path: string;
}

const SingleItem = ({id, name, image, banner, artist , path}: SingleItemProps) => {
    return (

        <Link to={`${path}/${id}`} className="group flex flex-col w-[180px] h-[270px] md:w-[180px] md:h-[280px] items-center py-2 px-1 rounded-md bg-transparent hover:bg-[rgba(49,50,50,1)] transition duration-300 ease-in-out cursor-pointer">
            <div className="relative overflow-hidden flex justify-center items-center">
                <img
                    className="rounded-full w-[180px] h-[180px] overflow-hidden"
                    src={image}
                    alt={`Imagem do artista ${name}`}
                />
                <FontAwesomeIcon
                    icon={faCirclePlay}
                    className="absolute text-5xl right-2 bottom-2 text-[#1ed760] opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in-out z-10"
                />
            </div>
            <div className="w-full justify-start md:px-3 py-2">
                <p className="text-md hover:underline">{name}</p>
                <p className="text-sm text-[#8d8d8d]">{artist ?? "Artista"}</p>
            </div>
        </Link>

    )
}

export default SingleItem
