'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import Comentario from '@/types/comentario';

export default function DeletarComentario() {
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [comentarioId, setComentarioId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get<Comentario[]>('/comentario/listar')
            .then((res) => setComentarios(res.data))
            .catch((err) => console.error('Erro ao buscar comentarios:', err));
    }, []);

    const handleDelete = async () => {
        if (!comentarioId) return alert("Selecione um comentario!");

        const confirmado = confirm("Tem certeza que deseja deletar este comentario?");
        if (!confirmado) return;

        try {
            setLoading(true);
            await api.delete(`/comentario/deletar/${comentarioId}`);
            alert("Comentario deletado com sucesso!");
            setComentarios(comentarios.filter(p => p.comentarioId !== comentarioId));
            setComentarioId(null);
        } catch (err) {
            console.error(err);
            alert("Erro ao deletar o comentario!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Deletar Comentario</h1>

            {comentarios.length === 0 ? (
                <p className="text-gray-500">Nenhum comentario disponível.</p>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
                    <label className="block mb-2">
                        Selecione um comentario:
                        <select
                            value={comentarioId ?? ''}
                            onChange={(e) => setComentarioId(Number(e.target.value))}
                            className="w-full border p-2 rounded mt-1"
                        >
                            <option value="" disabled>-- Escolha --</option>
                            {comentarios.map(comentario => (
                                <option key={comentario.comentarioId} value={comentario.comentarioId}>
                                    {comentario.texto}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-4"
                    >
                        {loading ? "Deletando..." : "Deletar Comentario"}
                    </button>
                    <div className="mt-4">
                        <a href="/" className="text-blue-600 hover:underline">← Voltar para o início</a>
                    </div>
                </form>

            )}
        </div>
    );
}
