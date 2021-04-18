var Db  = require('./dboperations');
var Order = require('./order');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

router.route('/orders').get((request,response)=>{

    dboperations.getOrders().then(result => {
       response.json(result[0]);
    })

})

router.route('/orders/:id').get((request,response)=>{

    dboperations.getOrder(request.params.id).then(result => {
       response.json(result[0]);
    })

})

router.route('/orders').post((request,response)=>{

    let order = {...request.body}

    dboperations.addOrder(order).then(result => {
       response.status(201).json(result);
    })

})

router.route('/orders').put((request,response)=>{

    let order = {...request.body}
	console.log(order);
    dboperations.updateOrder(order).then(result => {
       response.status(201).json(result);
    })

})
router.route('/orders/:id').delete((request,response)=>{

    dboperations.deleteOrder(request.params.id).then(result => {
       response.status(201).json(result);
    })

})

//INSERTAR PUESTO
router.route('/puesto').post((request,response)=>{

    let puesto = {...request.body}
	console.log(puesto);
    dboperations.insertarPuesto(puesto).then(result => {
       response.status(201).json(result);
    })

})
//LISTAR PUESTOS
router.route('/puestos').get((request,response)=>{

    dboperations.listarPuestos().then(result => {
       response.json(result[0]);
    })

})

//EDITAR PUESTO
router.route('/puesto').put((request,response)=>{

    let puesto = {...request.body}
	console.log(puesto);
    dboperations.editarPuesto(puesto).then(result => {
       response.status(201).json(result);
    })

})

//ELIMINAR PUESTO
router.route('/puestos/:id').delete((request,response)=>{

    dboperations.deletePuesto(request.params.id).then(result => {
       response.status(201).json(result);
    })

})

//LISTAR EMPLEADOS
router.route('/empleados').get((request,response)=>{

    dboperations.listarEmpleados().then(result => {
       response.json(result[0]);
    })

})

//INSERTAR EMPLEADO
router.route('/empleado').post((request,response)=>{

    let empleado = {...request.body}
	console.log(empleado);
    dboperations.insertarEmpleado(empleado).then(result => {
       response.status(201).json(result);
    })

})

//EDITAR EMPLEADO
router.route('/empleado').put((request,response)=>{

    let empleado = {...request.body}
	console.log(empleado);
    dboperations.editarEmpleado(empleado).then(result => {
       response.status(201).json(result);
    })

})

//ELIMINAR EMPLEADO
router.route('/empleados/:id').delete((request,response)=>{

    dboperations.deleteEmpleado(request.params.id).then(result => {
       response.status(201).json(result);
    })

})

//LISTAR EMPLEADOS
router.route('/empleadosFiltro').get((request,response)=>{

    let empleado = {...request.body}
	console.log(empleado);
    dboperations.listarEmpleadosFiltro(empleado).then(result => {
       response.status(201).json(result);
    })

})
var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);



