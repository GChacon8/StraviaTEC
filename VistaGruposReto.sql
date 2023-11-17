CREATE VIEW VistaGrupoReto AS
SELECT
    G.ID AS ID_Grupo,
    G.Nombre AS NombreGrupo,
    R.Nombre AS NombreReto
FROM
    Grupo G
INNER JOIN
    GrupoXReto GR ON G.ID = GR.ID_Grupo
INNER JOIN
    Reto R ON GR.ID_Reto = R.ID;
