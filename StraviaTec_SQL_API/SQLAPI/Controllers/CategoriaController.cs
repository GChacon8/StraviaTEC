using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using SQLAPI.Model;

namespace SQLAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/Categoria
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetAllCategorias()
        {
            List<Categoria> categorias = new List<Categoria>();
            string query = "SELECT * FROM Categoria";

            using (SqlConnection con = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();

                    using (SqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            categorias.Add(new Categoria
                            {
                                ID = Convert.ToInt32(sdr["ID"]),
                                Nombre = Convert.ToString(sdr["Nombre"]),
                                Edad = Convert.ToInt32(sdr["Edad"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return categorias;
        }

        // GET: api/Categoria/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> GetCategoria(int id)
        {
            Categoria categoria = new Categoria();
            string query = "SELECT * FROM Categoria WHERE ID = " + id;

            using (SqlConnection con = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();

                    using (SqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            categoria = new Categoria
                            {
                                ID = Convert.ToInt32(sdr["ID"]),
                                Nombre = Convert.ToString(sdr["Nombre"]),
                                Edad = Convert.ToInt32(sdr["Edad"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (categoria == null)
            {
                return NotFound();
            }
            return categoria;
        }

        // POST: api/Categoria
        [HttpPost]
        public async Task<ActionResult<Categoria>> PostCategoria(Categoria categoria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO Categoria VALUES (@ID, @Nombre, @Edad)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID", categoria.ID);
                    cmd.Parameters.AddWithValue("@Nombre", categoria.Nombre);
                    cmd.Parameters.AddWithValue("@Edad", categoria.Edad);

                    con.Open();
                    int i = cmd.ExecuteNonQuery();
                    if (i > 0)
                    {
                        return Ok();
                    }
                    con.Close();
                }
            }
            return BadRequest();
        }

        // PUT: api/Categoria/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoria(int id, Categoria categoria)
        {
            if (id != categoria.ID)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE Categoria SET Nombre = @Nombre, Edad = @Edad WHERE ID = @ID";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Nombre", categoria.Nombre);
                        cmd.Parameters.AddWithValue("@Edad", categoria.Edad);
                        cmd.Parameters.AddWithValue("@ID", categoria.ID);

                        con.Open();
                        int i = cmd.ExecuteNonQuery();
                        if (i > 0)
                        {
                            return NoContent();
                        }
                        con.Close();
                    }
                }
            }

            return BadRequest(ModelState);
        }

        // DELETE: api/Categoria/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria(int id)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM Categoria WHERE ID = @ID";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID", id);

                    con.Open();
                    int i = cmd.ExecuteNonQuery();
                    if (i > 0)
                    {
                        return NoContent();
                    }
                    con.Close();
                }
            }

            return BadRequest();
        }
    }
}

