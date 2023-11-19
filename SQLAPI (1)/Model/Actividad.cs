using System.ComponentModel.DataAnnotations;

namespace SQLAPI.Model;

public class Actividad
{

    [Required]
    public int ID { get; set; }
    public int Duracion { get; set; }
    public DateTime Fecha_Hora { get; set; }
    public int Kilometros { get; set; }
    public string Mapa {  get; set; }
    public string ID_Deportista { get; set; }
    public int ID_Tipo_Actividad { get; set; }
    public string Cord {  get; set; }
}
