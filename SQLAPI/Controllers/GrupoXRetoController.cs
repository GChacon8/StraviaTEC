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
    public class GrupoXRetoController : ControllerBase
    {
        string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/GrupoXReto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GrupoXReto>>> GetAllGrupoXReto()
        {
            List<GrupoXReto> gruposRetos = new List<GrupoXReto>();
            string query = "SELECT * FROM GrupoXReto";
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
                            gruposRetos.Add(new GrupoXReto
                            {
                                ID_Grupo = Convert.ToInt32(sdr["ID_Grupo"]),
                                ID_Reto = Convert.ToInt32(sdr["ID_Reto"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return gruposRetos;
        }

        // GET: api/GrupoXReto/5
        [HttpGet("{id_Grupo}")]
        public async Task<ActionResult<GrupoXReto>> GetGrupoXReto(int id_Grupo)
        {
            GrupoXReto grupoReto = new GrupoXReto();
            string query = "SELECT * FROM GrupoXReto WHERE ID_Grupo = " + id_Grupo;
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
                            grupoReto = new GrupoXReto
                            {
                                ID_Grupo = Convert.ToInt32(sdr["ID_Grupo"]),
                                ID_Reto = Convert.ToInt32(sdr["ID_Reto"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (grupoReto == null)
            {
                return NotFound();
            }
            return grupoReto;
        }

        // POST: api/GrupoXReto
        [HttpPost]
        public async Task<ActionResult<GrupoXReto>> PostGrupoXReto(GrupoXReto grupoReto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO GrupoXReto (ID_Grupo, ID_Reto) VALUES (@ID_Grupo, @ID_Reto)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID_Grupo", grupoReto.ID_Grupo);
                    cmd.Parameters.AddWithValue("@ID_Reto", grupoReto.ID_Reto);
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

        // PUT: api/GrupoXReto/5
        [HttpPut("{id_Grupo}")]
        public async Task<IActionResult> PutGrupoXReto(int id_Grupo, GrupoXReto grupoReto)
        {
            if (id_Grupo != grupoReto.ID_Grupo)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE GrupoXReto SET ID_Reto = @ID_Reto WHERE ID_Grupo = @ID_Grupo";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@ID_Reto", grupoReto.ID_Reto);
                        cmd.Parameters.AddWithValue("@ID_Grupo", grupoReto.ID_Grupo);
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

        // DELETE: api/GrupoXReto/5
        [HttpDelete("{id_Grupo}")]
        public async Task<IActionResult> DeleteGrupoXReto(int id_Grupo)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM GrupoXReto WHERE ID_Grupo = " + id_Grupo;
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

