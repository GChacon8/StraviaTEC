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
    public class PatrocinadorXRetoController : ControllerBase
    {
        string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/PatrocinadorXReto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatrocinadorXReto>>> GetAllPatrocinadorXReto()
        {
            List<PatrocinadorXReto> patrocinadores = new List<PatrocinadorXReto>();
            string query = "SELECT * FROM PatrocinadorXReto";
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
                            patrocinadores.Add(new PatrocinadorXReto
                            {
                                ID_Patrocinador = Convert.ToString(sdr["ID_Patrocinador"]),
                                ID_Reto = Convert.ToInt32(sdr["ID_Reto"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return patrocinadores;
        }

        // GET: api/PatrocinadorXReto/5
        [HttpGet("{id_Patrocinador}")]
        public async Task<ActionResult<PatrocinadorXReto>> GetPatrocinadorXReto(string id_Patrocinador)
        {
            PatrocinadorXReto patrocinadores = new PatrocinadorXReto();
            string query = "SELECT * FROM PatrocinadorXReto WHERE ID_Patrocinador = '" + id_Patrocinador + "'";
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
                            patrocinadores = new PatrocinadorXReto
                            {
                                ID_Patrocinador = Convert.ToString(sdr["ID_Patrocinador"]),
                                ID_Reto = Convert.ToInt32(sdr["ID_Reto"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (patrocinadores == null)
            {
                return NotFound();
            }
            return patrocinadores;
        }

        // POST: api/PatrocinadorXReto
        [HttpPost]
        public async Task<ActionResult<PatrocinadorXReto>> PostPatrocinadorXReto(PatrocinadorXReto patrocinadores)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO PatrocinadorXReto (ID_Patrocinador, ID_Reto) VALUES (@ID_Patrocinador, @ID_Reto)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID_Patrocinador", patrocinadores.ID_Patrocinador);
                    cmd.Parameters.AddWithValue("@ID_Reto", patrocinadores.ID_Reto);
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

        // PUT: api/PatrocinadorXReto/5
        [HttpPut("{id_Patrocinador}")]
        public async Task<IActionResult> PutPatrocinadorXReto(string id_Patrocinador, PatrocinadorXReto patrocinadores)
        {
            if (id_Patrocinador != patrocinadores.ID_Patrocinador)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE PatrocinadorXReto SET ID_Reto = @ID_Reto WHERE ID_Patrocinador = @ID_Patrocinador";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@ID_Reto", patrocinadores.ID_Reto);
                        cmd.Parameters.AddWithValue("@ID_Patrocinador", patrocinadores.ID_Patrocinador);
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

        // DELETE: api/PatrocinadorXReto/5
        [HttpDelete("{id_Patrocinador}")]
        public async Task<IActionResult> DeletePatrocinadorXReto(string id_Patrocinador)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM PatrocinadorXReto WHERE ID_Patrocinador = '" + id_Patrocinador + "'";
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

