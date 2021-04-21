

CREATE TABLE XMLwithOpenXML
(
Id INT IDENTITY PRIMARY KEY,
XMLData XML,
LoadedDateTime DATETIME
)

INSERT INTO XMLwithOpenXML(XMLData, LoadedDateTime)
SELECT CONVERT(XML, BulkColumn) AS BulkColumn, GETDATE() 
FROM OPENROWSET(BULK 'C:\Users\valer\OneDrive\Desktop\Repositorio - Proyecto1DB\Proyecto1-BD\Database\Catalogo_con_ID_BD.xml', 
				SINGLE_BLOB) AS x;

USE Proyecto1
GO

--LLENADO DE TABLAS CATALOGO-----------------------------------------------------------------------------------------------
--PARA EL LLENADO DE LA TABLA PUESTO
DECLARE @XML AS XML, @hDoc AS INT, @SQL NVARCHAR (MAX)
SELECT @XML = XMLData FROM XMLwithOpenXML
EXEC sp_xml_preparedocument @hDoc OUTPUT, @XML

INSERT INTO [dbo].[Puesto] ([Nombre],[Salario_Hora])
SELECT Nombre, SalarioXHora
FROM OPENXML(@hDoc, 'Datos/Catalogos/Puestos/Puesto')
WITH 
(
Nombre [varchar](40) '@Nombre',
SalarioXHora FLOAT '@SalarioXHora'
)
EXEC sp_xml_removedocument @hDoc
GO

--PARA EL LLENADO DE LA TABLA DEPARTAMENTOS
DECLARE @XML AS XML, @hDoc AS INT, @SQL NVARCHAR (MAX)
SELECT @XML = XMLData FROM XMLwithOpenXML
EXEC sp_xml_preparedocument @hDoc OUTPUT, @XML

INSERT INTO [dbo].[Departamento] ([ID],[Nombre])
SELECT IdDepartamento, NombreDepartamento
FROM OPENXML(@hDoc, 'Datos/Catalogos/Departamentos/Departamento')
WITH 
(
IdDepartamento INT '@Id',
NombreDepartamento [varchar](40) '@Nombre'
)
EXEC sp_xml_removedocument @hDoc
GO

--PARA EL LLENADO DE LA TABLA TIPO DE DOCUMENTO DE IDENTIDAD
DECLARE @XML AS XML, @hDoc AS INT, @SQL NVARCHAR (MAX)
SELECT @XML = XMLData FROM XMLwithOpenXML
EXEC sp_xml_preparedocument @hDoc OUTPUT, @XML

INSERT INTO [dbo].[TipoDocIdentidad] ([ID],[Nombre])
SELECT IdDoc, NombreDoc
FROM OPENXML(@hDoc, 'Datos/Catalogos/Tipos_de_Documento_de_Identificacion/TipoIdDoc')
WITH 
(
IdDoc INT '@Id',
NombreDoc [varchar](40) '@Nombre'
)

EXEC sp_xml_removedocument @hDoc
GO

--LLENADO DE TABLAS NO CATALOGO-----------------------------------------------------------------------------------------------

--PARA EL LLENADO DE LA TABLA EMPLEADOS
DECLARE @XML AS XML, @hDoc AS INT, @SQL NVARCHAR (MAX)
SELECT @XML = XMLData FROM XMLwithOpenXML
EXEC sp_xml_preparedocument @hDoc OUTPUT, @XML

INSERT INTO [dbo].[Empleado] ([ID_Documento],[ID_Puesto],[ID_TrabajaEnDepartamento],[ValorDeIdentidad],[Nombre],[FechaNacimiento])
SELECT ID_Documento, ID_Puesto,ID_TrabajaEnDepartamento, ValorDeIdentidad ,Nombre, FechaNacimiento
FROM OPENXML(@hDoc, 'Datos/Empleados/Empleado')
WITH 
(
ID_Documento INT '@idTipoDocumentacionIdentidad',
ID_Puesto INT '@idPuesto',
ID_TrabajaEnDepartamento INT '@IdDepartamento',
ValorDeIdentidad INT '@ValorDocumentoIdentidad',
Nombre [varchar](40) '@Nombre',
FechaNacimiento DATETIME '@FechaNacimiento'
)

EXEC sp_xml_removedocument @hDoc
GO

--PARA EL LLENADO DE LA TABLA APP USERS
DECLARE @XML AS XML, @hDoc AS INT, @SQL NVARCHAR (MAX)
SELECT @XML = XMLData FROM XMLwithOpenXML
EXEC sp_xml_preparedocument @hDoc OUTPUT, @XML

INSERT INTO [dbo].[AppUser] ([Username],[Password],[UserType])
SELECT username, pwd,tipo
FROM OPENXML(@hDoc, 'Datos/Usuarios/Usuario')
WITH 
(
username [varchar](64) '@username',
pwd [varchar](64) '@pwd',
tipo INT '@tipo'
)

EXEC sp_xml_removedocument @hDoc
GO