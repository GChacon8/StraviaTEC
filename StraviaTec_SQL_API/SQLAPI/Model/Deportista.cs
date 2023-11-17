namespace SQLAPI.Model;

public class Deportista
{
    public string Usuario { get; set; }

    public string Contrasena { get; set; }
    public string Nombre1 { get; set; }
    public string Nombre2 { get; set; }
    public string Apellido1 { get; set; }
    public string Apellido2 { get; set; }
    public string Nacimiento { get; set; }
    public string Foto_nombre { get; set; }
    public byte[] Datos_Archivo { get; set; }
    public string ID_Amigo { get; set; }
    public int ID_Nacionalidad { get; set; }
}
