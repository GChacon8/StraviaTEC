using Microsoft.AspNetCore.Mvc;
using MONGOAPI2.Data;
using MONGOAPI2.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using MONGOAPI2.Data;

[ApiController]
[Route("api/[controller]")]
public class ComentariosController : ControllerBase
{
    private readonly MongoDBContext _context;

    public ComentariosController(MongoDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<Comentarios>> Get()
    {
        return await _context.Comentarios.Find(_ => true).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Comentarios>> Get(int id)
    {
        var comentario = await _context.Comentarios.Find(c => c.ID == id).FirstOrDefaultAsync();

        if (comentario == null)
        {
            return NotFound();
        }

        return comentario;
    }

    [HttpPost]
    public async Task<ActionResult<Comentarios>> Create(Comentarios comentario)
    {
        await _context.Comentarios.InsertOneAsync(comentario);
        return CreatedAtRoute(new { id = comentario.ID }, comentario);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Comentarios comentarioID)
    {
        var comentario = await _context.Comentarios.Find(c => c.ID == id).FirstOrDefaultAsync();

        if (comentario == null)
        {
            return NotFound();
        }

        await _context.Comentarios.ReplaceOneAsync(c => c.ID == id, comentarioID);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var comentario = await _context.Comentarios.Find(c => c.ID == id).FirstOrDefaultAsync();

        if (comentario == null)
        {
            return NotFound();
        }

        await _context.Comentarios.DeleteOneAsync(c => c.ID == id);

        return NoContent();
    }
}