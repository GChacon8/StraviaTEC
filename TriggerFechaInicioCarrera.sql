CREATE TRIGGER ValidarFechaInicioCarrera
ON Carrera
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @FechaActual DATE;
    SET @FechaActual = GETDATE();

    IF EXISTS (
        SELECT 1
        FROM inserted
        WHERE Fecha< @FechaActual
    )
    BEGIN
        RAISERROR('La fecha no puede ser anterior a la fecha actual.', 16, 1);
        ROLLBACK;
    END
END;
