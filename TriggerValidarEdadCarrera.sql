CREATE TRIGGER ValidarEdadCarrera
ON DeportistaXCarrera
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @FechaHoy DATE;
    SET @FechaHoy = GETDATE();

    -- Validar la edad del deportista al intentar registrarse en una carrera
    IF EXISTS (
        SELECT 1
        FROM inserted i
        INNER JOIN Deportista d ON i.ID_Deportista = d.Usuario
        INNER JOIN Carrera c ON i.ID_Carrera = c.Nombre
        INNER JOIN Categoria cat ON c.ID_Categoria = cat.ID
        WHERE DATEDIFF(YEAR, d.Nacimiento, @FechaHoy) > cat.Edad
    )
    BEGIN
        RAISERROR('La edad del deportista supera la categoría de la carrera.', 16, 1);
        ROLLBACK;
    END
    ELSE
    BEGIN
        -- Insertar el registro si la validación pasa
        INSERT INTO DeportistaXCarrera (ID_Deportista, ID_Carrera, Tiempo)
        SELECT ID_Deportista, ID_Carrera, Tiempo
        FROM inserted;
    END
END;
