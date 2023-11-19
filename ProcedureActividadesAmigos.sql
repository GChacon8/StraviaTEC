-- Crear el procedimiento almacenado
CREATE PROCEDURE ObtenerActividadesDeAmigos
    @UsuarioDeportista varchar(30)
AS
BEGIN
    -- Crear una tabla temporal para almacenar los IDs de amigos
    CREATE TABLE #AmigosTemp (
        IDAmigo varchar(30)
    );

    -- Insertar IDs de amigos en la tabla temporal
    INSERT INTO #AmigosTemp (IDAmigo)
    SELECT ID_Amigo
    FROM Amigos
    WHERE ID_Deportista = @UsuarioDeportista;

    -- Seleccionar todas las actividades de los amigos
    SELECT A.*
    FROM Actividad A
    JOIN #AmigosTemp Amigos ON A.ID_Deportista = Amigos.IDAmigo;

    -- Eliminar la tabla temporal
    DROP TABLE #AmigosTemp;
END;
