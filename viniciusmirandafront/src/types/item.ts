import Categoria from "./categoria";

interface Item{
    itemId: number,
    nome: string,
    categoriaId: number,
    categoria: Categoria,
    criadoEm: string,
}

export default Item