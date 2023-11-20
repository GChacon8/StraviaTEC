using System.ComponentModel.DataAnnotations;

namespace SQLAPI.Model;

public class PatrocinadorXCarrera
{
    [Required]
    public string ID_Patrocinador { get; set; }
    [Required]
    public string ID_Carrera { get; set; }
}
