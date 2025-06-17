using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api_avaliacao.Models;

namespace api_avaliacao.Data.Interfaces
{
    public interface IComentarioRepository
    {
        List<Comentario> Listar(int itemId);
        Comentario BuscarComentarioPorIdDoItem(int id);
        void Cadastrar(Comentario comentario);
        void DeletarComentarioPorId(int comentarioId);
    }
}