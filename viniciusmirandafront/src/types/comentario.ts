import Item from "./item"

interface Comentario{
    comentarioId: number,
    texto: string,
    itemId: number,
    item: Item,
    data: string,
}

export default Comentario