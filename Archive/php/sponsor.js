var sponsorstable = "";
var tvrightstable = "";
var calendartable = "";
var printIcon = function(cell, formatterParams){ //plain text value
    return "<img src='images/save.JPG' alt='Guardar' height='22' width='22'>";
};


function loadSponsorsTable(){

	var formatCell = function(cell, formatterParams){
				   var value = parseInt(cell.getValue());
				   return formatMoney(value);
	}

	sponsorstable =  new Tabulator("#sponsorsTable", {
				layout:'fitColumns',
				tooltips:true,
				//height:"85%",
				columnMinWidth:120,
		columns:[
			{title:"Id", field:"id", align:"center", visible:false},
			{title:"Patrocinador", field:"sponsor", formatter:"image", align:"center", variableHeight:true, editor: "input",  width:170, formatterParams:{width:'170',height:'85px'} },
			{title:"Ingrés incial", field:"startincome",editor:"input", sortable:true, align:"center", sorter:"number", formatter:formatCell},
			{title:"Regal exclusiu", field:"extra",editor:"input", sorter:"string", formatter:"textarea"},
			{title:"Bonus", field:"bonus",editor:"input", sortable:true, width:350, sorter:"string", formatter:"textarea"},
			{title:"Fixes", field:"fixed",editor:"input", sortable:true, align:"center", sorter:"number", formatter:formatCell},
			{title:"Variables", field:"variable",editor:"input", sortable:true, sorter:"string", formatter:"textarea"},
			{formatter:printIcon, width:40, align:"center", cellClick:function(e, cell){
				
				alert("Segur que vols actualitzar les dades de " + cell.getRow().getCell("sponsor").getValue() + " ?")
						var data = "data=[" + JSON.stringify(cell.getRow().getData()) + "]";
						//alert(data);
						$.ajax({
							type: "GET",
							url: "admin/updateSponsor.php",
							data: data,
							cache:false,
							success: function(data){
								sponsorstable.setData("sponsorsInfo.php");
								alert("dades actualitzades correctament");
							}
						});
						
				}},			
			]
		});
		
	sponsorstable.setData("sponsorsInfo.php");


}

function loadTvRightsTable(){
	
var formatCell = function(cell, formatterParams){
				   var value = parseInt(cell.getValue());
				   return formatMoney(value);
	}

	tvrightstable =  new Tabulator("#tvrightsTable", {
				layout:'fitColumns',
				tooltips:true,
				//height:"44%",
				columnMinWidth:120,
		columns:[
			{title:"Id", field:"id", align:"center", visible:false},
			{title:"Canal", field:"channel", formatter:"image", align:"center", variableHeight:true, editor: "input",  width:170, formatterParams:{width:'170',height:'85px'} },
			{title:"Duració Contracte",editor:"input", align:"center", field:"duration", sortable:true, sorter:"number"},
			{title:"Ingrés inicial",editor:"input", align:"center", field:"startincome", sorter:"number", formatter:formatCell},
			{title:"Bonus", field:"bonus",editor:"input", sortable:true, sorter:"string", formatter:"textarea", width:350},
			{title:"Fixes", field:"fixed",editor:"input", align:"center", sortable:true, sorter:"number", formatter:formatCell},
			{title:"Variables", field:"variable", align:"center",editor:"input", sortable:true, sorter:"number", formatter:formatCell},
			{formatter:printIcon, width:40, align:"center", cellClick:function(e, cell){
				
				alert("Segur que vols actualitzar les dades de " + cell.getRow().getCell("channel").getValue() + " ?")
				
				var data = "data=[" + JSON.stringify(cell.getRow().getData()) + "]";
				
				alert(data);
				$.ajax({
					type: "GET",
					url: "admin/updateTV.php",
					data: data,
					cache:false,
					success: function(data){
						tvrightstable.setData("tvrightsInfo.php");
						alert("dades actualitzades correctament");
					}
				});
				
				}}	
			]
		});
		
	tvrightstable.setData("tvrightsInfo.php");
}

function loadCalendar(){

	calendartable =  new Tabulator("#calendarTable", {
				layout:'fitColumns',
				tooltips:true,
				height:"85%",
				columnMinWidth:120,
		columns:[
			//{title:"Id", field:"id", align:"center", visible:false},
			{title:"Jornada", field:"gameweek", align:"center"},
			{title:"Esdeveniment", field:"description", editor:"select", editorParams:{values:["Supercopa Catalana","Supercopa Europea","Jackpot","Descans","Eurolliga","Quarts Copa","Semis Copa","Quarts Champions","Semis Champions","Final Copa","Final Champions"]}},
			{title:"Jornada Europea", field:"eurogk", editor:"select", editorParams:{values:["","1","2","3","4","5","6","7","8","9","10","11","12","13","14"]}, align:"center"},
			{formatter:printIcon, width:40, align:"center", cellClick:function(e, cell){
				

					if (confirm("Segur que vols actualitzar les dades de " + cell.getRow().getCell("gameweek").getValue() + " ?")) {
					
						var data = "data=[" + JSON.stringify(cell.getRow().getData()) + "]";
						//var data = JSON.stringify(cell.getRow().getData());
						//alert(data);
						//calendartable.setData("http://brodahutleague.vacau.com/admin/updateCalendar.php", {data}, "post"); //make a post request
						//calendartable.setData();
						$.ajax({
							type: "GET",
							url: "/admin/updateCalendar.php",
							data: data,
							cache:false,
							success: function(data){
								//alert(data);
								if(data == "[{}]"){
									alert("dades actualitzades correctament");
									calendartable.setData("loadCalendarInfo.php?"+ new Date().getTime());
								}else{
									alert("there was an error with the transaction");
								}								
							}
						});
					}		
				}},			
			], rowFormatter:function(row){
			//row - row component

				var data = row.getData();
				if(data.description == "Jackpot"){
					row.getElement().style.backgroundColor = "ffffb3";
					row.getElement().style.color = "black";
				}else if(data.description == "Quarts Copa" || data.description == "Semis Copa" || data.description == "Final Copa"){
					row.getElement().style.backgroundColor = "ff9999";
					row.getElement().style.color = "black";
				}else if(data.description == "Eurolliga" || data.description == "Semis Champions" || data.description == "Final Champions"){
					row.getElement().style.backgroundColor = "ccccff";
					row.getElement().style.color = "black";
				}else if(data.description == "Descans"){
					row.getElement().style.backgroundColor = "f2f2f2";
					row.getElement().style.color = "black";
				}
			}	
		});
		
	calendartable.setData("loadCalendarInfo.php?"+ new Date().getTime());


}