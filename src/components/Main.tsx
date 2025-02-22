import ItemList from './ItemList';
import { artistArray } from './../assets/database/artists.ts';
import { songsArray } from './../assets/database/songs.ts';

const Main = () => {
    return (
        <div className="flex flex-col flex-1 p-5 mt-2 mx-0 rounded-xl overflow-auto bg-[linear-gradient(180deg,rgba(18,18,18,1)_0%,rgba(83,83,83,0)_100%)]">
            <ItemList title="Artistas" items={7} itemsArray={artistArray} path="/artists"/>
            <ItemList title="Músicas" items={14}  itemsArray={songsArray} path="/songs"/>
        </div>

    );
}

export default Main;
