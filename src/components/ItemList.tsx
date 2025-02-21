import SingleItem from "./SingleItem"

const ItemList = () => {
    return (
        <>

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Artistas populares</h2>
                <a className="hover:underline text-sm font-bold text-[#a7a7a7]" href="/">
                    Mostrar tudo
                </a>
            </div>

            <div className=" w-full flex flex-wrap justify-center md:justify-normal gap-0 mt-5">
                <SingleItem />
                <SingleItem />
                <SingleItem />
                <SingleItem />
                <SingleItem />

            </div>
        </>
    )
}

export default ItemList
