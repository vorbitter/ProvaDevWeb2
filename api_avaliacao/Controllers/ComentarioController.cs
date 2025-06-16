using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api_avaliacao.Data.Interfaces;
using api_avaliacao.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api_avaliacao.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/comentario")]
    public class ComentarioController : ControllerBase
    {
        private readonly IComentarioRepository _comentarioRepository;
        public ComentarioController(IComentarioRepository comentarioRepository)
        {
            _comentarioRepository = comentarioRepository;
        }

        [HttpGet("listar/{itemId}")]
        public IActionResult Listar(int itemId)
        {
            return Ok(_comentarioRepository.Listar(itemId));
        }
        [HttpPost("cadastrar")]
        public IActionResult Cadastrar([FromBody] Comentario comentario)
        {
            _comentarioRepository.Cadastrar(comentario);
            return Created("", comentario);
        }
    }
}