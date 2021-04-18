var ids = [];

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
                var deleteIcon = $("<td> <button type='button' class='btn btn-dark'> <i class='fa fa-trash'></i></button></td>");
                deleteIcon.click(function(){
                    deleteData(element.Id);
                });
                var tr = $("<tr></tr>").attr('id','row'+element.Id);
               
                tr.append(id).
                    append(title).
                    append(quantity).
                    append(message).
                    append(city).
                    append(editIcon).
                    append(deleteIcon);

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

var login = function(){
    $("#login_div").hide();
    $("#body_div").show();
}

generateTable();
$("#icon_add").click(enableEdition);
$("#btn_add").click(addData);