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
    public class DeportistaController : ControllerBase
    {
        private string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/Deportista
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deportista>>> GetAllDeportistas()
        {
            List<Deportista> deportistas = new List<Deportista>();
            string query = "SELECT * FROM Deportista";

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
                            deportistas.Add(new Deportista
                            {
                                Usuario = Convert.ToString(sdr["Usuario"]),
                                Contrasena = Convert.ToString(sdr["Contrasena"]),
                                Nombre1 = Convert.ToString(sdr["Nombre1"]),
                                Nombre2 = Convert.ToString(sdr["Nombre2"]),
                                Apellido1 = Convert.ToString(sdr["Apellido1"]),
                                Apellido2 = Convert.ToString(sdr["Apellido2"]),
                                Nacimiento = Convert.ToString(sdr["Nacimiento"]),
                                Foto_nombre = Convert.ToString(sdr["Foto_nombre"]),
                                Datos_Archivo = (byte[])sdr["Datos_Archivo"],
                                ID_Amigo = Convert.ToString(sdr["ID_Amigo"]),
                                ID_Nacionalidad = Convert.ToInt32(sdr["ID_Nacionalidad"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return deportistas;
        }

        // GET: api/Deportista/usuario
        [HttpGet("{usuario}")]
        public async Task<ActionResult<Deportista>> GetDeportista(string usuario)
        {
            Deportista deportista = new Deportista();
            string query = "SELECT * FROM Deportista WHERE Usuario = '" + usuario + "'";

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
                            deportista = new Deportista
                            {
                                Usuario = Convert.ToString(sdr["Usuario"]),
                                Contrasena = Convert.ToString(sdr["Contrasena"]),
                                Nombre1 = Convert.ToString(sdr["Nombre1"]),
                                Nombre2 = Convert.ToString(sdr["Nombre2"]),
                                Apellido1 = Convert.ToString(sdr["Apellido1"]),
                                Apellido2 = Convert.ToString(sdr["Apellido2"]),
                                Nacimiento = Convert.ToString(sdr["Nacimiento"]),
                                Foto_nombre = Convert.ToString(sdr["Foto_nombre"]),
                                Datos_Archivo = (byte[])sdr["Datos_Archivo"],
                                ID_Amigo = Convert.ToString(sdr["ID_Amigo"]),
                                ID_Nacionalidad = Convert.ToInt32(sdr["ID_Nacionalidad"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (deportista == null)
            {
                return NotFound();
            }
            return deportista;
        }

        // POST: api/Deportista
        [HttpPost]
        public async Task<ActionResult<Deportista>> PostDeportista(Deportista deportista)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO Deportista VALUES (@Usuario, @Contrasena, @Nombre1, @Nombre2, @Apellido1, @Apellido2, @Nacimiento, @Foto_nombre, @Datos_Archivo, @ID_Amigo, @ID_Nacionalidad)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Usuario", deportista.Usuario);
                    cmd.Parameters.AddWithValue("@Contrasena", deportista.Contrasena);
                    cmd.Parameters.AddWithValue("@Nombre1", deportista.Nombre1);
                    cmd.Parameters.AddWithValue("@Nombre2", deportista.Nombre2);
                    cmd.Parameters.AddWithValue("@Apellido1", deportista.Apellido1);
                    cmd.Parameters.AddWithValue("@Apellido2", deportista.Apellido2);
                    cmd.Parameters.AddWithValue("@Nacimiento", deportista.Nacimiento);
                    cmd.Parameters.AddWithValue("@Foto_nombre", deportista.Foto_nombre);
                    cmd.Parameters.AddWithValue("@Datos_Archivo", deportista.Datos_Archivo);
                    cmd.Parameters.AddWithValue("@ID_Amigo", deportista.ID_Amigo);
                    cmd.Parameters.AddWithValue("@ID_Nacionalidad", deportista.ID_Nacionalidad);

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

        // PUT: api/Deportista/usuario
        [HttpPut("{usuario}")]
        public async Task<IActionResult> PutDeportista(string usuario, Deportista deportista)
        {
            if (usuario != deportista.Usuario)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE Deportista SET Contrasena = @Contrasena, Nombre1 = @Nombre1, Nombre2 = @Nombre2, Apellido1 = @Apellido1, Apellido2 = @Apellido2, Nacimiento = @Nacimiento, Foto_nombre = @Foto_nombre, Datos_Archivo = @Datos_Archivo, ID_Amigo = @ID_Amigo, ID_Nacionalidad = @ID_Nacionalidad WHERE Usuario = @Usuario";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Contrasena", deportista.Contrasena);
                        cmd.Parameters.AddWithValue("@Nombre1", deportista.Nombre1);
                        cmd.Parameters.AddWithValue("@Nombre2", deportista.Nombre2);
                        cmd.Parameters.AddWithValue("@Apellido1", deportista.Apellido1);
                        cmd.Parameters.AddWithValue("@Apellido2", deportista.Apellido2);
                        cmd.Parameters.AddWithValue("@Nacimiento", deportista.Nacimiento);
                        cmd.Parameters.AddWithValue("@Foto_nombre", deportista.Foto_nombre);
                        cmd.Parameters.AddWithValue("@Datos_Archivo", deportista.Datos_Archivo);
                        cmd.Parameters.AddWithValue("@ID_Amigo", deportista.ID_Amigo);
                        cmd.Parameters.AddWithValue("@ID_Nacionalidad", deportista.ID_Nacionalidad);
                        cmd.Parameters.AddWithValue("@Usuario", deportista.Usuario);

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

        // DELETE: api/Deportista/usuario
        [HttpDelete("{usuario}")]
        public async Task<IActionResult> DeleteDeportista(string usuario)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM Deportista WHERE Usuario = @Usuario";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Usuario", usuario);

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
