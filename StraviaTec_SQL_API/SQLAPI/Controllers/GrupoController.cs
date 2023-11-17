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
    public class GrupoController : ControllerBase
    {
        private string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/Grupo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grupo>>> GetAllGrupos()
        {
            List<Grupo> grupos = new List<Grupo>();
            string query = "SELECT * FROM Grupo";

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
                            grupos.Add(new Grupo
                            {
                                ID = Convert.ToInt32(sdr["ID"]),
                                Nombre = Convert.ToString(sdr["Nombre"]),
                                Privado = Convert.ToBoolean(sdr["Privado"]),
                                ID_Administrador = Convert.ToString(sdr["ID_Administrador"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return grupos;
        }

        // GET: api/Grupo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Grupo>> GetGrupo(int id)
        {
            Grupo grupo = new Grupo();
            string query = "SELECT * FROM Grupo WHERE ID = " + id;

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
                            grupo = new Grupo
                            {
                                ID = Convert.ToInt32(sdr["ID"]),
                                Nombre = Convert.ToString(sdr["Nombre"]),
                                Privado = Convert.ToBoolean(sdr["Privado"]),
                                ID_Administrador = Convert.ToString(sdr["ID_Administrador"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (grupo == null)
            {
                return NotFound();
            }
            return grupo;
        }

        // POST: api/Grupo
        [HttpPost]
        public async Task<ActionResult<Grupo>> PostGrupo(Grupo grupo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO Grupo VALUES (@ID, @Nombre, @Privado, @ID_Administrador)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID", grupo.ID);
                    cmd.Parameters.AddWithValue("@Nombre", grupo.Nombre);
                    cmd.Parameters.AddWithValue("@Privado", grupo.Privado);
                    cmd.Parameters.AddWithValue("@ID_Administrador", grupo.ID_Administrador);

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

        // PUT: api/Grupo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGrupo(int id, Grupo grupo)
        {
            if (id != grupo.ID)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE Grupo SET Nombre = @Nombre, Privado = @Privado, ID_Administrador = @ID_Administrador WHERE ID = @ID";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Nombre", grupo.Nombre);
                        cmd.Parameters.AddWithValue("@Privado", grupo.Privado);
                        cmd.Parameters.AddWithValue("@ID_Administrador", grupo.ID_Administrador);
                        cmd.Parameters.AddWithValue("@ID", grupo.ID);

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

        // DELETE: api/Grupo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrupo(int id)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM Grupo WHERE ID = @ID";
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

