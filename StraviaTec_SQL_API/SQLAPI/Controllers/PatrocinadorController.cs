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
    public class PatrocinadorController : ControllerBase
    {
        private string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/Patrocinador
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patrocinador>>> GetAllPatrocinadores()
        {
            List<Patrocinador> patrocinadores = new List<Patrocinador>();
            string query = "SELECT * FROM Patrocinador";

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
                            patrocinadores.Add(new Patrocinador
                            {
                                Nombre_Comercial = Convert.ToString(sdr["Nombre_Comercial"]),
                                Representante = Convert.ToString(sdr["Representante"]),
                                Telefono = Convert.ToString(sdr["Telefono"]),
                                Logo = Convert.ToString(sdr["Logo"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return patrocinadores;
        }

        // GET: api/Patrocinador/nombreComercial
        [HttpGet("{nombreComercial}")]
        public async Task<ActionResult<Patrocinador>> GetPatrocinador(string nombreComercial)
        {
            Patrocinador patrocinador = new Patrocinador();
            string query = "SELECT * FROM Patrocinador WHERE Nombre_Comercial = '" + nombreComercial + "'";

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
                            patrocinador = new Patrocinador
                            {
                                Nombre_Comercial = Convert.ToString(sdr["Nombre_Comercial"]),
                                Representante = Convert.ToString(sdr["Representante"]),
                                Telefono = Convert.ToString(sdr["Telefono"]),
                                Logo = Convert.ToString(sdr["Logo"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (patrocinador == null)
            {
                return NotFound();
            }
            return patrocinador;
        }

        // POST: api/Patrocinador
        [HttpPost]
        public async Task<ActionResult<Patrocinador>> PostPatrocinador(Patrocinador patrocinador)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO Patrocinador VALUES (@Nombre_Comercial, @Representante, @Telefono, @Logo)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Nombre_Comercial", patrocinador.Nombre_Comercial);
                    cmd.Parameters.AddWithValue("@Representante", patrocinador.Representante);
                    cmd.Parameters.AddWithValue("@Telefono", patrocinador.Telefono);
                    cmd.Parameters.AddWithValue("@Logo", patrocinador.Logo);


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

        // PUT: api/Patrocinador/nombreComercial
        [HttpPut("{nombreComercial}")]
        public async Task<IActionResult> PutPatrocinador(string nombreComercial, Patrocinador patrocinador)
        {
            if (nombreComercial != patrocinador.Nombre_Comercial)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE Patrocinador SET Representante = @Representante, Telefono = @Telefono, Logo = @Logo WHERE Nombre_Comercial = @Nombre_Comercial";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Representante", patrocinador.Representante);
                        cmd.Parameters.AddWithValue("@Telefono", patrocinador.Telefono);
                        cmd.Parameters.AddWithValue("@Logo", patrocinador.Logo);
                        cmd.Parameters.AddWithValue("@Nombre_Comercial", patrocinador.Nombre_Comercial);

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

        // DELETE: api/Patrocinador/nombreComercial
        [HttpDelete("{nombreComercial}")]
        public async Task<IActionResult> DeletePatrocinador(string nombreComercial)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM Patrocinador WHERE Nombre_Comercial = @Nombre_Comercial";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Nombre_Comercial", nombreComercial);

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

