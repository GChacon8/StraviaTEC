using System.ComponentModel.DataAnnotations;

namespace SQLAPI.Model;

public class Categoria
{
    [Required]
    public int ID { get; set; }
    public string Nombre { get; set; }
    public int Edad_Min {  get; set; }
    public int Edad_Max { get; set; }
}
