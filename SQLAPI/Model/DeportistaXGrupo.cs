using System.ComponentModel.DataAnnotations;

namespace SQLAPI.Model;

public class DeportistaXGrupo
{
    [Required]
    public string ID_Deportista {  get; set; }
    [Required] 
    public int ID_Grupo { get; set; }
}
