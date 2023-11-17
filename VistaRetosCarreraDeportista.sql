CREATE VIEW VistaRetosCarrerasDeportista AS
SELECT 
    D.Usuario AS Deportista,
    R.Nombre AS NombreReto,
    R.Fecha_Inicio AS InicioReto,
    R.Fecha_Final AS FinReto,
    C.Nombre AS NombreCarrera,
    C.Fecha AS FechaCarrera
FROM
    Deportista D
LEFT JOIN
    DeportistaXReto DR ON D.Usuario = DR.ID_Deportista
LEFT JOIN
    Reto R ON DR.ID_Reto = R.ID
LEFT JOIN
    DeportistaXCarrera DC ON D.Usuario = DC.ID_Deportista
LEFT JOIN
    Carrera C ON DC.ID_Carrera = C.Nombre;



