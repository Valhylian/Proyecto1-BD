var ids = [];


//CARAGA EN PANTALLA LA TABLA DE PRUEBA
var generateTable = function(){
    $("#table").empty();
    var table =   $("<table id='table_orders' class='table'>"+
                    "   <thead class='table-dark'></thead>"+
                    "   <tbody> </tbody>"+
                    "</table>");
    table.find("thead").append("<tr></tr>");
    table.find("thead").find("tr").append("<th scope='col'>Id</th>").
                                   append("<th scope='col'>Title</th>").
                                   append("<th scope='col'>Quantity</th>").
                                   append("<th scope='col'>Message</th>").
                                   append("<th scope='col'>City</th>").
                                   append("<th scope='col'>Edit</th>").
                                   append("<th scope='col'>Delete</th>");
    
    $.get( "http://192.168.88.15:8090/api/orders", function( data ) {
        if(data){
           data.forEach(element => {
                console.log(element);
                var id = $("<td></td>").text(element.Id);

                var inputTitle = $("<input type='text' class='form-control' style='display:none'>")
                    .val(element.Title)
                    .attr("id","title"+element.Id);
                var labelTitle = $("<label></label>").text(element.Title);
                var title = $("<td></td>").append(inputTitle).append(labelTitle);
                
                var inputQuantity = $("<input type='text' class='form-control' style='display:none'>")
                    .val(element.Quantity)
                    .attr("id","quantity"+element.Id);
                var labelQuantity = $("<label></label>").text(element.Quantity);
                var quantity = $("<td></td>").append(inputQuantity).append(labelQuantity);

                var inputMessage = $("<input type='text' class='form-control' style='display:none'>")
                    .val(element.Message)
                    .attr("id","message"+element.Id);
                var labelMessage = $("<label></label>").text(element.Message);
                var message = $("<td></td>").append(inputMessage).append(labelMessage);

                var inputCity = $("<input type='text' class='form-control' style='display:none'>")
                    .val(element.City)
                    .attr("id","city"+element.Id);
                var labelCity = $("<label></label>").text(element.City);
                var city = $("<td></td>").append(inputCity).append(labelCity);

                var editIcon = $("<td> <button type='button' class='btn btn-dark'> <i class='fa fa-edit'></i></button></td>");
                editIcon.click(function(){
                    editData(element.Id);
                })
                var deleteIconPuesto = $("<td> <button type='button' class='btn btn-dark'> <i class='fa fa-trash'></i></button></td>");
                deleteIconPuesto.click(function(){
                    deleteData(element.Id);
                });
                var tr = $("<tr></tr>").attr('id','row'+element.Id);
               
                tr.append(id).
                    append(title).
                    append(quantity).
                    append(message).
                    append(city).
                    append(editIcon).
                    append(deleteIconPuesto);

                table.find("tbody").append(tr);
           });
        }
    });
    $("#table").append(table);
}

var editData = function(id){
    $("#row"+id).find("input").css("display","block");
    $("#row"+id).find("label").css("display","none");
    ids.push(id);
    $("#btn_save").show().click(function(){
        ids.forEach(id => {
            var json = {
                Id:id,
                Title:$("#title"+id).val(),
                Quantity:$("#quantity"+id).val(),
                Message:$("#message"+id).val(),
                City:$("#city"+id).val()
            }
            console.log("json = "+JSON.stringify(json));        
            $.ajax({
                url: "http://192.168.88.15:8090/api/orders",
                type: 'PUT',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(json),
                success: function(result) {
                    $("#row"+id).find("input").hide();
                    $("#row"+id).find("label").show();
                    generateTable();
                    $("#btn_save").hide();
                }
            });
        });
    });
    $("#btn_save").show();
}

var deleteData = function(id){
    $.ajax({
        url: "http://192.168.88.15:8090/api/orders/"+id,
        type: 'DELETE',
        success: function(result) {
            generateTable();

        }
    });
}
var enableEdition = function(){
    var inputId = $("<input type='text' class='form-control' >")
        .attr("id","idNew");
    var id = $("<td></td>").append(inputId);

    var inputTitle = $("<input type='text' class='form-control' >")
        .attr("id","titleNew");
    var title = $("<td></td>").append(inputTitle);
    
    var inputQuantity = $("<input type='text' class='form-control' >")
        .attr("id","quantityNew");
    var quantity = $("<td></td>").append(inputQuantity);

    var inputMessage = $("<input type='text' class='form-control'>")
        .attr("id","messageNew");
    var message = $("<td></td>").append(inputMessage);

    var inputCity = $("<input type='text' class='form-control'>")
        .attr("id","cityNew");
    var city = $("<td></td>").append(inputCity);
    var editIcon = $("<td></td>");
    var deleteIcon = $("<td></td>");
    var tr = $("<tr></tr>");
               
    tr.append(id).
        append(title).
        append(quantity).
        append(message).
        append(city).
        append(editIcon).
        append(deleteIcon);

    $("#table_orders").find("tbody").append(tr);
    $("#btn_add").show();
    $("#icon_add").attr("disabled", true);

}



var enableEditionPuesto = function(){
    var inputNombre = $("<input type='text' class='form-control' >")
        .attr("id","nameNew");
    var nombre = $("<td></td>").append(inputNombre);

    var inputSalario = $("<input type='text' class='form-control' >")
        .attr("id","salarioNew");
    var salario = $("<td></td>").append(inputSalario);

    var editIconPuesto = $("<td></td>");
    var deleteIconPuesto = $("<td></td>");
    var tr = $("<tr></tr>");
               
    tr.append(nombre).
        append(salario).
        append(editIconPuesto).
        append(deleteIconPuesto);

    $("#table_puestos").find("tbody").append(tr);
    $("#btn_add_puesto").show();
    $("#icon_add_puesto").attr("disabled", true);

}

var addPuesto = function(){
    var json = {
        Nombre:$("#nameNew").val(),
        Salario_Hora:$("#salarioNew").val(),

    }
    console.log("json = "+JSON.stringify(json));        
    $.ajax({
        url: "http://192.168.88.15:8090/api/puesto",
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(json),
        success: function(result) {
            generateTablePuestos();
            $("#btn_add_puesto").hide();
            $("#icon_add_puesto").attr("disabled", false);
        }
    });
}

var login = function(){
    $("#login_div").hide();
    $("#body_div").show();
}


//CARGA EN PANTALLA LA TABLA DE PUESTOS
var generateTablePuestos = function(){
    $("#tablePuestos").empty();
    var table =   $("<table id='table_puestos' class='table'>"+
                    "   <thead class='table-dark'></thead>"+
                    "   <tbody> </tbody>"+
                    "</table>");
    table.find("thead").append("<tr></tr>");
    table.find("thead").find("tr").append("<th scope='col'>Nombre</th>").
                                   append("<th scope='col'>Salario</th>").
								   append("<th scope='col'>EditPuesto</th>").
                                   append("<th scope='col'>DeletePuesto</th>");
    
    $.get( "http://192.168.88.15:8090/api/puestos", function( data ) {
        if(data){
           data.forEach(element => {
                console.log(element);
                var id = $("<td></td>").text(element.ID);

                var inputNombre = $("<input type='text' class='form-control' style='display:none'>")
                    .val(element.Nombre)
                    .attr("id","nombre_puesto"+element.ID);
					
                var labelNombre = $("<label></label>").text(element.Nombre);
                var nombre = $("<td></td>").append(inputNombre).append(labelNombre);
				
				var inputSalario = $("<input type='text' class='form-control' style='display:none'>")
                    .val(element.Salario_Hora)
                    .attr("id","salario"+element.ID);
					
				var labelSalario = $("<label></label>").text(element.Salario_Hora);
                var salario = $("<td></td>").append(inputSalario).append(labelSalario);

                var editIcon = $("<td> <button type='button' class='btn btn-dark'> <i class='fa fa-edit'></i></button></td>");
                editIcon.click(function(){
                    editPuesto(element.ID);
                })
                var deleteIcon = $("<td> <button type='button' class='btn btn-dark'> <i class='fa fa-trash'></i></button></td>");
                deleteIcon.click(function(){
                    deletePuesto(element.ID);
                });
                var tr = $("<tr></tr>").attr('id','tablaPuesto'+element.ID);
               
                tr.append(nombre).
                    append(salario).
                    /*append(quantity).
                    append(message).
                    append(city).*/
                    append(editIcon).
                    append(deleteIcon);

                table.find("tbody").append(tr);
           });
        }
    });
    $("#tablePuestos").append(table);
}


//EDITAR PUESTO
var editPuesto = function(id){
    $("#tablaPuesto"+id).find("input").css("display","block");
    $("#tablaPuesto"+id).find("label").css("display","none");
    ids.push(id);
    $("#btn_save_puesto").show().click(function(){
        ids.forEach(id => {
            var json = {
                ID:id,
                Nombre:$("#nombre_puesto"+id).val(),
				Salario_Hora:$("#salario"+id).val()
            }
            console.log("json = "+JSON.stringify(json));        
            $.ajax({
                url: "http://192.168.88.15:8090/api/puesto",
                type: 'PUT',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(json),
                success: function(result) {
                    $("#tablaPuesto"+id).find("input").hide();
                    $("#tablaPuesto"+id).find("label").show();
                    generateTablePuestos();
                    $("#btn_save_puesto").hide();
                }
            });
        });
    });
    $("#btn_save_puesto").show();
}

//DELETE PUESTO
var deletePuesto = function(id){
	
	$.get( "http://192.168.88.15:8090/api/contEmpleados/"+id, function( data ) {
        if(data){
			console.log(data[0]);
			var cant = data[0][0].Cantidad;
			if (cant > 0){
				window.alert("El puesto no puede ser elminado porque hay "+cant+" empleados en este puesto");
			}
			else{
				$.ajax({
					url: "http://192.168.88.15:8090/api/puestos/"+id,
					type: 'DELETE',
					success: function(result) {
						window.alert("PUESTO ELIMINADO");
						generateTablePuestos();
					}
				});
			}
			
		}
	});
    
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CARAGA EN PANTALLA LA TABLA DE EMPLEADOS
var generateTableEmplados = function(){
    $("#tableEmpleados").empty();
    var table =   $("<table id='table_empleados' class='table'>"+
                    "   <thead class='table-dark'></thead>"+
                    "   <tbody> </tbody>"+
                    "</table>");
    table.find("thead").append("<tr></tr>");
    table.find("thead").find("tr").append("<th scope='col'>Nombre</th>").
                                   append("<th scope='col'>Tipo Identidad</th>").
                                   append("<th scope='col'>Identidad</th>").
                                   append("<th scope='col'>Fecha Nac</th>").
                                   append("<th scope='col'>Puesto</th>").
								   append("<th scope='col'>Departamento</th>").
                                   append("<th scope='col'>Edit</th>").
                                   append("<th scope='col'>Delete</th>");
    
    $.get( "http://192.168.88.15:8090/api/empleados", function( data ) {
        if(data){
           data.forEach(element => {
                console.log(element);
                var id = $("<td></td>").text(element.ID);

                var inputNombre = $("<input type='text' class='form-control' style='display:none'>")
                    .val(element.Nombre)
                    .attr("id","empleado_nombre"+element.ID);
                var labelNombre = $("<label></label>").text(element.Nombre);
                var nombre = $("<td></td>").append(inputNombre).append(labelNombre);
				
				
				var inputDocumento  = $("<select class='form-select' style='display:none' aria-label='Default select example' style='width:300px; margin:0 auto'></select>")
                    .val(element.Documento)
                    .attr("id","empleado_documento"+element.ID);
				$.get( "http://192.168.88.15:8090/api/documentos", function( data ) {
					if(data){
					   data[0].forEach(element => {
						   var docSelect  = element.Nombre;
						   var docSelectId = element.ID;
						   var docSelectHTML = $("<option></option").val(docSelectId ).text(docSelect);
						   inputDocumento.append(docSelectHTML);
					   }
					)}
				});

                var labelDocumento = $("<label></label>").text(element.Documento);
                var documento = $("<td></td>").append(inputDocumento).append(labelDocumento);
				
				var inputValorDoc  = $("<input type='text' class='form-control' style='display:none'>")
                    .val(element.ValorDeIdentidad)
                    .attr("id","empleado_valorDoc"+element.ID);
                var labelValorDoc = $("<label></label>").text(element.ValorDeIdentidad);
                var valorDoc = $("<td></td>").append(inputValorDoc).append(labelValorDoc);
				
				var inputFecha  = $("<input type='text' class='form-control' style='display:none'>")
                    .val(element.FechaNacimiento)
                    .attr("id","empleado_fecha"+element.ID);
                var labelFecha = $("<label></label>").text(element.FechaNacimiento);
                var fecha = $("<td></td>").append(inputFecha).append(labelFecha);
				
				var inputPuesto  = $("<select class='form-select' style='display:none' aria-label='Default select example' style='width:300px; margin:0 auto'></select>")
                    .val(element.NombrePuesto)
                    .attr("id","empleado_puesto"+element.ID);
				$.get( "http://192.168.88.15:8090/api/puestos", function( data ) {
					if(data){
					   data.forEach(element => {
						   var puestoSelect  = element.Nombre;
						   var puestoSelectId = element.ID;
						   var puestoSelectHTML = $("<option></option").val(puestoSelectId ).text(puestoSelect);
						   inputPuesto.append(puestoSelectHTML);
					   }
					)}
				});
                var labelPuesto = $("<label></label>").text(element.NombrePuesto);
				
                var puesto = $("<td></td>").append(inputPuesto).append(labelPuesto);
				
				
				
				var inputDepartamento  = $("<select class='form-select' style='display:none' aria-label='Default select example' style='width:300px; margin:0 auto'></select>")
                    .val(element.NombreDepartamento)
                    .attr("id","empleado_departamento"+element.ID);
				$.get( "http://192.168.88.15:8090/api/departamentos", function( data ) {
					console.log(data)
					if(data){
					   data[0].forEach(element => {
						   var departamentoSelect  = element.Nombre;
						   var departamentoSelectId = element.ID;
						   var departamentoSelectHTML = $("<option></option").val(departamentoSelectId ).text(departamentoSelect);
						   inputDepartamento.append(departamentoSelectHTML);
					   }
					)}
				});
                var labelDepartamento = $("<label></label>").text(element.NombreDepartamento);
                var departamento = $("<td></td>").append(inputDepartamento).append(labelDepartamento);
            
                var editIconEmpleado = $("<td> <button type='button' class='btn btn-dark'> <i class='fa fa-edit'></i></button></td>");
                editIconEmpleado.click(function(){
                    editEmpleado(element.ID);
                })
                var deleteIconEmpleado = $("<td> <button type='button' class='btn btn-dark'> <i class='fa fa-trash'></i></button></td>");
                deleteIconEmpleado.click(function(){
                    deleteEmpleado(element.ID);
                });
                var tr = $("<tr></tr>").attr('id','tablaEmpleado'+element.ID);
               
                tr.append(nombre).
                    /*
                    append(quantity).
                    append(message).
                    append(city).*/
					
					append(documento).
					append(valorDoc).
					append(fecha).
					append(puesto).
					append(departamento).
                    append(editIconEmpleado).
                    append(deleteIconEmpleado);

                table.find("tbody").append(tr);
           });
        }
    });
    $("#tableEmpleados").append(table);
}

var editEmpleado = function(id){
    $("#tablaEmpleado"+id).find("input").css("display","block");
	$("#tablaEmpleado"+id).find("select").css("display","block");
    $("#tablaEmpleado"+id).find("label").css("display","none");
    ids.push(id);
    $("#btn_save_empleado").show().click(function(){
        ids.forEach(id => {
            var json = {
                InId:id,
				InName:$("#empleado_nombre"+id).val(),
				InTipoDoC:$("#empleado_documento"+id).val(),
				InValorDoc:$("#empleado_valorDoc"+id).val(),
				InFecha:$("#empleado_fecha"+id).val(),
                InPuesto:$("#empleado_puesto"+id).val(),
				InDepartamento:$("#empleado_departamento"+id).val()
            }
            console.log("json = "+JSON.stringify(json));        
            $.ajax({
                url: "http://192.168.88.15:8090/api/empleado",
                type: 'PUT',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(json),
                success: function(result) {
                    $("#tablaEmpleado"+id).find("input").hide();
					$("#tablaEmpleado"+id).find("select").hide();
                    $("#tablaEmpleado"+id).find("label").show();
                    generateTableEmplados();
                    $("#btn_save_empleado").hide();
                }
            });
        });
    });
    $("#btn_save_empleado").show();
}
//DELETE EMPLEADO
var deleteEmpleado = function(id){
    $.ajax({
        url: "http://192.168.88.15:8090/api/empleados/"+id,
        type: 'DELETE',
        success: function(result) {
			window.alert("EMPLEADO ELIMINADO");
            generateTableEmplados();

        }
    });   
}

var addData = function(id){
    
    var json = {
        Id:$("#idNew").val(),
        Title:$("#titleNew").val(),
        Quantity:$("#quantityNew").val(),
        Message:$("#messageNew").val(),
        City:$("#cityNew").val()
    }
    console.log("json = "+JSON.stringify(json));        
    $.ajax({
        url: "http://192.168.88.15:8090/api/orders",
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(json),
        success: function(result) {
            generateTable();
            $("#btn_add").hide();
            $("#icon_add").attr("disabled", false);

        }
    });
    
}


var enableEditionEmpleado = function(){
    var inputNombre = $("<input type='text' class='form-control' >")
        .attr("id","empleado_newName");
    var nombre = $("<td></td>").append(inputNombre);
	
	var inputDocumento  = $("<select class='form-select'  aria-label='Default select example' ></select>")
        .attr("id","empleado_newDocumento");
		$.get( "http://192.168.88.15:8090/api/documentos", function( data ) {
			if(data){
			   data[0].forEach(element => {
					   var docSelect  = element.Nombre;
					   var docSelectId = element.ID;
					   var docSelectHTML = $("<option></option").val(docSelectId ).text(docSelect);
					   inputDocumento.append(docSelectHTML);
			   }
			)}
		});
    var documento = $("<td></td>").append(inputDocumento);
	
	var inputValorIdentidad = $("<input type='text' class='form-control' >")
        .attr("id","empleado_newValorIdentidad");
    var valorIdentidad = $("<td></td>").append(inputValorIdentidad);

	var inputFecha = $("<input type='text' class='form-control' >")
        .attr("id","empleado_newFecha");
    var fecha = $("<td></td>").append(inputFecha);
	
	var inputPuesto  = $("<select class='form-select' aria-label='Default select example' ></select>")
        .attr("id","empleado_newPuesto");
		$.get( "http://192.168.88.15:8090/api/puestos", function( data ) {
			if(data){
				data.forEach(element => {
						   var puestoSelect  = element.Nombre;
						   var puestoSelectId = element.ID;
						   var puestoSelectHTML = $("<option></option").val(puestoSelectId ).text(puestoSelect);
						   inputPuesto.append(puestoSelectHTML);
					   }
					)}
				});
	var puesto = $("<td></td>").append(inputPuesto);
					   
	var inputDepartamento  = $("<select class='form-select' aria-label='Default select example' ></select>")
		.attr("id","empleado_newDepartamento");
		$.get( "http://192.168.88.15:8090/api/departamentos", function( data ) {
			console.log(data)
			if(data){
				data[0].forEach(element => {
				var departamentoSelect  = element.Nombre;
				var departamentoSelectId = element.ID;
				var departamentoSelectHTML = $("<option></option").val(departamentoSelectId ).text(departamentoSelect);
				inputDepartamento.append(departamentoSelectHTML);
			}
		)}
	});
                
    var departamento = $("<td></td>").append(inputDepartamento);
	
    var editIcon = $("<td></td>");
    var deleteIcon = $("<td></td>");
    var tr = $("<tr></tr>");
               
    tr.append(nombre).
        append(documento).
        append(valorIdentidad).
        append(fecha).
        append(puesto).
		append(departamento).
        append(editIcon).
        append(deleteIcon);

    $("#table_empleados").find("tbody").append(tr);
    $("#btn_add_empleado").show();
    $("#icon_add_empleado").attr("disabled", true);

}

var addEmpleado = function(id){
    
    var json = {
        InName:$("#empleado_newName").val(),
        InTipoDoC:$("#empleado_newDocumento").val(),
        InValorDoc:$("#empleado_newValorIdentidad").val(),
        InFecha:$("#empleado_newFecha").val(),
        InPuesto:$("#empleado_newPuesto").val(),
		InDepartamento:$("#empleado_newDepartamento").val()
    }
    console.log("json = "+JSON.stringify(json));        
    $.ajax({
        url: "http://192.168.88.15:8090/api/empleado",
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(json),
        success: function(result) {
			window.alert("Empleado insertado");
            generateTableEmplados();
            $("#btn_add_empleado").hide();
            $("#icon_add_empleado").attr("disabled", false);
        }
    });
    
}


//CARAGA EN PANTALLA LA TABLA DE EMPLEADOS
var generateTableEmpleadosFiltro = function(){
    $("#tableEmpleados").empty();
	var busqueda=$("#input_name").val();
    var table =   $("<table id='table_empleados' class='table'>"+
                    "   <thead class='table-dark'></thead>"+
                    "   <tbody> </tbody>"+
                    "</table>");

    table.find("thead").append("<tr></tr>");
    table.find("thead").find("tr").append("<th scope='col'>Nombre</th>").
                                   append("<th scope='col'>Tipo Identidad</th>").
                                   append("<th scope='col'>Identidad</th>").
                                   append("<th scope='col'>Fecha Nac</th>").
                                   append("<th scope='col'>Puesto</th>").
								   append("<th scope='col'>Departamento</th>").
                                   append("<th scope='col'>Edit</th>").
                                   append("<th scope='col'>Delete</th>");
    
    $.get( "http://192.168.88.15:8090/api/empleadosFiltro/"+busqueda, function( data ) {
        if(data){
           data[0].forEach(element => {
                console.log(element);
                var id = $("<td></td>").text(element.ID);

                var inputNombre = $("<input type='text' class='form-control' style='display:none'>")
                    .val(element.Nombre)
                    .attr("id","empleado_nombre"+element.ID);
                var labelNombre = $("<label></label>").text(element.Nombre);
                var nombre = $("<td></td>").append(inputNombre).append(labelNombre);
				
				
				var inputDocumento  = $("<select class='form-select' style='display:none' aria-label='Default select example' style='width:300px; margin:0 auto'></select>")
                    .val(element.Documento)
                    .attr("id","empleado_documento"+element.ID);
				$.get( "http://192.168.88.15:8090/api/documentos", function( data ) {
					if(data){
					   data[0].forEach(element => {
						   var docSelect  = element.Nombre;
						   var docSelectId = element.ID;
						   var docSelectHTML = $("<option></option").val(docSelectId ).text(docSelect);
						   inputDocumento.append(docSelectHTML);
					   }
					)}
				});

                var labelDocumento = $("<label></label>").text(element.Documento);
                var documento = $("<td></td>").append(inputDocumento).append(labelDocumento);
				
				var inputValorDoc  = $("<input type='text' class='form-control' style='display:none'>")
                    .val(element.ValorDeIdentidad)
                    .attr("id","empleado_valorDoc"+element.ID);
                var labelValorDoc = $("<label></label>").text(element.ValorDeIdentidad);
                var valorDoc = $("<td></td>").append(inputValorDoc).append(labelValorDoc);
				
				var inputFecha  = $("<input type='text' class='form-control' style='display:none'>")
                    .val(element.FechaNacimiento)
                    .attr("id","empleado_fecha"+element.ID);
                var labelFecha = $("<label></label>").text(element.FechaNacimiento);
                var fecha = $("<td></td>").append(inputFecha).append(labelFecha);
				
				var inputPuesto  = $("<select class='form-select' style='display:none' aria-label='Default select example' style='width:300px; margin:0 auto'></select>")
                    .val(element.NombrePuesto)
                    .attr("id","empleado_puesto"+element.ID);
				$.get( "http://192.168.88.15:8090/api/puestos", function( data ) {
					if(data){
					   data.forEach(element => {
						   var puestoSelect  = element.Nombre;
						   var puestoSelectId = element.ID;
						   var puestoSelectHTML = $("<option></option").val(puestoSelectId ).text(puestoSelect);
						   inputPuesto.append(puestoSelectHTML);
					   }
					)}
				});
                var labelPuesto = $("<label></label>").text(element.NombrePuesto);
				
                var puesto = $("<td></td>").append(inputPuesto).append(labelPuesto);
				
				
				
				var inputDepartamento  = $("<select class='form-select' style='display:none' aria-label='Default select example' style='width:300px; margin:0 auto'></select>")
                    .val(element.NombreDepartamento)
                    .attr("id","empleado_departamento"+element.ID);
				$.get( "http://192.168.88.15:8090/api/departamentos", function( data ) {
					console.log(data)
					if(data){
					   data[0].forEach(element => {
						   var departamentoSelect  = element.Nombre;
						   var departamentoSelectId = element.ID;
						   var departamentoSelectHTML = $("<option></option").val(departamentoSelectId ).text(departamentoSelect);
						   inputDepartamento.append(departamentoSelectHTML);
					   }
					)}
				});
                var labelDepartamento = $("<label></label>").text(element.NombreDepartamento);
                var departamento = $("<td></td>").append(inputDepartamento).append(labelDepartamento);
            
                var editIconEmpleado = $("<td> <button type='button' class='btn btn-dark'> <i class='fa fa-edit'></i></button></td>");
                editIconEmpleado.click(function(){
                    editEmpleado(element.ID);
                })
                var deleteIconEmpleado = $("<td> <button type='button' class='btn btn-dark'> <i class='fa fa-trash'></i></button></td>");
                deleteIconEmpleado.click(function(){
                    deleteEmpleado(element.ID);
                });
                var tr = $("<tr></tr>").attr('id','tablaEmpleado'+element.ID);
               
                tr.append(nombre).
                    /*
                    append(quantity).
                    append(message).
                    append(city).*/
					
					append(documento).
					append(valorDoc).
					append(fecha).
					append(puesto).
					append(departamento).
                    append(editIconEmpleado).
                    append(deleteIconEmpleado);

                table.find("tbody").append(tr);
           });
        }
    });
    $("#tableEmpleados").append(table);
}
//generateTable();
$("#btn_buscar_empleado").click(generateTableEmpleadosFiltro);
$("#btn_listar_empleado").click(generateTableEmplados);

generateTablePuestos();
generateTableEmplados();
//$("#icon_add").click(enableEdition);
$("#icon_add_puesto").click(enableEditionPuesto);
$("#icon_add_empleado").click(enableEditionEmpleado);

//$("#btn_add").click(addData);
$("#btn_add_puesto").click(addPuesto);
$("#btn_add_empleado").click(addEmpleado);

