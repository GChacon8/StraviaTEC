using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using SQLAPI.Model;
using System.Collections;

namespace SQLAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AmigosController : ControllerBase
    {
        string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";


        // GET: api/Amigos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Amigos>>> GetAllAmigos()
        {
            List<Amigos> amigos = new List<Amigos>();
            string query = "SELECT * FROM Amigos";
            using (SqlConnection con = new SqlConnection(constr))
            //using (SqlConnection con = DatabaseConnection.GetConnection())
            {
                using (SqlCommand cmd = new SqlCommand(query))
                //using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (SqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            amigos.Add(new Amigos
                            {
                                ID_Deportista = Convert.ToString(sdr["ID_Deportista"]),
                                ID_Amigo = Convert.ToString(sdr["ID_Amigo"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return amigos;
        }

        // GET: api/Amigos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Amigos>> GetAmigos(int id)
        {
            Amigos amigos = new Amigos();
            string query = "SELECT * FROM Amigos WHERE ID = " + id;
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
                            amigos = new Amigos
                            {
                                ID_Deportista = Convert.ToString(sdr["ID_Deportista"]),
                                ID_Amigo = Convert.ToString(sdr["ID_Amigo"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (amigos == null)
            {
                return NotFound();
            }
            return amigos;
        }

        // POST: api/Amigos
        [HttpPost]
        public async Task<ActionResult<Amigos>> PostAmigos(Amigos amigos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO Amigos VALUES (@ID_Deportista, @ID_Amigo)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID_Deportista", amigos.ID_Deportista);
                    cmd.Parameters.AddWithValue("@ID_Amigo", amigos.ID_Amigo);
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

        // PUT: api/Amigos/5
        [HttpPut("{id_Deportista}")]
        public async Task<IActionResult> PutAmigos(string id_Deportista, Amigos amigos)
        {
            if (id_Deportista != amigos.ID_Deportista)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE Amigos SET ID_Amigo = @ID_Amigo WHERE ID_Deportista = @ID_Deportista";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@ID_Amigo", amigos.ID_Amigo);
                        cmd.Parameters.AddWithValue("@ID_Deportista", amigos.ID_Deportista);
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

        // DELETE: api/Amigos/5
        [HttpDelete("{id_Deportista}")]
        public async Task<IActionResult> DeleteAmigos(int id_Deportista)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM Amigos WHERE ID_Deportista = " + id_Deportista;
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
