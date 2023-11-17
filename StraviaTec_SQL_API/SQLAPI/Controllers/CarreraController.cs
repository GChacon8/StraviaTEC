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
    public class CarreraController : ControllerBase
    {
        private string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/Carrera
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Carrera>>> GetAllCarreras()
        {
            List<Carrera> carreras = new List<Carrera>();
            string query = "SELECT * FROM Carrera";

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
                            carreras.Add(new Carrera
                            {
                                Nombre = Convert.ToString(sdr["Nombre"]),
                                Fecha = Convert.ToString(sdr["Fecha"]),
                                Recorrido_nombre = Convert.ToString(sdr["Recorrido_nombre"]),
                                Datos_Archivo = (byte[])sdr["Datos_Archivo"],
                                Cuenta = Convert.ToString(sdr["Cuenta"]),
                                Precio = Convert.ToInt32(sdr["Precio"]),
                                ID_Tipo_Actividad = Convert.ToInt32(sdr["ID_Tipo_Actividad"]),
                                ID_Categoria = Convert.ToInt32(sdr["ID_Categoria"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return carreras;
        }

        // GET: api/Carrera/nombre
        [HttpGet("{nombre}")]
        public async Task<ActionResult<Carrera>> GetCarrera(string nombre)
        {
            Carrera carrera = new Carrera();
            string query = "SELECT * FROM Carrera WHERE Nombre = '" + nombre + "'";

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
                            carrera = new Carrera
                            {
                                Nombre = Convert.ToString(sdr["Nombre"]),
                                Fecha = Convert.ToString(sdr["Fecha"]),
                                Recorrido_nombre = Convert.ToString(sdr["Recorrido_nombre"]),
                                Datos_Archivo = (byte[])sdr["Datos_Archivo"],
                                Cuenta = Convert.ToString(sdr["Cuenta"]),
                                Precio = Convert.ToInt32(sdr["Precio"]),
                                ID_Tipo_Actividad = Convert.ToInt32(sdr["ID_Tipo_Actividad"]),
                                ID_Categoria = Convert.ToInt32(sdr["ID_Categoria"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (carrera == null)
            {
                return NotFound();
            }
            return carrera;
        }

        // POST: api/Carrera
        [HttpPost]
        public async Task<ActionResult<Carrera>> PostCarrera(Carrera carrera)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO Carrera VALUES (@Nombre, @Fecha, @Recorrido_nombre, @Datos_Archivo, @Cuenta, @Precio, @ID_Tipo_Actividad, @ID_Categoria)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Nombre", carrera.Nombre);
                    cmd.Parameters.AddWithValue("@Fecha", carrera.Fecha);
                    cmd.Parameters.AddWithValue("@Recorrido_nombre", carrera.Recorrido_nombre);
                    cmd.Parameters.AddWithValue("@Datos_Archivo", carrera.Datos_Archivo);
                    cmd.Parameters.AddWithValue("@Cuenta", carrera.Cuenta);
                    cmd.Parameters.AddWithValue("@Precio", carrera.Precio);
                    cmd.Parameters.AddWithValue("@ID_Tipo_Actividad", carrera.ID_Tipo_Actividad);
                    cmd.Parameters.AddWithValue("@ID_Categoria", carrera.ID_Categoria);

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

        // PUT: api/Carrera/nombre
        [HttpPut("{nombre}")]
        public async Task<IActionResult> PutCarrera(string nombre, Carrera carrera)
        {
            if (nombre != carrera.Nombre)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE Carrera SET Fecha = @Fecha, Recorrido_nombre = @Recorrido_nombre, Datos_Archivo = @Datos_Archivo, Cuenta = @Cuenta, Precio = @Precio, ID_Tipo_Actividad = @ID_Tipo_Actividad, ID_Categoria = @ID_Categoria WHERE Nombre = @Nombre";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Fecha", carrera.Fecha);
                        cmd.Parameters.AddWithValue("@Recorrido_nombre", carrera.Recorrido_nombre);
                        cmd.Parameters.AddWithValue("@Datos_Archivo", carrera.Datos_Archivo);
                        cmd.Parameters.AddWithValue("@Cuenta", carrera.Cuenta);
                        cmd.Parameters.AddWithValue("@Precio", carrera.Precio);
                        cmd.Parameters.AddWithValue("@ID_Tipo_Actividad", carrera.ID_Tipo_Actividad);
                        cmd.Parameters.AddWithValue("@ID_Categoria", carrera.ID_Categoria);
                        cmd.Parameters.AddWithValue("@Nombre", carrera.Nombre);

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

        // DELETE: api/Carrera/nombre
        [HttpDelete("{nombre}")]
        public async Task<IActionResult> DeleteCarrera(string nombre)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM Carrera WHERE Nombre = @Nombre";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Nombre", nombre);

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

