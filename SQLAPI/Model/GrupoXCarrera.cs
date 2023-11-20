using System.ComponentModel.DataAnnotations;

namespace SQLAPI.Model;

public class GrupoXCarrera
{
    [Required]
    public int ID_Grupo { get; set; }
    [Required]
    public string ID_Carrera { get; set; }
}
