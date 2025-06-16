"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Item from "@/types/item";

export default function ComentarioCadastrar() {
  const [texto, setTexto] = useState("");
  const [itemId, setItemId] = useState<number | null>(null);
  const [itens, setItens] = useState<Item[]>([]);
  const router = useRouter();

  useEffect(() => {
    api
      .get("/item/listar", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setItens(res.data);
      })
      .catch((err) => {
        alert("Erro ao carregar itens");
      });
  }, []);

  const handleSubmit = async () => {
    if (!itemId || texto.trim() === "") {
      alert("Selecione um item e escreva um comentário.");
      return;
    }

    try {
      await api.post("/comentario/cadastrar", {
        texto,
        itemId,
      });

      alert("Comentário enviado com sucesso!");
      router.push("/comentarios/listar"); 
    } catch (err) {
      alert("Erro ao enviar comentário.");
    }
  };

  return (
    <div>
      <h5>Cadastrar Comentário</h5>
      <div className="mb-6">
        <label htmlFor="quantidade" className="block mb-1 text-sm font-medium">
          Comentário
        </label>
        <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      </div>

      <select
        className="mb-4 w-full max-w-md border rounded p-2"
        onChange={(e) => setItemId(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>
          Selecione um produto
        </option>
        {itens.map((item) => (
          <option key={item.itemId} value={item.itemId}>
            {item.nome}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Enviar</button>
      <button onClick={() => router.push("/")}>Voltar</button>
    </div>
  );
}
