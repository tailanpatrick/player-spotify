import SingleItem from "./SingleItem"

type ItemListProps = {
    title: string;
    items: number;
    itemsArray: Array<{}>
    path: string;
}

const ItemList = ({ title, items, itemsArray, path }: ItemListProps) => {
    return (
        <div className="my-3">

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{title} populares</h2>
                <a className="hover:underline text-sm font-bold text-[#a7a7a7]" href={path}>
                    Mostrar tudo
                </a>
            </div>

            <div className=" w-full flex flex-wrap justify-center items-center gap-0 my-3">
                {itemsArray.slice(0, items).map((item: any) => (
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
