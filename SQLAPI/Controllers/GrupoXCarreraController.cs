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
    public class GrupoXCarreraController : ControllerBase
    {
        string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/GrupoXCarrera
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GrupoXCarrera>>> GetAllGrupoXCarrera()
        {
            List<GrupoXCarrera> gruposCarrera = new List<GrupoXCarrera>();
            string query = "SELECT * FROM GrupoXCarrera";
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
                            gruposCarrera.Add(new GrupoXCarrera
                            {
                                ID_Grupo = Convert.ToInt32(sdr["ID_Grupo"]),
                                ID_Carrera = Convert.ToString(sdr["ID_Carrera"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return gruposCarrera;
        }

        // GET: api/GrupoXCarrera/5
        [HttpGet("{id_Grupo}")]
        public async Task<ActionResult<GrupoXCarrera>> GetGrupoXCarrera(int id_Grupo)
        {
            GrupoXCarrera grupoCarrera = new GrupoXCarrera();
            string query = "SELECT * FROM GrupoXCarrera WHERE ID_Grupo = " + id_Grupo;
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
                            grupoCarrera = new GrupoXCarrera
                            {
                                ID_Grupo = Convert.ToInt32(sdr["ID_Grupo"]),
                                ID_Carrera = Convert.ToString(sdr["ID_Carrera"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (grupoCarrera == null)
            {
                return NotFound();
            }
            return grupoCarrera;
        }

        // POST: api/GrupoXCarrera
        [HttpPost]
        public async Task<ActionResult<GrupoXCarrera>> PostGrupoXCarrera(GrupoXCarrera grupoCarrera)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO GrupoXCarrera (ID_Grupo, ID_Carrera) VALUES (@ID_Grupo, @ID_Carrera)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID_Grupo", grupoCarrera.ID_Grupo);
                    cmd.Parameters.AddWithValue("@ID_Carrera", grupoCarrera.ID_Carrera);
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

        // PUT: api/GrupoXCarrera/5
        [HttpPut("{id_Grupo}")]
        public async Task<IActionResult> PutGrupoXCarrera(int id_Grupo, GrupoXCarrera grupoCarrera)
        {
            if (id_Grupo != grupoCarrera.ID_Grupo)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE GrupoXCarrera SET ID_Carrera = @ID_Carrera WHERE ID_Grupo = @ID_Grupo";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@ID_Carrera", grupoCarrera.ID_Carrera);
                        cmd.Parameters.AddWithValue("@ID_Grupo", grupoCarrera.ID_Grupo);
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

        // DELETE: api/GrupoXCarrera/5
        [HttpDelete("{id_Grupo}")]
        public async Task<IActionResult> DeleteGrupoXCarrera(int id_Grupo)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM GrupoXCarrera WHERE ID_Grupo = " + id_Grupo;
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

