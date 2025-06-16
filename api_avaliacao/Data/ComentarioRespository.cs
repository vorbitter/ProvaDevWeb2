using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api_avaliacao.Data.Interfaces;
using api_avaliacao.Models;

namespace api_avaliacao.Data
{
    public class ComentarioRepository : IComentarioRepository
    {
        private readonly AppDataContext _context;
        public ComentarioRepository(AppDataContext context)
        {
            _context = context;
        }
        public List<Comentario> Listar(int itemId)
        {
            var item = _context.Itens.FirstOrDefault(i => i.ItemId == itemId);
            return item.Comentarios.ToList();
        }
        public void Cadastrar(Comentario comentario)
        {
        _context.Comentarios.Add(comentario);
        _context.SaveChanges();
        }

        public Comentario BuscarComentarioPorIdDoItem(int itemId)
        {
            return _context.Comentarios.FirstOrDefault(c => c.ItemId == itemId);
        }
    }
}