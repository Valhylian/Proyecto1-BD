USE [Proyecto1]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

--LISTAR EMPLEADOS (ORDEN ALFABETICO)
ALTER PROCEDURE [dbo].[ListaEmpleadosAlfab]
AS
BEGIN

	SET NOCOUNT ON;
    SELECT * FROM  [dbo].[Empleado] WHERE [Activo] = 1 ORDER BY [Nombre];
	
	SET NOCOUNT OFF;
END
GO

--BORRAR PUESTO
ALTER PROCEDURE [dbo].[DeletePuesto]
	@Id int
	AS
BEGIN
   UPDATE [dbo].[Puesto] 
   SET [Activo] =  0
   WHERE [ID] = @Id
END
GO

--BORRAR EMPLEADO
ALTER PROCEDURE [dbo].[DeleteEmpleado]
	@Id int
	AS
BEGIN
   UPDATE [dbo].[Empleado]
   SET [Activo] =  0
 WHERE [ID] = @Id

END
GO







--INSERTAR EMPLEADO
CREATE PROCEDURE [dbo].[InsertEmpleado]
	@InName varchar(40), @InTipoDoC int, @InValorDoc int, @InFecha datetime, @InPuesto int, @InDepartamento int
AS
BEGIN

	SET NOCOUNT ON;

    INSERT INTO Empleado(Nombre,[ID_Documento], [ValorDeIdentidad], [FechaNacimiento], [ID_Puesto], [ID_TrabajaEnDepartamento])
	VALUES (@InName, @InTipoDoC,@InValorDoc,@InFecha, @InPuesto, @InDepartamento);

	SET NOCOUNT OFF;
END
GO

--LISTAR EMPLEADOS CON FILTRO (ORDEN ALFABETICO)
ALTER PROCEDURE [dbo].[ListaEmpleadosFiltro]
	@InName varchar(40)
AS
BEGIN

	SET NOCOUNT ON;
    SELECT * FROM  [dbo].[Empleado] WHERE [Activo] = 1 AND  UPPER([Nombre]) LIKE '%' + UPPER(@InName)+'%'  ORDER BY [Nombre]; 

	SET NOCOUNT OFF;
END
GO



--EDITAR EMPLEADO
CREATE PROCEDURE [dbo].[UpdateEmpleado]
	@InId int, @InName varchar(40), @InTipoDoC int, @InValorDoc int, @InFecha datetime, @InPuesto int, @InDepartamento int
	AS
BEGIN
   UPDATE [dbo].[Empleado]
   SET [Nombre] =  @InName
      ,[ID_Documento] = @InTipoDoC
	  ,[ValorDeIdentidad] = @InValorDoc
	  ,[FechaNacimiento] = @InFecha
	  ,[ID_Puesto] = @InPuesto
	  ,[ID_TrabajaEnDepartamento] = @InDepartamento

 WHERE ID = @InId
END
GO





--LISTAR PUESTOS (ORDEN ALFABETICO)
CREATE PROCEDURE [dbo].[ListaPuestoAlfab]
AS
BEGIN

	SET NOCOUNT ON;
    SELECT * FROM  [dbo].[Puesto] ORDER BY [Nombre]; 

	SET NOCOUNT OFF;
END
GO

--EDITAR PUESTOS
CREATE PROCEDURE [dbo].[UpdatePuesto]
	@InId int, @InName varchar(40), @Salario float
	AS
BEGIN
   UPDATE [dbo].[Puesto]
   SET [Nombre] =  @InName
      ,[Salario_Hora] = @Salario

 WHERE Id = @InId
END
GO

--INSERTAR PUESTO
CREATE PROCEDURE [dbo].[InsertPuesto]
	
	@InName varchar(40), @InSalarioHora float
AS
BEGIN

	SET NOCOUNT ON;

    INSERT INTO Puesto(Nombre, Salario_Hora)
	VALUES (@InName, @InSalarioHora);

	SET NOCOUNT OFF;
END
GO






SELECT name AS procedure_name   
    ,SCHEMA_NAME(schema_id) AS schema_name  
    ,type_desc  
    ,create_date  
    ,modify_date  
FROM sys.procedures;





