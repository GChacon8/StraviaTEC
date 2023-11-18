namespace SQLAPI.Model;

public class Reto
{
    public int ID { get; set; }
    public string Nombre { get; set; }
    public DateTime Fecha_Inicio { get; set; }
    public DateTime Fecha_Final { get; set; }
    public int ID_Tipo_Actividad { get; set; }
    public bool Privada { get; set; }
}
