CREATE PROCEDURE CargarDatosDesdeTablaTemporal
AS
BEGIN
    -- 1. Crear tabla temporal
    CREATE TABLE #TablaTemporal (
        Usuario VARCHAR(30) NOT NULL,
        Contrasena VARCHAR(20) NOT NULL,
        Nombre1 VARCHAR(20),
        Nombre2 VARCHAR(20),
        Apellido1 VARCHAR(20),
        Apellido2 VARCHAR(20),
        Nacimiento DATE,
        Nacionalidad VARCHAR(30)
    );

    -- 2. Insertar datos desde la tabla temporal
    INSERT INTO #TablaTemporal (Usuario, Contrasena, Nombre1, Nombre2, Apellido1, Apellido2, Nacimiento, Nacionalidad)
    SELECT Usuario, Contrasena, Nombre1, Nombre2, Apellido1, Apellido2, Nacimiento, Nacionalidad
    FROM Hoja1$;

    -- 3. Insertar datos en la tabla Deportista
    BEGIN TRY
        INSERT INTO Deportista (Usuario, Contrasena, Nombre1, Nombre2, Apellido1, Apellido2, Nacimiento, ID_Nacionalidad)
        SELECT
            Usuario,
            Contrasena,
            Nombre1,
            Nombre2,
            Apellido1,
            Apellido2,
            Nacimiento,
            n.ID
        FROM #TablaTemporal t
        INNER JOIN Nacionalidad n ON t.Nacionalidad = n.Nombre; -- Ajuste en la condición de unión
    END TRY
    BEGIN CATCH
        -- Manejar errores e indicar los datos que no se pudieron insertar
        SELECT 'Error: ' + ERROR_MESSAGE() AS ErrorMessage,
               Usuario, Contrasena, Nombre1, Nombre2, Apellido1, Apellido2, Nacimiento, Nacionalidad
        FROM #TablaTemporal;
    END CATCH

    -- 4. Eliminar la tabla temporal al finalizar
    DROP TABLE #TablaTemporal;
END;

