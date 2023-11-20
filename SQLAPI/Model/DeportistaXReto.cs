using System.ComponentModel.DataAnnotations;

namespace SQLAPI.Model;

public class DeportistaXReto
{
    [Required]
    public string ID_Deportista { get; set; }
    [Required]
    public int ID_Reto { get; set; }
}
