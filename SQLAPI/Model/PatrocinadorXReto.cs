using System.ComponentModel.DataAnnotations;

namespace SQLAPI.Model;

public class PatrocinadorXReto
{
    [Required]
    public string ID_Patrocinador {  get; set; }
    [Required]
    public int ID_Reto {  get; set; } 
}
