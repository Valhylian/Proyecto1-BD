var config = require('./dbconfig');
const sql = require('mssql');


async function getOrders() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from Orders");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getOrder(orderId) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, orderId)
            .query("SELECT * from Orders where Id = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function addOrder(order) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('Id', sql.Int, order.Id)
            .input('Title', sql.NVarChar, order.Title)
            .input('Quantity', sql.Int, order.Quantity)
            .input('Message', sql.NVarChar, order.Message)
            .input('City', sql.NVarChar, order.City)
            .execute('InsertOrders');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function updateOrder(order) {

    try {
        let pool = await sql.connect(config);
        let updateProduct = await pool.request()
            .input('Id', sql.Int, order.Id)
            .input('Title', sql.NVarChar, order.Title)
            .input('Quantity', sql.Int, order.Quantity)
            .input('Message', sql.NVarChar, order.Message)
            .input('City', sql.NVarChar, order.City)
            .execute('updateOrders');
        return updateProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function updateOrder(order) {

    try {
        let pool = await sql.connect(config);
        let updateProduct = await pool.request()
            .input('Id', sql.Int, order.Id)
            .input('Title', sql.NVarChar, order.Title)
            .input('Quantity', sql.Int, order.Quantity)
            .input('Message', sql.NVarChar, order.Message)
            .input('City', sql.NVarChar, order.City)
            .execute('updateOrders');
        return updateProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function deleteOrder(orderId) {
    try {
        let pool = await sql.connect(config);
		let deleteProduct = await pool.request()
            .input('Id', sql.Int, orderId)
            .execute('[deleteOrder]');
        return deleteProduct.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}



//LISTAR PUESTOS///////////////////////////////////////////////////////////////
async function listarPuestos() {
    try {
        let pool = await sql.connect(config);
		let list = await pool.request()
            .execute('ListaPuestoAlfab');
        return list.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

//INSERTAR PUESTO///////////////////////////////////////////////////////////////
async function insertarPuesto(puesto) {
    try {
        let pool = await sql.connect(config);
		console.log(puesto.Nombre);
		console.log(puesto.Salario_Hora);
        let insertProduct = await pool.request()
            .input('InName', sql.NVarChar, puesto.Nombre)
            .input('InSalarioHora', sql.Float, puesto.Salario_Hora)
            .execute('InsertPuesto');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

//EDITAR PUESTO///////////////////////////////////////////////////////////////
async function editarPuesto(puesto) {

    try {
        let pool = await sql.connect(config);
        let updateProduct = await pool.request()
			.input('InId', sql.Int, puesto.ID)
            .input('InName', sql.NVarChar, puesto.Nombre)
            .input('Salario', sql.Float, puesto.Salario_Hora)
            .execute('UpdatePuesto');
        return updateProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

//ELIMINAR PUESTO 
async function deletePuesto(puestoId) {
    try {
        let pool = await sql.connect(config);
		let deleteProduct = await pool.request()
            .input('Id', sql.Int, puestoId)
            .execute('DeletePuesto');
        return deleteProduct.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

//LISTAR PUESTOS///////////////////////////////////////////////////////////////
async function listarEmpleados() {
    try {
        let pool = await sql.connect(config);
		let list = await pool.request()
            .execute('ListaEmpleadosAlfab');
        return list.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

//INSERTAR EMPLEADOS///////////////////////////////////////////////////////////////
async function insertarEmpleado(empleado) {
    try {
        let pool = await sql.connect(config);
		console.log(empleado.InName);
		console.log(empleado.InPuesto);
        let insertProduct = await pool.request()
            .input('InName', sql.NVarChar, empleado.InName)
            .input('InTipoDoC', sql.Float, empleado.InTipoDoC)
			.input('InValorDoc', sql.NVarChar, empleado.InValorDoc)
            .input('InFecha', sql.Float, empleado.InFecha)
			.input('InPuesto', sql.NVarChar, empleado.InPuesto)
            .input('InDepartamento', sql.Float, empleado.InDepartamento)
            .execute('InsertEmpleado');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

//EDITAR EMPLEADO///////////////////////////////////////////////////////////////
async function editarEmpleado(empleado) {

    try {
        let pool = await sql.connect(config);
        let updateProduct = await pool.request()
			.input('InId', sql.NVarChar, empleado.InId)
			.input('InName', sql.NVarChar, empleado.InName)
            .input('InTipoDoC', sql.Float, empleado.InTipoDoC)
			.input('InValorDoc', sql.NVarChar, empleado.InValorDoc)
            .input('InFecha', sql.Float, empleado.InFecha)
			.input('InPuesto', sql.NVarChar, empleado.InPuesto)
            .input('InDepartamento', sql.Float, empleado.InDepartamento)
            .execute('UpdateEmpleado');
        return updateProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

//ELIMINAR EMPLEADO 
async function deleteEmpleado(empleadoId) {
    try {
        let pool = await sql.connect(config);
		let deleteProduct = await pool.request()
            .input('Id', sql.Int, empleadoId)
            .execute('DeleteEmpleado');
        return deleteProduct.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

//LISTAR EMPLEADOS CON FILTRO
async function listarEmpleadosFiltro(empleadoFiltro) {
    try {
        let pool = await sql.connect(config);
		let list = await pool.request()
			.input('InName', sql.NVarChar, empleadoFiltro.nameEmpleado)
            .execute('ListaEmpleadosFiltro');
        return list.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

//CONTADOR DE EMPLEADOS EN PUESTO
async function contEmpleados(puestoId) {
    try {
        let pool = await sql.connect(config);
		let list = await pool.request()
			.input('InPuesto', sql.Int, puestoId)
            .execute('contEmpleados');
        return list.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}



module.exports = {
    getOrders: getOrders,
    getOrder : getOrder,
    addOrder : addOrder,
	updateOrder:updateOrder,
	deleteOrder:deleteOrder,
	
	//PUESTOS
	insertarPuesto: insertarPuesto,
	listarPuestos : listarPuestos,
	editarPuesto : editarPuesto,
	deletePuesto : deletePuesto,
	
	//EMPLEADOS
	listarEmpleados : listarEmpleados,
	insertarEmpleado : insertarEmpleado,
	editarEmpleado : editarEmpleado,
	deleteEmpleado : deleteEmpleado,
	listarEmpleadosFiltro : listarEmpleadosFiltro,
	
	//CONT EMPLEADOS
	contEmpleados: contEmpleados
}