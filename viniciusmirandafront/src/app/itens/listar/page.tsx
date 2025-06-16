'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import Item from '@/types/item';

export default function Produtos() {
    const [itens, setItens] = useState<Item[] | null>(null);

    useEffect(() => {
        api
            .get<Item[]>("/item/listar")
            .then((resposta) => {
                setItens(resposta.data);
            })
            .catch((erro) => {
                console.log(erro);
            });
    }, []);

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Lista de Itens</h1>

            <ul className="bg-white rounded-xl shadow p-4 w-full max-w-lg space-y-2">
                {itens?.map((item) => (
                    <li
                        key={item.itemId}
                        className="flex justify-between border-b pb-2 last:border-none"
                    >
                        <span>{item.nome}</span>
                        <span>{item.categoria.nome}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
