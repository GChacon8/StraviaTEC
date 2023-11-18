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
    public class NacionalidadController : ControllerBase
    {
        string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        //using (SqlConnection con = DatabaseConnection.GetConnection())
        //{
        //using (SqlConnection con = DatabaseConnection.GetConnection())
        //using (SqlCommand cmd = new SqlCommand(query, con))
        // {

        // GET: api/Nacionalidad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Nacionalidad>>> GetAllNacionalidades()
        {
            List<Nacionalidad> nacionalidades = new List<Nacionalidad>();
            string query = "SELECT * FROM Nacionalidad";
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
                            nacionalidades.Add(new Nacionalidad
                            {
                                ID = Convert.ToInt32(sdr["ID"]),
                                Nombre = Convert.ToString(sdr["Nombre"])
                            });
                        }
                    }
                    con.Close();
                }
            }

            return nacionalidades;
        }

        // GET: api/Nacionalidad/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Nacionalidad>> GetNacionalidad(int id)
        {
            Nacionalidad nacionalidad = new Nacionalidad();
            string query = "SELECT * FROM Nacionalidad WHERE ID = " + id;
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
                            nacionalidad = new Nacionalidad
                            {
                                ID = Convert.ToInt32(sdr["ID"]),
                                Nombre = Convert.ToString(sdr["Nombre"])
                            };
                        }
                    }
                    con.Close();
                }
            }

            if (nacionalidad == null)
            {
                return NotFound();
            }
            return nacionalidad;
        }

        // POST: api/Nacionalidad
        [HttpPost]
        public async Task<ActionResult<Nacionalidad>> PostNacionalidad(Nacionalidad nacionalidad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "INSERT INTO Nacionalidad VALUES (@ID, @Nombre)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID", nacionalidad.ID);
                    cmd.Parameters.AddWithValue("@Nombre", nacionalidad.Nombre);
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

        // PUT: api/Nacionalidad/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNacionalidad(int id, Nacionalidad nacionalidad)
        {
            if (id != nacionalidad.ID)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                string query = "UPDATE Nacionalidad SET Nombre = @Nombre WHERE ID = @ID";
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Nombre", nacionalidad.Nombre);
                        cmd.Parameters.AddWithValue("@ID", nacionalidad.ID);
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

        // DELETE: api/Nacionalidad/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNacionalidad(int id)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = "DELETE FROM Nacionalidad WHERE ID = " + id;
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
