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
    public class DeportistaXGrupoController : ControllerBase
    {
        string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/DeportistaXGrupo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeportistaXGrupo>>> GetAllDeportistaXGrupo()
        {
            List<DeportistaXGrupo> deportistasGrupos = new List<DeportistaXGrupo>();
            string query = "SELECT * FROM DeportistaXGrupo";
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
                            deportistasGrupos.Add(new DeportistaXGrupo
                            {
                                ID_Deportista = Convert.ToString(sdr["ID_Deportista"]),
                                ID_Grupo = Convert.ToInt32(sdr["ID_Grupo"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return deportistasGrupos;
        }

        // GET: api/DeportistaXGrupo/5
        [HttpGet("{id_Deportista}")]
        public async Task<ActionResult<DeportistaXGrupo>> GetDeportistaXGrupo(string id_Deportista)
        {
            DeportistaXGrupo deportistaGrupo = new DeportistaXGrupo();
            string query = "SELECT * FROM DeportistaXGrupo WHERE ID_Deportista = '" + id_Deportista + "'";
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
                            deportistaGrupo = new DeportistaXGrupo
                            {
                                ID_Deportista = Convert.ToString(sdr["ID_Deportista"]),
                                ID_Grupo = Convert.ToInt32(sdr["ID_Grupo"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (deportistaGrupo == null)
            {
                return NotFound();
            }
            return deportistaGrupo;
        }

        // POST: api/DeportistaXGrupo
        [HttpPost]
        public async Task<ActionResult<DeportistaXGrupo>> PostDeportistaXGrupo(DeportistaXGrupo deportistaGrupo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO DeportistaXGrupo (ID_Deportista, ID_Grupo) VALUES (@ID_Deportista, @ID_Grupo)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID_Deportista", deportistaGrupo.ID_Deportista);
                    cmd.Parameters.AddWithValue("@ID_Grupo", deportistaGrupo.ID_Grupo);
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

        // PUT: api/DeportistaXGrupo/5
        [HttpPut("{id_Deportista}")]
        public async Task<IActionResult> PutDeportistaXGrupo(string id_Deportista, DeportistaXGrupo deportistaGrupo)
        {
            if (id_Deportista != deportistaGrupo.ID_Deportista)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE DeportistaXGrupo SET ID_Grupo = @ID_Grupo WHERE ID_Deportista = @ID_Deportista";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@ID_Grupo", deportistaGrupo.ID_Grupo);
                        cmd.Parameters.AddWithValue("@ID_Deportista", deportistaGrupo.ID_Deportista);
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

        // DELETE: api/DeportistaXGrupo/5
        [HttpDelete("{id_Deportista}")]
        public async Task<IActionResult> DeleteDeportistaXGrupo(string id_Deportista)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM DeportistaXGrupo WHERE ID_Deportista = '" + id_Deportista + "'";
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

