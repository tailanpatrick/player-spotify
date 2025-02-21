import ItemList from './ItemList';

const Main = () => {
    return (
        <div className="flex flex-col flex-1 p-5 mt-2 mx-0 rounded-xl overflow-auto bg-[linear-gradient(180deg,rgba(18,18,18,1)_0%,rgba(83,83,83,0)_100%)]">
            <ItemList />
            <ItemList />
        </div>

    );
}

export default Main;
