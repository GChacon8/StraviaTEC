using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using SQLAPI.Model;
using System.Text.RegularExpressions;

namespace SQLAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetoController : ControllerBase
    {
        private string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/Reto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reto>>> GetAllRetos()
        {
            List<Reto> retos = new List<Reto>();
            string query = "SELECT * FROM Reto";

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
                            retos.Add(new Reto
                            {
                                ID = Convert.ToInt32(sdr["ID"]),
                                Nombre = Convert.ToString(sdr["Nombre"]),
                                Fecha_Inicio = Convert.ToDateTime(sdr["Fecha_Inicio"]),
                                Fecha_Final = Convert.ToDateTime(sdr["Fecha_Final"]),
                                ID_Tipo_Actividad = Convert.ToInt32(sdr["ID_Tipo_Actividad"]),
                                Privada = Convert.ToBoolean(sdr["Privada"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return retos;
        }

        // GET: api/Reto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reto>> GetReto(int id)
        {
            Reto reto = new Reto();
            string query = "SELECT * FROM Reto WHERE ID = " + id;

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
                            reto = new Reto
                            {
                                ID = Convert.ToInt32(sdr["ID"]),
                                Nombre = Convert.ToString(sdr["Nombre"]),
                                Fecha_Inicio = Convert.ToDateTime(sdr["Fecha_Inicio"]),
                                Fecha_Final = Convert.ToDateTime(sdr["Fecha_Final"]),
                                ID_Tipo_Actividad = Convert.ToInt32(sdr["ID_Tipo_Actividad"]),
                                Privada = Convert.ToBoolean(sdr["Privada"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (reto == null)
            {
                return NotFound();
            }
            return reto;
        }

        // POST: api/Reto
        [HttpPost]
        public async Task<ActionResult<Reto>> PostReto(Reto reto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO Reto VALUES (@ID, @Nombre, @Fecha_Inicio, @Fecha_Final, @ID_Tipo_Actividad, @Privada)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID", reto.ID);
                    cmd.Parameters.AddWithValue("@Nombre", reto.Nombre);
                    cmd.Parameters.AddWithValue("@Fecha_Inicio", reto.Fecha_Inicio);
                    cmd.Parameters.AddWithValue("@Fecha_Final", reto.Fecha_Final);
                    cmd.Parameters.AddWithValue("@ID_Tipo_Actividad", reto.ID_Tipo_Actividad);
                    cmd.Parameters.AddWithValue("@Privada", reto.Privada);

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

        // PUT: api/Reto/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReto(int id, Reto reto)
        {
            if (id != reto.ID)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE Reto SET Nombre = @Nombre, Fecha_Inicio = @Fecha_Inicio, Fecha_Final = @Fecha_Final, ID_Tipo_Actividad = @ID_Tipo_Actividad, Privada = @Privada WHERE ID = @ID";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Nombre", reto.Nombre);
                        cmd.Parameters.AddWithValue("@Fecha_Inicio", reto.Fecha_Inicio);
                        cmd.Parameters.AddWithValue("@Fecha_Final", reto.Fecha_Final);
                        cmd.Parameters.AddWithValue("@ID_Tipo_Actividad", reto.ID_Tipo_Actividad);
                        cmd.Parameters.AddWithValue("@Privada", reto.Privada);
                        cmd.Parameters.AddWithValue("@ID", reto.ID);
                        

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

        // DELETE: api/Reto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReto(int id)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM Reto WHERE ID = @ID";
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

