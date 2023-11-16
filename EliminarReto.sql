CREATE PROCEDURE EliminarAsociacionReto
AS
BEGIN
    SET NOCOUNT ON;

    -- Obtener la fecha actual
    DECLARE @FechaActual date;
    SET @FechaActual = GETDATE();

    -- Eliminar las asociaciones de los retos cuya fecha final ya ha pasado
    DELETE FROM DeportistaXReto
    WHERE ID_Reto IN (
        SELECT ID
        FROM Reto
        WHERE Fecha_Final < @FechaActual
    );

    PRINT 'Asociaciones eliminadas para retos cuya fecha final ha pasado.';
END;
