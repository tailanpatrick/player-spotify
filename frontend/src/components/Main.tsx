import { useEffect, useState } from 'react';

import { SongInterface } from '../types/song.ts';
import { ArtistInterface } from '../types/artist.ts';
import { api } from '../api/api.ts';

import ItemList from './ItemList';

type MainProps = {
    type?: string;
}

const Main = ({ type }: MainProps) => {
    const [artistArray, setArtistArray] = useState<ArtistInterface[]>();
    const [songArray, setSongArray] = useState<SongInterface[]>([]);


    useEffect(()=> {
      const fetchData = async () => {
        const [artistsResponse, songsResponse] = await Promise.all([
          api.get('artist'),
          api.get('song')
        ])

        setArtistArray(artistsResponse.data as ArtistInterface[])
        setSongArray(songsResponse.data as SongInterface[])
      }
      fetchData();
    }, [])

    return (
        <div className="flex flex-col flex-1 p-5 mt-2 mx-0 rounded-xl overflow-auto bg-[linear-gradient(180deg,rgba(18,18,18,1)_0%,rgba(83,83,83,0)_100%)]">
            {type === 'artists' || !type ? (

                <ItemList title="Artistas" items={7} itemsArray={artistArray || []} path="/artists" />
            ) : (
                <></>
            )}

            {type === 'songs' || !type ? (

                <ItemList title="Músicas" items={14} itemsArray={songArray} path="/songs" />
            ) : (
                <></>
            )}

        </div>

    );
}

export default Main;
