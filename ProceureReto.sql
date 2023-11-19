CREATE PROCEDURE UnirseReto
    @NombreDeportista varchar(30),
    @NombreReto varchar(20)
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
    IF NOT EXISTS (SELECT 1 FROM Reto WHERE Nombre = @NombreReto)
    BEGIN
        PRINT 'Error: El reto no existe.';
        RETURN;
    END

    -- Obtener el ID del deportista
    DECLARE @ID_Deportista varchar(30);
    SET @ID_Deportista = (SELECT Usuario FROM Deportista WHERE Usuario = @NombreDeportista);

    -- Verificar si la carrera es privada
    DECLARE @RetoPrivada bit;
    SET @RetoPrivada = (SELECT Privada FROM Reto WHERE Nombre = @NombreReto);

    -- Verificar si el deportista ya está registrado en la carrera
    IF EXISTS (
        SELECT 1
        FROM DeportistaXReto
        WHERE ID_Deportista = @ID_Deportista AND ID_Reto = @NombreReto
    )
    BEGIN
        PRINT 'Error: El deportista ya está registrado en el reto.';
        RETURN;
    END

    -- Si la carrera es privada, verificar si el deportista pertenece a un grupo permitido
    IF @RetoPrivada = 1
    BEGIN
        -- Obtener el ID del grupo al que pertenece el deportista
        DECLARE @ID_Grupo int;
        SET @ID_Grupo = (SELECT ID_Grupo FROM DeportistaXGrupo WHERE ID_Deportista = @ID_Deportista);

        -- Verificar si el deportista está en un grupo permitido para la carrera
        IF NOT EXISTS (
            SELECT 1
            FROM GrupoXReto as gc
            INNER JOIN Carrera c ON gc.ID_Reto = c.Nombre
            WHERE gc.ID_Grupo = @ID_Grupo AND c.Nombre = @NombreReto
        )
        BEGIN
            PRINT 'Error: El deportista no pertenece a un grupo permitido para el reto privado.';
            RETURN;
        END
    END

    -- Insertar el registro para asociar al deportista con la carrera
    INSERT INTO DeportistaXReto(ID_Deportista, ID_Reto)
    VALUES (@ID_Deportista, @NombreReto);

    PRINT 'Deportista se ha unido exitosamente a la carrera.';
END;

