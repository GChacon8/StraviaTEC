using System.ComponentModel.DataAnnotations;

namespace SQLAPI.Model;

public class Amigos
{
    [Required]
    public string ID_Deportista { get; set; }
    [Required]
    public string ID_Amigo { get; set; }
}
