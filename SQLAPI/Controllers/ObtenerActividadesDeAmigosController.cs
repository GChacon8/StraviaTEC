using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using SQLAPI.Model;

[Route("api/[controller]")]
[ApiController]
public class ObtenerActividadesController : ControllerBase
{
    private string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

    [HttpPost("ObtenerActividadesDeAmigos")]
    [ProducesResponseType(typeof(List<Actividad>), 200)] // Cambia Actividad por el tipo de tus resultados
    public async Task<IActionResult> ObtenerActividadesDeAmigos([FromBody] ObtenerActividadesDeAmigosRequest request)
    {
        try
        {
            List<Actividad> actividades = new List<Actividad>(); // Cambia Actividad por el tipo de tus resultados

            using (SqlConnection connection = new SqlConnection(constr))
            {
                await connection.OpenAsync();

                using (SqlCommand cmd = new SqlCommand("ObtenerActividadesDeAmigos", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@UsuariDeportista", SqlDbType.VarChar) { Value = request.NombreDeportista });

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            // Construir objetos Actividad (o tu tipo) a partir de los resultados
                            Actividad actividad = new Actividad
                            {
                                ID = reader.GetInt32(reader.GetOrdinal("ID")),
                                Duracion = reader.GetInt32(reader.GetOrdinal("Duracion")),
                                Fecha_Hora = reader.GetDateTime(reader.GetOrdinal("Fecha_Hora")),
                                Kilometros = reader.GetInt32(reader.GetOrdinal("Kilometros")),
                                Mapa = reader.GetString(reader.GetOrdinal("Mapa")),
                                ID_Deportista = reader.GetString(reader.GetOrdinal("NombreDeportista")),
                                ID_Tipo_Actividad = reader.GetInt32(reader.GetOrdinal("ID_Tipo_Actividad")),
                                Cord = reader.GetString(reader.GetOrdinal("Cord"))
                            };

                            actividades.Add(actividad);
                        }
                    }
                }
            }

            return Ok(actividades); // Devolver la lista como JSON
        }
        catch (Exception ex)
        {
            return BadRequest($"Error al ejecutar el procedimiento almacenado: {ex.Message}");
        }
    }
}


