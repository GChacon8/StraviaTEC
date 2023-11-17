CREATE TRIGGER ValidarFechaInicio
ON Reto
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @FechaActual DATE;
    SET @FechaActual = GETDATE();

    IF EXISTS (
        SELECT 1
        FROM inserted
        WHERE Fecha_Inicio < @FechaActual
    )
    BEGIN
        RAISERROR('La fecha de inicio no puede ser anterior a la fecha actual.', 16, 1);
        ROLLBACK;
    END
END;

