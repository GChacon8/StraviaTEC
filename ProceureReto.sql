CREATE PROCEDURE UnirseReto
    @NombreDeportista varchar(30),
    @ID_Reto int
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el deportista existe
    IF NOT EXISTS (SELECT 1 FROM Deportista WHERE Usuario = @NombreDeportista)
    BEGIN
        PRINT 'Error: El deportista no existe.';
        RETURN;
    END

    -- Verificar si el reto existe
    IF NOT EXISTS (SELECT 1 FROM Reto WHERE ID = @ID_Reto)
    BEGIN
        PRINT 'Error: El reto no existe.';
        RETURN;
    END

    -- Obtener el ID del deportista
    DECLARE @ID_Deportista varchar(30);
    SET @ID_Deportista = (SELECT Usuario FROM Deportista WHERE Usuario = @NombreDeportista);

    -- Verificar si el deportista ya está registrado en el reto
    IF EXISTS (
        SELECT 1
        FROM DeportistaXReto
        WHERE ID_Deportista = @ID_Deportista AND ID_Reto = @ID_Reto
    )
    BEGIN
        PRINT 'Error: El deportista ya está registrado en el reto.';
        RETURN;
    END

    -- Verificar si el reto es privado
    IF EXISTS (
        SELECT 1
        FROM Reto
        WHERE ID = @ID_Reto AND Privada = 1
    )
    BEGIN
        PRINT 'Error: El reto es privado y se requiere ser parte del grupo para unirse.';
        RETURN;
    END

    -- Insertar el registro para asociar al deportista con el reto
    INSERT INTO DeportistaXReto (ID_Deportista, ID_Reto)
    VALUES (@ID_Deportista, @ID_Reto);

    PRINT 'Deportista se ha unido exitosamente al reto.';
END;
