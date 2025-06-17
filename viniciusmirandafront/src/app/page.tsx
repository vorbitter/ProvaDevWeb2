import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Painel de Navegação</h1>
      <ul className="space-y-3 text-lg">
        <li>
          <Link href="/usuario/login" className="text-blue-600 hover:underline">Login</Link>
        </li>
        <li>
          <Link href="/itens/listar" className="text-blue-600 hover:underline">Listar Itens</Link>
        </li>
        <li>
          <Link href="/comentarios/cadastrar/" className="text-blue-600 hover:underline">Cadastrar Comentario</Link>
        </li>
        <li>
          <Link href="/comentarios/deletar/1" className="text-blue-600 hover:underline">Deletar Comentario</Link>
        </li>
      </ul>
    </main>
  );
}
