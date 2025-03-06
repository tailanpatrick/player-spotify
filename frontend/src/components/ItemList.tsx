import { Link, useLocation } from "react-router-dom";
import SingleItem from "./SingleItem"
import { ArtistInterface } from "../types/artist";
import { SongInterface } from "../types/song";

type ItemListProps = {
    title: string;
    items: number;
    itemsArray: ArtistInterface[] | SongInterface[]
    path: string;
}

const ItemList = ({ title, items, itemsArray, path }: ItemListProps) => {

    const { pathname } = useLocation();

    const isHome = pathname === '/';

    const finalItems = isHome ? items : Infinity;

    return (
        <div className="my-3">

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{title} populares</h2>

                {isHome && (
                    <Link className="hover:underline text-sm font-bold text-[#a7a7a7]" to={path}>
                        Mostrar tudo
                    </Link>
                )}
            </div>

            <div className=" w-full flex flex-wrap justify-center items-center gap-0 my-3">
                {itemsArray.slice(0, finalItems).map((item: any) => (
                    <SingleItem
                        {...item}
                        path={path}
                        key={`${title}-${item.id}`}
                    />
                ))}


            </div>
        </div>
    )
}

export default ItemList
