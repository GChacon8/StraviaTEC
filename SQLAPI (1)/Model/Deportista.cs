using Microsoft.VisualBasic;
using System.Diagnostics.Contracts;

namespace SQLAPI.Model;

public class Deportista
{
    public string Usuario { get; set; }

    public string Contrasena { get; set; }
    public string Nombre1 { get; set; }
    public string Nombre2 { get; set; }
    public string Apellido1 { get; set; }
    public string Apellido2 { get; set; }
    public DateTime Nacimiento { get; set; }
    public string Foto { get; set; }
    public int ID_Nacionalidad { get; set; }
}
