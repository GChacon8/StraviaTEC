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
    public class TipoActividadController : ControllerBase
    {
        private string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/TipoActividad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tipo_Actividad>>> GetAllTiposActividad()
        {
            List<Tipo_Actividad> tiposActividad = new List<Tipo_Actividad>();
            string query = "SELECT * FROM Tipo_Actividad";

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
                            tiposActividad.Add(new Tipo_Actividad
                            {
                                ID = Convert.ToInt32(sdr["ID"]),
                                tipo = Convert.ToString(sdr["tipo"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return tiposActividad;
        }

        // GET: api/TipoActividad/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tipo_Actividad>> GetTipoActividad(int id)
        {
            Tipo_Actividad tipoActividad = new Tipo_Actividad();
            string query = "SELECT * FROM Tipo_Actividad WHERE ID = " + id;

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
                            tipoActividad = new Tipo_Actividad
                            {
                                ID = Convert.ToInt32(sdr["ID"]),
                                tipo = Convert.ToString(sdr["tipo"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (tipoActividad == null)
            {
                return NotFound();
            }
            return tipoActividad;
        }

        // POST: api/TipoActividad
        [HttpPost]
        public async Task<ActionResult<Tipo_Actividad>> PostTipoActividad(Tipo_Actividad tipoActividad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO Tipo_Actividad VALUES (@ID, @tipo)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID", tipoActividad.ID);
                    cmd.Parameters.AddWithValue("@tipo", tipoActividad.tipo);

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

        // PUT: api/TipoActividad/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoActividad(int id, Tipo_Actividad tipoActividad)
        {
            if (id != tipoActividad.ID)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE Tipo_Actividad SET tipo = @tipo WHERE ID = @ID";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@tipo", tipoActividad.tipo);
                        cmd.Parameters.AddWithValue("@ID", tipoActividad.ID);

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

        // DELETE: api/TipoActividad/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoActividad(int id)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM Tipo_Actividad WHERE ID = @ID";
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

