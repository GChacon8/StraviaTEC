CREATE VIEW VistaGruposCarrera AS
SELECT
    G.ID AS ID_Grupo,
    G.Nombre AS NombreGrupo,
    C.Nombre AS NombreCarrera
FROM
    Grupo G
INNER JOIN
    GrupoXCarrera GC ON G.ID = GC.ID_Grupo
INNER JOIN
    Carrera C ON GC.ID_Carrera = C.Nombre;
