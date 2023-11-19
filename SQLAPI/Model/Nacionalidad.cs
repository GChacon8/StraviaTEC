using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace SQLAPI.Model;

public class Nacionalidad
{
    [HiddenInput(DisplayValue = true)]
    [Required]
    public int ID { get; set; }
    public string Nombre { get; set; }
}



