using System.ComponentModel.DataAnnotations;

namespace SQLAPI.Model;

public class Patrocinador
{
    [Required]
    public string Nombre_Comercial { get; set; }
    public string Representante { get; set; }
    public string Telefono { get; set; }
    public string Logo { get; set; }
}
