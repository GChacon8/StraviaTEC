namespace SQLAPI.Model;

public class Carrera
{
    public string Nombre { get; set; }
    public DateTime Fecha { get; set; }
    public string Mapa { get; set; }
    public string Cuenta { get; set; }
    public int Precio { get; set; }
    public int ID_Tipo_Actividad { get; set; }
    public int ID_Categoria { get; set; }
    public bool Privada { get; set; }
    public string Cord {  get; set; }
}
