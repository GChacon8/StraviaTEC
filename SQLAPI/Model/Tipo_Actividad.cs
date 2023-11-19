using System.ComponentModel.DataAnnotations;

namespace SQLAPI.Model;

public class Tipo_Actividad
{
    [Required]
    public int ID {  get; set; }
    public string tipo { get; set; }
}
