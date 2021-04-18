class Order{
    constructor(Id,Title,Quantity,Message,City){
        this.Id = Id; 
        this.Title = Title; 
        this.Quantity = Quantity;
        this.Message = Message;
        this.City = City; 
    }
}

class Department{
    constructor(Id,Nombre,Activo){
        this.ID = Id; 
        this.Nombre = Nombre; 
        this.Activo = Activo;
    }
}

class TipoDocIdentidad{
    constructor(Id,Nombre,Activo,Formato){
        this.ID = Id; 
        this.Nombre = Nombre; 
        this.Activo = Activo;
		this.Formato = Formato;
    }
}

class Puesto{
    constructor(Id,Nombre,Activo,Salario_Hora){
        this.ID = Id; 
        this.Nombre = Nombre; 
		this.Salario_Hora = Salario_Hora; 
        this.Activo = Activo;
    }
}

class Empleado{
    constructor(Id,Nombre,FechaNacimiento,valorDeIdentidad,SaldoVacaciones,ID_Documento, ID_Puesto, ID_TrabajaEnDepartamento, ID_JefeDeDepartamento, Activo){
        this.ID = Id; 
        this.Nombre = Nombre; 
		this.ID = Id; 
        this.FechaNacimiento = FechaNacimiento; 
        this.valorDeIdentidad = valorDeIdentidad;
        this.SaldoVacaciones = SaldoVacaciones;
		this.ID_Documento = ID_Documento; 
        this.ID_Puesto = ID_Puesto; 
		this.ID_TrabajaEnDepartamento = ID_TrabajaEnDepartamento; 
        this.ID_JefeDeDepartamento = ID_JefeDeDepartamento; 
        this.Activo = Activo;
    }
}

