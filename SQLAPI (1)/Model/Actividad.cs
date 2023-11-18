namespace SQLAPI.Model;

public class Actividad
{
    public int ID { get; set; }
    public int Duracion { get; set; }
    public DateTime Hora { get; set; }
    public DateTime Fecha { get; set; }
    public int Kilometros { get; set; }
    public string Mapa {  get; set; }
    public string ID_Deportista { get; set; }
    public int ID_Tipo_Actividad { get; set; }

}
