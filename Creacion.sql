Create Table "Deportista"(
"Usuario" varchar(30) not null,
"Contrasena" varchar(20) not null,
"Nombre1" varchar(20),
"Nombre2" varchar(20),
"Apellido1" varchar(20),
"Apellido2" varchar(20),
"Nacimiento" date,
"Foto_nombre" varchar(255),
"Datos_Archivo" VARBINARY(MAX),
"ID_Nacionalidad" int,
Primary Key ("Usuario")
);

Create Table "Nacionalidad"(
"ID" int not null,
"Nombre" varchar(20),
Primary Key("ID")
);

Create Table "Grupo"(
"ID" int not null,
"Nombre" varchar(20),
"Privado" BIT,
"ID_Administrador" varchar(30),
Primary Key("ID")
);

Create Table"Actividad"(
"ID" int not null,
"Duracion" Time,
"Hora" Time,
"Fecha" Date,
"Kilometros" int,
"Mapa_Nombre" varchar(255),
"Datos_Archivo" VARBINARY(MAX),
"ID_Deportista" varchar(30),
"ID_Tipo_Actividad" int,
Primary Key("ID")
);


Create Table "Tipo_Actividad"(
"ID" int not null,
tipo varchar(20),
Primary Key("ID")
);


Create Table "Reto" (
"ID" int not null,
"Nombre" varchar(20),
"Fecha_Inicio" date,
"Fecha_Inicial" date,
"ID_Tipo_Actividad" int,
Primary Key("ID")
);

Create Table "Carrera"(
"Nombre" varchar(20) not null,
"Fecha" date,
"Recorrido_nombre" varchar(255),
"Datos_Archivo" VARBINARY(MAX),
"Cuenta" varchar(50),
"Precio" int,
"ID_Tipo_Actividad" int,
"ID_Categoria" int,
"Privado" BIT,
Primary Key ("Nombre")
);

Create Table "Categoria"(
"ID" int not null,
"Nombre" varchar(20),
"Edad_Min" int,
"Edad_Max" int,
Primary Key("ID")
);


Create Table "Patrocinador"(
"Nombre_Comercial" varchar(30) not null,
"Representante" varchar(20),
"Telefono" varchar(15),
"Logo_Nombre" varchar(255),
"Datos_Archivo" VARBINARY(MAX),
Primary Key ("Nombre_Comercial")
);

Create Table DeportistaXGrupo(
"ID_Deportista" varchar(30) not null,
"ID_Grupo" int not null unique,
Primary Key("ID_Deportista")
);


Create Table "DeportistaXReto"(
"ID_Deportista" varchar(30) not null,
"ID_Reto" int not null unique,
Primary Key("ID_Deportista")
);

Create Table "DeportistaXCarrera"(
"ID_Deportista" varchar(30) not null,
"ID_Carrera" varchar(20) not null unique,
Tiempo time,
Primary Key("ID_Deportista")
);

Create Table "GrupoXReto"(
"ID_Grupo" int not null,
"ID_Reto" int not null unique,
Primary Key("ID_Grupo")
);

Create Table "GrupoXCarrera"(
"ID_Grupo" int not null,
"ID_Carrera" varchar(20) not null unique,
Primary Key("ID_Grupo")
);

Create Table "PatrocinadorXReto"(
"ID_Patrocinador" varchar(30) not null,
"ID_Reto" int not null unique,
Primary Key("ID_Patrocinador")
);

Create Table "PatrocinadorXCarrera"(
"ID_Patrocinador" varchar(30) not null,
"ID_Carrera" varchar(20) not null unique,
Primary Key("ID_Patrocinador")
);

ALTER TABLE "Deportista"
ADD CONSTRAINT "ID_Amigo_FK"
FOREIGN KEY ("ID_Amigo")
REFERENCES "Deportista"("Usuario");

ALTER TABLE "Deportista"
ADD CONSTRAINT "ID_Nacionalidad_FK"
FOREIGN KEY ("ID_Nacionalidad")
REFERENCES "Nacionalidad"("ID");

ALTER TABLE "Grupo"
ADD CONSTRAINT "ID_Administrador_FK"
FOREIGN KEY ("ID_Administrador")
REFERENCES "Deportista"("Usuario");

ALTER TABLE "Actividad"
ADD CONSTRAINT "ID_Deportista_FK"
FOREIGN KEY ("ID_Deportista")
REFERENCES "Deportista"("Usuario");

ALTER TABLE "Actividad"
ADD CONSTRAINT "ID_Tipo_Actividad_FK1"
FOREIGN KEY ("ID_Tipo_Actividad")
REFERENCES "Tipo_Actividad"("ID");

ALTER TABLE "Reto"
ADD CONSTRAINT "ID_Tipo_Actividad_FK2"
FOREIGN KEY ("ID_Tipo_Actividad")
REFERENCES "Tipo_Actividad"("ID");

ALTER TABLE "Carrera"
ADD CONSTRAINT "ID_Tipo_Actividad_FK3"
FOREIGN KEY ("ID_Tipo_Actividad")
REFERENCES "Tipo_Actividad"("ID");

ALTER TABLE "Carrera"
ADD CONSTRAINT "ID_Categoria_FK"
FOREIGN KEY ("ID_Categoria")
REFERENCES "Categoria"("ID");

ALTER TABLE "DeportistaXGrupo"
ADD CONSTRAINT "ID_DeportistaXGrupo_FK1"
FOREIGN KEY ("ID_Deportista")
REFERENCES "Deportista"("Usuario");

ALTER TABLE "DeportistaXGrupo"
ADD CONSTRAINT "ID_DeportistaXGrupo_FK2"
FOREIGN KEY ("ID_Grupo")
REFERENCES "Grupo"("ID");

ALTER TABLE "DeportistaXReto"
ADD CONSTRAINT "ID_DeportistaXReto_FK1"
FOREIGN KEY ("ID_Deportista")
REFERENCES "Deportista"("Usuario");

ALTER TABLE "DeportistaXReto"
ADD CONSTRAINT "ID_DeportistaXReto_FK2"
FOREIGN KEY ("ID_Reto")
REFERENCES "Reto"("ID");

ALTER TABLE "DeportistaXCarrera"
ADD CONSTRAINT "ID_DeportistaXCarrera_FK1"
FOREIGN KEY ("ID_Deportista")
REFERENCES "Deportista"("Usuario");

ALTER TABLE "DeportistaXCarrera"
ADD CONSTRAINT "ID_DeportistaXCarrera_FK2"
FOREIGN KEY ("ID_Carrera")
REFERENCES "Carrera"("Nombre");

ALTER TABLE "GrupoXReto"
ADD CONSTRAINT "ID_GrupoXReto_FK1"
FOREIGN KEY ("ID_Grupo")
REFERENCES "Grupo"("ID");

ALTER TABLE "GrupoXReto"
ADD CONSTRAINT "ID_GrupoXReto_FK2"
FOREIGN KEY ("ID_Reto")
REFERENCES "Reto"("ID");

ALTER TABLE "GrupoXCarrera"
ADD CONSTRAINT "ID_GrupoXCarrera_FK1"
FOREIGN KEY ("ID_Grupo")
REFERENCES "Grupo"("ID");

ALTER TABLE "GrupoXCarrera"
ADD CONSTRAINT "ID_GrupoXCarrera_FK2"
FOREIGN KEY ("ID_Carrera")
REFERENCES "Carrera"("Nombre");

ALTER TABLE "PatrocinadorXReto"
ADD CONSTRAINT "ID_PatrocinadorXReto_FK1"
FOREIGN KEY ("ID_Patrocinador")
REFERENCES "Patrocinador"("Nombre_Comercial");

ALTER TABLE "PatrocinadorXReto"
ADD CONSTRAINT "ID_PatrocinadorXReto_FK2"
FOREIGN KEY ("ID_Reto")
REFERENCES "Reto"("ID");

ALTER TABLE "PatrocinadorXCarrera"
ADD CONSTRAINT "ID_PatrocinadorXCarrera_FK1"
FOREIGN KEY ("ID_Patrocinador")
REFERENCES "Patrocinador"("Nombre_Comercial");

ALTER TABLE "PatrocinadorXCarrera"
ADD CONSTRAINT "ID_PatrocinadorXCarrera_FK2"
FOREIGN KEY ("ID_Carrera")
REFERENCES "Carrera"("Nombre");


