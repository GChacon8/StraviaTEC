CREATE PROCEDURE CargarDatosDesdeExcel
AS
BEGIN
    -- Crear tabla temporal
    CREATE TABLE #TablaTemporal (
        Usuario VARCHAR(30) NOT NULL,
        Contrasena VARCHAR(20) NOT NULL,
        Nombre1 VARCHAR(20),
        Nombre2 VARCHAR(20),
        Apellido1 VARCHAR(20),
        Apellido2 VARCHAR(20),
        Nacimiento DATE,
        Foto VARCHAR(5000), -- Cambio en la definición de la columna Foto
        NacionalidadNombre VARCHAR(30), -- Columna para el nombre de la nacionalidad
        PRIMARY KEY (Usuario)
    );

    -- Utilizar INSERT INTO ... EXEC para insertar datos desde Excel a la tabla temporal
    INSERT INTO #TablaTemporal (Usuario, Contrasena, Nombre1, Nombre2, Apellido1, Apellido2, Nacimiento, Foto, NacionalidadNombre)
    EXEC('SELECT Usuario, Contrasena, Nombre1, Nombre2, Apellido1, Apellido2, Nacimiento, Foto, NacionalidadNombre FROM OPENROWSET(''Microsoft.ACE.OLEDB.12.0'', 
                            ''Excel 12.0;Database=C:\Users\joedu\OneDrive\Escritorio\StraviaTEC\dummy_data.xlsx;HDR=YES'', 
                            ''SELECT * FROM [hoja1$]'')');

    -- Puedes personalizar la consulta SQL según la estructura de tu Excel y la hoja de trabajo

    -- Insertar los datos en la tabla Deportista
    INSERT INTO Deportista (Usuario, Contrasena, Nombre1, Nombre2, Apellido1, Apellido2, Nacimiento, Foto, ID_Nacionalidad)
    SELECT t.Usuario, t.Contrasena, t.Nombre1, t.Nombre2, t.Apellido1, t.Apellido2, t.Nacimiento, t.Foto, n.ID
    FROM #TablaTemporal t
    INNER JOIN Nacionalidad n ON t.NacionalidadNombre = n.Nombre;

    -- Puedes hacer más operaciones con los datos en la tabla Deportista según tus necesidades

    -- Eliminar la tabla temporal al finalizar
    DROP TABLE #TablaTemporal;
END;
