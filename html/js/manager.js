var managertable = "";

function loadManagerTable(){

var printIcon = function(cell, formatterParams){ //plain text value
    return "<img src='images/save.JPG' alt='Guardar' height='22' width='22'>";
};

//Deprecated after installing version 4.5 of tabulator
//var imageFormatter = function(cell, formatterParams){
//	var value = this.sanitizeHTML(cell.getValue());
//	var img = $("<img src='" + value + "'/>");
//
//	img.css({width:"160px"});
//	img.css({height:"80px"});
//	
//	//img.on("load", function(){
//	//	cell.getRow().normalizeHeight();
//	//	$("#sponsorsTable").tabulator("redraw");
//	//})
//
//	return img;
//}
	
	managertable =  new Tabulator("#managerTable", {
			layout:'fitColumns',
			tooltips:true,
			height:"90%",
			columnMinWidth:120,
			//responsiveLayout:true,
	columns:[
		{title:"Manager", field:"manager", sortable:true, sorter:"string",formatter:"textarea", editor: "input", frozen:true},
		{title:"id", field:"id", sortable:true},
		{title:"Descripció", field:"desc", sorter:"string", width:500, formatter:"textarea", editor: "input",visible:false},
		{title:"Prestigi", field:"reputation", sortable:true, formatter:"star", sorter:"number", align:"center", formatterParams:{stars:6}},
		{title:"Estadi", field:"stadium", sortable:true, formatter:"star", sorter:"number", align:"center", formatterParams:{stars:6}},
		//{title:"Sponsor", field:"sponsor", 	formatter:imageFormatter, width:170,  align:"center", editor: "input"},
		//{title:"Drets TV", field:"tvrights", 	formatter:imageFormatter, width:170,  align:"center", editor: "input"},
		//{title:"Sponsor", field:"sponsor", formatter:"image", align:"center", variableHeight:true, editor: "input",  width:200, formatterParams:{width:'200px',height:'80px'} },
		//{title:"Drets TV", field:"tvrights", formatter:"image", align:"center", variableHeight:true, width:200, formatterParams:{width:'200px',height:'80px'}, editor: "input" },		
		{title:"Palmarés",
            columns:[
				{title:"Lligues", field:"league", sortable:true, formatter:"star", sorter:"number", align:"center", formatterParams: {stars:7}},
				{title:"Champions", field:"champions", sortable:true, formatter:"star", sorter:"number",align:"center", formatterParams: {stars:3}},		
				{title:"UEFA", field:"uefa", sortable:true, formatter:"star", sorter:"number", align:"center", formatterParams: {stars:3}},
				{title:"Copes", field:"cup", sortable:true, formatter:"star",  sorter:"number", align:"center",formatterParams: {stars:3}},
				{title:"Euro", field:"euro", sortable:true,formatter:"star", sorter:"number", align:"center",formatterParams: {stars:2}},	
				{title:"Mundials", field:"worldcup", sortable:true,formatter:"star", sorter:"number", align:"center",formatterParams: {stars:3}},
				{title:"Derbis", field:"rival", sortable:true, sorter:"number", align:"center", editor:"input", visible: false}
            ],
        },
		{formatter:printIcon, width:40, align:"center", cellClick:function(e, cell){
			
		
			
		  
			    
			if(confirm("Segur que vols actualitzar les dades de " + cell.getRow().getCell("manager").getValue() + " ?")){
				var data = "data=[" + JSON.stringify(cell.getRow().getData()) + "]";
		    	 // alert(data);
    			$.ajax({
    				type: "GET",
    				url: "admin/updateManager.php",
    				data: data,
    				cache:false,
    				success: function(data){

						if(data == "[{}]"){
							alert("dades actualitzades correctament");
							managertable.setData("managerInfo.php?" + new Date().getTime());
						}else{
							alert("there was an error with the transaction");
						}	
		    
    				}
    			});
			}
			
			}}		
		]
	});
	
	managertable.setData("managerInfo.php");
	
}

function saveManagerData() {
 
 	if (confirm('Segur que vols actualitzar les dades?')) {

		var rowData = $("#managerTable").tabulator("getData", true);
		var data = "data=" + JSON.stringify(rowData);
		
		alert(data);
		$.ajax({
			type: "GET",
			url: "admin/updateManager.php",
			data: data,
			cache:false,
			success: function(data){
				managertable.setData("managerInfo.php");
				alert("dades actualitzades correctament");
			}
		});
 
	}
}