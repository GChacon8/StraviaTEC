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
    public class DeportistaXRetoController : ControllerBase
    {
        string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/DeportistaXReto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeportistaXReto>>> GetAllDeportistaXReto()
        {
            List<DeportistaXReto> deportistasRetos = new List<DeportistaXReto>();
            string query = "SELECT * FROM DeportistaXReto";
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
                            deportistasRetos.Add(new DeportistaXReto
                            {
                                ID_Deportista = Convert.ToString(sdr["ID_Deportista"]),
                                ID_Reto = Convert.ToInt32(sdr["ID_Reto"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return deportistasRetos;
        }

        // GET: api/DeportistaXReto/5
        [HttpGet("{id_Deportista}")]
        public async Task<ActionResult<DeportistaXReto>> GetDeportistaXReto(string id_Deportista)
        {
            DeportistaXReto deportistaReto = new DeportistaXReto();
            string query = "SELECT * FROM DeportistaXReto WHERE ID_Deportista = '" + id_Deportista + "'";
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
                            deportistaReto = new DeportistaXReto
                            {
                                ID_Deportista = Convert.ToString(sdr["ID_Deportista"]),
                                ID_Reto = Convert.ToInt32(sdr["ID_Reto"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (deportistaReto == null)
            {
                return NotFound();
            }
            return deportistaReto;
        }

        // POST: api/DeportistaXReto
        [HttpPost]
        public async Task<ActionResult<DeportistaXReto>> PostDeportistaXReto(DeportistaXReto deportistaReto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO DeportistaXReto (ID_Deportista, ID_Reto) VALUES (@ID_Deportista, @ID_Reto)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID_Deportista", deportistaReto.ID_Deportista);
                    cmd.Parameters.AddWithValue("@ID_Reto", deportistaReto.ID_Reto);
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

        // PUT: api/DeportistaXReto/5
        [HttpPut("{id_Deportista}")]
        public async Task<IActionResult> PutDeportistaXReto(string id_Deportista, DeportistaXReto deportistaReto)
        {
            if (id_Deportista != deportistaReto.ID_Deportista)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE DeportistaXReto SET ID_Reto = @ID_Reto WHERE ID_Deportista = @ID_Deportista";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@ID_Reto", deportistaReto.ID_Reto);
                        cmd.Parameters.AddWithValue("@ID_Deportista", deportistaReto.ID_Deportista);
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

        // DELETE: api/DeportistaXReto/5
        [HttpDelete("{id_Deportista}")]
        public async Task<IActionResult> DeleteDeportistaXReto(string id_Deportista)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM DeportistaXReto WHERE ID_Deportista = '" + id_Deportista + "'";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
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

