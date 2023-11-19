CREATE PROCEDURE UnirseCarrera
    @NombreDeportista varchar(30),
    @NombreCarrera varchar(20)
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el deportista existe
    IF NOT EXISTS (SELECT 1 FROM Deportista WHERE Usuario = @NombreDeportista)
    BEGIN
        PRINT 'Error: El deportista no existe.';
        RETURN;
    END

    -- Verificar si la carrera existe
    IF NOT EXISTS (SELECT 1 FROM Carrera WHERE Nombre = @NombreCarrera)
    BEGIN
        PRINT 'Error: La carrera no existe.';
        RETURN;
    END

    -- Obtener el ID del deportista
    DECLARE @ID_Deportista varchar(30);
    SET @ID_Deportista = (SELECT Usuario FROM Deportista WHERE Usuario = @NombreDeportista);

    -- Verificar si la carrera es privada
    DECLARE @CarreraPrivada bit;
    SET @CarreraPrivada = (SELECT Privada FROM Carrera WHERE Nombre = @NombreCarrera);

    -- Verificar si el deportista ya está registrado en la carrera
    IF EXISTS (
        SELECT 1
        FROM DeportistaXCarrera
        WHERE ID_Deportista = @ID_Deportista AND ID_Carrera = @NombreCarrera
    )
    BEGIN
        PRINT 'Error: El deportista ya está registrado en la carrera.';
        RETURN;
    END

    -- Si la carrera es privada, verificar si el deportista pertenece a un grupo permitido
    IF @CarreraPrivada = 1
    BEGIN
        -- Obtener el ID del grupo al que pertenece el deportista
        DECLARE @ID_Grupo int;
        SET @ID_Grupo = (SELECT ID_Grupo FROM DeportistaXGrupo WHERE ID_Deportista = @ID_Deportista);

        -- Verificar si el deportista está en un grupo permitido para la carrera
        IF NOT EXISTS (
            SELECT 1
            FROM GrupoXCarrera gc
            INNER JOIN Carrera c ON gc.ID_Carrera = c.Nombre
            WHERE gc.ID_Grupo = @ID_Grupo AND c.Nombre = @NombreCarrera
        )
        BEGIN
            PRINT 'Error: El deportista no pertenece a un grupo permitido para la carrera privada.';
            RETURN;
        END
    END

    -- Insertar el registro para asociar al deportista con la carrera
    INSERT INTO DeportistaXCarrera (ID_Deportista, ID_Carrera)
    VALUES (@ID_Deportista, @NombreCarrera);

    PRINT 'Deportista se ha unido exitosamente a la carrera.';
END;
