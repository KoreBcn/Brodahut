var managerNameUpdated = false;
var managerId = 0;
var managerName = "";
var managerDestId = 0;
var tableData = "";
var insertclausetable = "";
var clausetable = "";

function insertPlayerClause(){
	
	var rowData = insertclausetable.getData();
	
	var processData = "\n";
	var x;
	var validation = true;
	
	if(rowData.length > 0 ){
		
		for(x in rowData){
			//alert(rowData[x].cappoints);
			//alert(rowData[x].cappoints == ""); 
			if(rowData[x].player == "" || rowData[x].playervalue == 0 || "" == rowData[x].manager || "" == rowData[x].txntype ){		
				alert("Falta introduir dades. Revisa tots els camps");
				validation = false;			
				break;
			}else{
				processData += rowData[x].player + " : " + rowData[x].payment + ",\n"
			}
		
		}
		
		var data = "data=" + JSON.stringify(rowData);
		//alert(data);
		if(validation){
			if (confirm('Insertar dades?')) {
				
				$.ajax({
					type: "GET",
					url: "admin/insertClauseRecord.php",
					data: data,
					cache:false,
					success: function(data){
						//$("#pay-hist").tabulator("setData", "selectSalary.php");
						clausetable.setData("loadClauseInfo.php");
						createPlayerComboBox();
						//loadGraph();
						//changeManagerTable();
						//changeGWStats();
						alert("Dades insertades");
					}
				});
				
			}
		}
	}	
}


//function createPlayerComboBox(){
//	
//	
//	managerNameUpdated = false;
//	
//	var comboData = "<select><option ";
//	$.ajax({
//		type: "GET",
//		url: "loadPayInfoAdmin.php",
//		data: "",
//		cache:false,
//		success: function(data){
//
//			var obj = JSON.parse(data);
//			for (i = 0; i < obj.length; i++) { 
//				comboData += "<option value='" + obj[i].playerId + " " + obj[i].player + "'>" + obj[i].playerId + " " + obj[i].player + "</option>";
//				
//			}
//			comboData += "</select>"
//			loadClauseTables(comboData);
//			
//		}
//	});
//}

var comboData = [];
var comboDataId = [];

function createPlayerComboBox(){
	
	var xhttp = new XMLHttpRequest();

	
	xhttp.open("GET", "loadPayInfoAdmin.php", true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(xhttp.responseText);
				for (i = 0; i < obj.length; i++) { 
					comboData.push(obj[i].playerId + " " + obj[i].player); 
					//comboDataId.push(obj[i].playerId)
				}
				
			loadClauseTables();
			//alert(comboData);
       }
    };
	

}



function loadClauseInfo(){
	
	clausetable =  new Tabulator("#clause-info", {
		layout:'fitColumns',
		height:"75%",
		columnMinWidth:120,
		//movableCols:true,
		//movableRows:true,
		//pagination:"local",
		//paginationSize:10,
		tooltips:true,
		groupBy:"txntype",
		groupStartOpen:true,
		columns:[
			{title:"Manager Pagador", field:"manager", sortable:true, width: 170, headerFilter:true, frozen:true},
			{title:"Manager Destinatari", field:"managerdest", sortable:true, width: 170, headerFilter:true },
			{title:"Id", field:"id", visible:false},
			{title:"ManagerId", field:"managerid", visible:false},
			{title:"ManagerDestId", field:"managerdestid", visible:false},
			{title:"Tipo Txn", field:"txntype", sortable:true, align:"center", visible:false},
			{title:"Jugador", field:"player", sortable:true, sorter:"string",headerFilter:true},
			{title:"Valor Jugador", field:"playervalue", sorter:"number", sortable:true, align:"center", formatter:"money", sortable:true, formatterParams:{precision:0, thousand :'.', symbol:'€', symbolAfter:true}},
			{title:"Preu renovació", field:"renewclause", sorter:"number", sortable:true, align:"center", formatter:"money", sortable:true, formatterParams:{precision:0, thousand :'.', symbol:'€', symbolAfter:true}},
			{title:"Jornada renovació", field:"gwrenovation", sorter:"number", sortable:true, align:"center"},
			{title:"LLiure", field:"gwunlock", sorter:"number", sortable:true, align:"center"},
			{formatter:removeIcon, width:40, align:"center", cellClick:function(e, cell){
				
				if(confirm("Segur que vols esborrar el registre: " + cell.getRow().getCell("player").getValue() + " ?")){
				
						var data = "data=[" + JSON.stringify(cell.getRow().getData()) + "]";
						
						 $.ajax({
						   type: "GET",
						   url: "admin/deleteClauseRecord.php",
						   data: data,
						   cache:false,
						   success: function(data){
								clausetable.setData("loadClauseInfo.php");
								alert("registre esborrat correctament");
							}
						});

					}
				}
			}	
			]
			});


	clausetable.setData("loadClauseInfo.php");
	//createPlayerComboBox();	
}

function loadClauseTables(){
	
	insertclausetable =  new Tabulator("#insert-clause", {
		layout:'fitColumns',
		height:"100px",
		columnMinWidth:120,
		//movableCols:true,
		//movableRows:true,
		tooltips:true,
		columns:[
			{title:"ManagerId", field:"managerid", editor:"input", visible:false},
			{title:"Manager", field:"manager", editor:"select", editorParams:{values:comboData}},
			{title:"ManagerDestId", field:"managerdestid", editor:"input", visible:false},
			{title:"Manager detinatari", field:"managerdest", editor:"select", editorParams:{values:comboData}},
			{title:"Tipo Txn", field:"typetxn", editor:"select", editorParams:{values:["Pagar Clausula","Renovar"]}},
			{title:"Jugador", field:"player", editable: true, sorter:"string", editor:"input"},
			{title:"Valor Jugador", field:"playervalue", editable: true, sorter:"string", editor:"input", formatter:"money", sortable:true, formatterParams:{precision:0, thousand :'.', symbol:'€', symbolAfter:true}},
			{title:"Preu", field:"renewclause", sorter:"string", formatter:"money", sortable:true, formatterParams:{precision:0, thousand :'.', symbol:'€', symbolAfter:true}},
			{title:"Jornada", field:"gwrenovation", sorter:"number", editor:"input"},
			{title:"Lliure", field:"gwunlock", sorter:"string"}
		],
		cellEdited:function(cell){
				
			var renewClause = "";
			var gwUnlock = "";
			var destManager = ""
			var managerDestId = 0;

			var rowData = cell.getRow().getData();		

				if(!!rowData.playervalue && rowData.typetxn == "Renovar"){
					renewClause = rowData.playervalue*0.2;
					destManager = "";
					managerDestId = 0;
				}else if(!!rowData.playervalue && rowData.typetxn == "Pagar Clausula"){
					
					if(rowData.playervalue < 10000000){
						renewClause = rowData.playervalue*4;
					}else if(rowData.playervalue >= 10000000 && rowData.playervalue < 20000000){
						renewClause = rowData.playervalue*3;
					}else if(rowData.playervalue >= 20000000 && rowData.playervalue < 30000000){
						renewClause = rowData.playervalue*2.5;
					}else if(rowData.playervalue >= 30000000 && rowData.playervalue < 60000000){
						renewClause = rowData.playervalue*2;
					}else if(rowData.playervalue >= 60000000){
						renewClause = rowData.playervalue*1.75;
					}
				}
								
								
				//alert(managerNameUpdated);
				if(!!rowData.manager ){
					managerId = rowData.manager.substring(0,1);
					managerName = rowData.manager;

					//.substring(1,rowData.manager.length);
					//managerNameUpdated = true;
				}
				
				if(!!rowData.managerdest && rowData.typetxn != "Renovar"){
					destManager = rowData.managerdest;
					managerDestId = rowData.managerdest.substring(0,1);
					//.substring(1,rowData.manager.length);
					//managerNameUpdated = true;k
				}
				
				if(!!rowData.gwrenovation ){
					gwUnlock = rowData.gwrenovation*1+12;
				}
				
			cell.getRow().update({renewclause:renewClause,gwunlock:gwUnlock,managerdestid:managerDestId, managerdest:destManager, managerid:managerId, manager:managerName});
		}
			
	});



	tableData = [{manager:"", managerdest:"", player:""}];

	insertclausetable.setData(tableData);
	//createPlayerComboBox();	
}