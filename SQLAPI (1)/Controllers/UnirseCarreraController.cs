﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;

[Route("api/[controller]")]
[ApiController]
public class UnirseCarreraController : ControllerBase
{
    private readonly string _connectionString;

    public UnirseCarreraController(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
    }

    [HttpPost("UnirseCarrera")]
    public IActionResult UnirseCarrera([FromForm] string nombreDeportista, [FromForm] string nombreCarrera)
    {
        try
        {
            string mensaje = "";

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand cmd = new SqlCommand("UnirseCarrera", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Parámetros del procedimiento almacenado
                    cmd.Parameters.Add(new SqlParameter("@NombreDeportista", SqlDbType.VarChar) { Value = nombreDeportista });
                    cmd.Parameters.Add(new SqlParameter("@NombreCarrera", SqlDbType.VarChar) { Value = nombreCarrera });

                    // Obtener el mensaje del procedimiento almacenado
                    var mensajeOutput = new SqlParameter("@Mensaje", SqlDbType.VarChar, 1000)
                    {
                        Direction = ParameterDirection.Output
                    };
                    cmd.Parameters.Add(mensajeOutput);

                    // Ejecutar el procedimiento almacenado
                    cmd.ExecuteNonQuery();

                    // Obtener el mensaje de salida
                    mensaje = mensajeOutput.Value.ToString();
                }
            }

            if (mensaje.StartsWith("Error"))
            {
                return BadRequest(mensaje);
            }
            else
            {
                return Ok(mensaje);
            }
        }
        catch (Exception ex)
        {
            return BadRequest($"Error al ejecutar el procedimiento almacenado: {ex.Message}");
        }
    }
}
