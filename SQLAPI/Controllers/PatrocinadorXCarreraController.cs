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
    public class PatrocinadorXCarreraController : ControllerBase
    {
        string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/PatrocinadorXCarrera
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatrocinadorXCarrera>>> GetAllPatrocinadorXCarrera()
        {
            List<PatrocinadorXCarrera> patrocinadoresCarrera = new List<PatrocinadorXCarrera>();
            string query = "SELECT * FROM PatrocinadorXCarrera";
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
                            patrocinadoresCarrera.Add(new PatrocinadorXCarrera
                            {
                                ID_Patrocinador = Convert.ToString(sdr["ID_Patrocinador"]),
                                ID_Carrera = Convert.ToString(sdr["ID_Carrera"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return patrocinadoresCarrera;
        }

        // GET: api/PatrocinadorXCarrera/5
        [HttpGet("{id_Patrocinador}")]
        public async Task<ActionResult<PatrocinadorXCarrera>> GetPatrocinadorXCarrera(string id_Patrocinador)
        {
            PatrocinadorXCarrera patrocinadorCarrera = new PatrocinadorXCarrera();
            string query = "SELECT * FROM PatrocinadorXCarrera WHERE ID_Patrocinador = '" + id_Patrocinador + "'";
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
                            patrocinadorCarrera = new PatrocinadorXCarrera
                            {
                                ID_Patrocinador = Convert.ToString(sdr["ID_Patrocinador"]),
                                ID_Carrera = Convert.ToString(sdr["ID_Carrera"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (patrocinadorCarrera == null)
            {
                return NotFound();
            }
            return patrocinadorCarrera;
        }

        // POST: api/PatrocinadorXCarrera
        [HttpPost]
        public async Task<ActionResult<PatrocinadorXCarrera>> PostPatrocinadorXCarrera(PatrocinadorXCarrera patrocinadorCarrera)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO PatrocinadorXCarrera (ID_Patrocinador, ID_Carrera) VALUES (@ID_Patrocinador, @ID_Carrera)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID_Patrocinador", patrocinadorCarrera.ID_Patrocinador);
                    cmd.Parameters.AddWithValue("@ID_Carrera", patrocinadorCarrera.ID_Carrera);
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

        // PUT: api/PatrocinadorXCarrera/5
        [HttpPut("{id_Patrocinador}")]
        public async Task<IActionResult> PutPatrocinadorXCarrera(string id_Patrocinador, PatrocinadorXCarrera patrocinadorCarrera)
        {
            if (id_Patrocinador != patrocinadorCarrera.ID_Patrocinador)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE PatrocinadorXCarrera SET ID_Carrera = @ID_Carrera WHERE ID_Patrocinador = @ID_Patrocinador";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@ID_Carrera", patrocinadorCarrera.ID_Carrera);
                        cmd.Parameters.AddWithValue("@ID_Patrocinador", patrocinadorCarrera.ID_Patrocinador);
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

        // DELETE: api/PatrocinadorXCarrera/5
        [HttpDelete("{id_Patrocinador}")]
        public async Task<IActionResult> DeletePatrocinadorXCarrera(string id_Patrocinador)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM PatrocinadorXCarrera WHERE ID_Patrocinador = '" + id_Patrocinador + "'";
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

