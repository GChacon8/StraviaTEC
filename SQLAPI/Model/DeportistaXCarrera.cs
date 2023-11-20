using System.ComponentModel.DataAnnotations;

namespace SQLAPI.Model;

public class DeportistaXCarrera
{
    [Required]
    public string ID_Deportista { get; set; }
    [Required]
    public string ID_Carrera { get; set; }
    public int? Tiempo { get; set; }
}
