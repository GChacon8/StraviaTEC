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
    public class ActividadController : ControllerBase
    {
        string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Actividad>>> GetAllActividades()
        {
            List<Actividad> actividades = new List<Actividad>();
            string query = "SELECT * FROM Actividad";
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
                            actividades.Add(new Actividad
                            {
      
                                ID = Convert.ToInt32(sdr["ID"]),
                                Hora = Convert.ToDateTime(sdr["Hora"]),
                                Fecha = Convert.ToDateTime(sdr["Fecha"]),
                                Kilometros = Convert.ToInt32(sdr["Kilometros"]),
                                ID_Deportista = Convert.ToString(sdr["ID_Deportista"]),
                                ID_Tipo_Actividad = Convert.ToInt32(sdr["ID_Tipo_Actividad"]),
                                Mapa = Convert.ToString(sdr["Mapa"]),
                                Duracion = Convert.ToInt32(sdr["Duracion"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return actividades;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Actividad>> GetActividad(int id)
        {
            Actividad actividad = new Actividad();
            string query = "SELECT * FROM Actividad WHERE ID = " + id;
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
                            actividad = new Actividad
                            {
                                ID = Convert.ToInt32(sdr["ID"]),
                                Hora = Convert.ToDateTime(sdr["Hora"]),
                                Fecha = Convert.ToDateTime(sdr["Fecha"]),
                                Kilometros = Convert.ToInt32(sdr["Kilometros"]),
                                ID_Deportista = Convert.ToString(sdr["ID_Deportista"]),
                                ID_Tipo_Actividad = Convert.ToInt32(sdr["ID_Tipo_Actividad"]),
                                Mapa = Convert.ToString(sdr["Mapa"]),
                                Duracion = Convert.ToInt32(sdr["Duracion"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (actividad == null)
            {
                return NotFound();
            }
            return actividad;
        }

        [HttpPost]
        public async Task<ActionResult<Actividad>> PostActividad(Actividad actividad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO Actividad VALUES (@ID,  @Hora, @Fecha, @Kilometros,  @ID_Deportista, @ID_Tipo_Actividad, @Mapa, @Duracion )";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID", actividad.ID);
                    cmd.Parameters.AddWithValue("@Duracion", actividad.Duracion);
                    cmd.Parameters.AddWithValue("@Hora", actividad.Hora);
                    cmd.Parameters.AddWithValue("@Fecha", actividad.Fecha);
                    cmd.Parameters.AddWithValue("@Kilometros", actividad.Kilometros);
                    cmd.Parameters.AddWithValue("@Mapa", actividad.Mapa);
                    cmd.Parameters.AddWithValue("@ID_Deportista", actividad.ID_Deportista);
                    cmd.Parameters.AddWithValue("@ID_Tipo_Actividad", actividad.ID_Tipo_Actividad);

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

        [HttpPut("{id}")]
        public async Task<IActionResult> PutActividad(int id, Actividad actividad)
        {
            if (id != actividad.ID)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE Actividad SET Duracion = @Duracion, Hora = @Hora, Fecha = @Fecha, Kilometros = @Kilometros, " +
                               "Mapa = @Mapa, ID_Deportista = @ID_Deportista, " +
                               "ID_Tipo_Actividad = @ID_Tipo_Actividad WHERE ID = @ID";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Duracion", actividad.Duracion);
                        cmd.Parameters.AddWithValue("@Hora", actividad.Hora);
                        cmd.Parameters.AddWithValue("@Fecha", actividad.Fecha);
                        cmd.Parameters.AddWithValue("@Kilometros", actividad.Kilometros);
                        cmd.Parameters.AddWithValue("@Mapa", actividad.Mapa);
                        cmd.Parameters.AddWithValue("@ID_Deportista", actividad.ID_Deportista);
                        cmd.Parameters.AddWithValue("@ID_Tipo_Actividad", actividad.ID_Tipo_Actividad);
                        cmd.Parameters.AddWithValue("@ID", actividad.ID);
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActividad(int id)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM Actividad WHERE ID = " + id;
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

