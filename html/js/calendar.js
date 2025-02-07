var calendartable = "";
var printIcon = function(cell, formatterParams){ //plain text value
    return "<img src='images/save.JPG' alt='Guardar' height='22' width='22'>";
};

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
			{title:"Jornada Europea", field:"eurogk", editor:"select", editorParams:{values:["","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]}, align:"center"},
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