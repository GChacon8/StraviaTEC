namespace SQLAPI.Model;

public class Carrera
{
    public string Nombre { get; set; }
    public string Fecha { get; set; }
    public string Recorrido_nombre { get; set; }
    public byte[] Datos_Archivo { get; set; }
    public string Cuenta { get; set; }
    public int Precio { get; set; }
    public int ID_Tipo_Actividad { get; set; }
    public int ID_Categoria { get; set; }
}
