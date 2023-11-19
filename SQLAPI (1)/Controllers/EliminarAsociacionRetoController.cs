using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using SQLAPI.Model;

[Route("api/[controller]")]
[ApiController]
public class EliminarAsociacionRetoController : ControllerBase
{
    private string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

    [HttpPost("EliminarAsociacionReto")]
    [ProducesResponseType(typeof(string), 200)]
    public async Task<IActionResult> EliminarAsociacionReto()
    {
        try
        {
            using (SqlConnection connection = new SqlConnection(constr))
            {
                await connection.OpenAsync();

                using (SqlCommand cmd = new SqlCommand("EliminarAsociacionReto", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    
                    // Ejecutar el procedimiento almacenado
                    await cmd.ExecuteNonQueryAsync();
                }
            }

            return Ok("Operación exitosa");
        }
        catch (Exception ex)
        {
            return BadRequest($"Error al ejecutar el procedimiento almacenado: {ex.Message}");
        }
    }
}
