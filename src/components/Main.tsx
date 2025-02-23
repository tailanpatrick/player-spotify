import ItemList from './ItemList';
import { artistArray } from './../assets/database/artists.ts';
import { songsArray } from './../assets/database/songs.ts';

type MainProps = {
    type?: string;
}

const Main = ({ type }: MainProps) => {
    return (
        <div className="flex flex-col flex-1 p-5 mt-2 mx-0 rounded-xl overflow-auto bg-[linear-gradient(180deg,rgba(18,18,18,1)_0%,rgba(83,83,83,0)_100%)]">
            {type === 'artists' || !type ? (

                <ItemList title="Artistas" items={7} itemsArray={artistArray} path="/artists" />
            ) : (
                <></>
            )}

            {type === 'songs' || !type ? (

                <ItemList title="Músicas" items={14} itemsArray={songsArray} path="/songs" />
            ) : (
                <></>
            )}

        </div>

    );
}

export default Main;
