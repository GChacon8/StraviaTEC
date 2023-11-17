namespace SQLAPI.Model;

public class Actividad
{
    public int ID { get; set; }
    public TimeOnly Duracion { get; set; }
    public TimeOnly Hora { get; set; }
    public string Fecha { get; set; }
    public int Kilometros { get; set; }
    public string Mapa_Nombre {  get; set; }
    public byte[] Datos_Archivo { get; set; }
    public string ID_Deportista { get; set; }
    public int ID_Tipo_Actividad { get; set; }

}
