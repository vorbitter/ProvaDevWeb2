using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api_avaliacao.Data.Interfaces;
using api_avaliacao.Models;
using Microsoft.EntityFrameworkCore;

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
            var item = _context.Itens.Include(i=> i.Comentarios).FirstOrDefault(i => i.ItemId == itemId);
            Console.WriteLine("---------------- item -----------------");
            Console.WriteLine(item);
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

        public void DeletarComentarioPorId(int comentarioId)
        {
            var comentario = _context.Comentarios.FirstOrDefault(c => c.ComentarioId == comentarioId);
            _context.Comentarios.Remove(comentario);
            _context.SaveChangesAsync();
        }
    }
}