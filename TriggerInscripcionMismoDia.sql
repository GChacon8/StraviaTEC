CREATE TRIGGER EvitarInscripcionMismoDia
ON DeportistaXCarrera
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el deportista se inscribe en dos carreras el mismo día
    IF EXISTS (
        SELECT 1
        FROM inserted i
        INNER JOIN Carrera c1 ON i.ID_Carrera = c1.Nombre
        INNER JOIN inserted i2 ON i.ID_Deportista = i2.ID_Deportista
        INNER JOIN Carrera c2 ON i2.ID_Carrera = c2.Nombre
        WHERE c1.Fecha = c2.Fecha
            AND i.ID_Carrera <> i2.ID_Carrera
    )
    BEGIN
        RAISERROR('El deportista no puede inscribirse en dos carreras el mismo día.', 16, 1);
        ROLLBACK;
    END
END;





