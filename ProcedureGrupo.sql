CREATE PROCEDURE UnirseGrupo
    @NombreDeportista varchar(30),
    @ID_Grupo int
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el deportista existe
    IF NOT EXISTS (SELECT 1 FROM Deportista WHERE Usuario = @NombreDeportista)
    BEGIN
        PRINT 'Error: El deportista no existe.';
        RETURN;
    END

    -- Verificar si el grupo existe
    IF NOT EXISTS (SELECT 1 FROM Grupo WHERE ID = @ID_Grupo)
    BEGIN
        PRINT 'Error: El grupo no existe.';
        RETURN;
    END

    -- Verificar si el deportista ya pertenece al grupo
    IF EXISTS (
        SELECT 1
        FROM DeportistaXGrupo
        WHERE ID_Deportista = @NombreDeportista AND ID_Grupo = @ID_Grupo
    )
    BEGIN
        PRINT 'Error: El deportista ya pertenece al grupo.';
        RETURN;
    END

    -- Insertar el registro para asociar al deportista con el grupo
    INSERT INTO DeportistaXGrupo (ID_Deportista, ID_Grupo)
    VALUES (@NombreDeportista, @ID_Grupo);

    PRINT 'Deportista se ha unido exitosamente al grupo.';
END;
