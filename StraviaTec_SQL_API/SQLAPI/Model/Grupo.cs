﻿namespace SQLAPI.Model;

public class Grupo
{
    public int ID { get; set; }
    public string Nombre { get; set; }
    public bool Privado { get; set; }
    public string ID_Administrador { get; set; }
}
