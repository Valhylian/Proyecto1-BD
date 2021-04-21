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
app.get('/', function(req,res) {
   res.sendfile('./html/index.html');
}) 
app.get('/js/index.js', function(req,res) {
   res.sendfile('./js/index.js');
}) 
app.get('/css/css.css', function(req,res) {
   res.sendfile('./css/css.css');
})


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
router.route('/empleadosFiltro/:name').get((request,response)=>{

    let empleado = {...request.body}
	console.log(empleado);
    dboperations.listarEmpleadosFiltro(request.params.name).then(result => {
       response.status(201).json(result);
    })

})

//LISTAR DEPARTAMENTOS
router.route('/departamentos').get((request,response)=>{

    let departamento = {...request.body}
	console.log(departamento);
    dboperations.listarDepartamentos().then(result => {
       response.status(201).json(result);
    })

})


//LISTAR DOCUMENTOS
router.route('/documentos').get((request,response)=>{

    let documento = {...request.body}
	console.log(documento);
    dboperations.listarDocumentos().then(result => {
       response.status(201).json(result);
    })

})

//LISTAR EMPLEADOS
router.route('/contEmpleados/:id').get((request,response)=>{

	dboperations.contEmpleados(request.params.id).then(result => {
       response.status(201).json(result);
    })

})

//LOGIN
router.route('/login/:user/:pass').get((request,response)=>{

    dboperations.validarLogin(request.params.user, request.params.pass).then(result => {
       response.status(201).json(result);
    })

})
var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);



