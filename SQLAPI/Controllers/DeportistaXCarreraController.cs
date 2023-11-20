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
    public class DeportistaXCarreraController : ControllerBase
    {
        string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/DeportistaXCarrera
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeportistaXCarrera>>> GetAllDeportistaXCarrera()
        {
            List<DeportistaXCarrera> deportistasCarrera = new List<DeportistaXCarrera>();
            string query = "SELECT * FROM DeportistaXCarrera";
            using (SqlConnection con = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    using (SqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            deportistasCarrera.Add(new DeportistaXCarrera
                            {
                                ID_Deportista = Convert.ToString(sdr["ID_Deportista"]),
                                ID_Carrera = Convert.ToString(sdr["ID_Carrera"]),
                                Tiempo = sdr["Tiempo"] == DBNull.Value ? 0 : Convert.ToInt32(sdr["Tiempo"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return deportistasCarrera;
        }

        // GET: api/DeportistaXCarrera/5
        [HttpGet("{id_Deportista}")]
        public async Task<ActionResult<DeportistaXCarrera>> GetDeportistaXCarrera(string id_Deportista)
        {
            DeportistaXCarrera deportistaCarrera = null;
            string query = "SELECT * FROM DeportistaXCarrera WHERE ID_Deportista = @ID_Deportista";
            using (SqlConnection con = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID_Deportista", id_Deportista);
                    con.Open();
                    using (SqlDataReader sdr = cmd.ExecuteReader())
                    {
                        if (sdr.Read())
                        {
                            deportistaCarrera = new DeportistaXCarrera
                            {
                                ID_Deportista = Convert.ToString(sdr["ID_Deportista"]),
                                ID_Carrera = Convert.ToString(sdr["ID_Carrera"]),
                                Tiempo = sdr["Tiempo"] == DBNull.Value ? 0 : Convert.ToInt32(sdr["Tiempo"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (deportistaCarrera == null)
            {
                return NotFound();
            }
            return deportistaCarrera;
        }

        // POST: api/DeportistaXCarrera
        [HttpPost]
        public async Task<ActionResult<DeportistaXCarrera>> PostDeportistaXCarrera(DeportistaXCarrera deportistaCarrera)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO DeportistaXCarrera (ID_Deportista, ID_Carrera, Tiempo) VALUES (@ID_Deportista, @ID_Carrera, @Tiempo)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID_Deportista", deportistaCarrera.ID_Deportista);
                    cmd.Parameters.AddWithValue("@ID_Carrera", deportistaCarrera.ID_Carrera);
                    cmd.Parameters.AddWithValue("@Tiempo", deportistaCarrera.Tiempo);
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

        // PUT: api/DeportistaXCarrera/5
        [HttpPut("{id_Deportista}")]
        public async Task<IActionResult> PutDeportistaXCarrera(string id_Deportista, DeportistaXCarrera deportistaCarrera)
        {
            if (id_Deportista != deportistaCarrera.ID_Deportista)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE DeportistaXCarrera SET ID_Carrera = @ID_Carrera, Tiempo = @Tiempo WHERE ID_Deportista = @ID_Deportista";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@ID_Carrera", deportistaCarrera.ID_Carrera);
                        cmd.Parameters.AddWithValue("@Tiempo", deportistaCarrera.Tiempo);
                        cmd.Parameters.AddWithValue("@ID_Deportista", deportistaCarrera.ID_Deportista);
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

        // DELETE: api/DeportistaXCarrera/5
        [HttpDelete("{id_Deportista}")]
        public async Task<IActionResult> DeleteDeportistaXCarrera(string id_Deportista)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM DeportistaXCarrera WHERE ID_Deportista = @ID_Deportista";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID_Deportista", id_Deportista);
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

