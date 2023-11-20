using System.ComponentModel.DataAnnotations;

namespace SQLAPI.Model;

public class GrupoXReto
{
    [Required]
    public int ID_Grupo { get; set; }
    [Required]
    public int ID_Reto { get; set; }
}
