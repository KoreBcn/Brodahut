var stadiumtable = "";

function loadStadiumTable(){

//Deprecated after installing version 4.5
//var imageFormatter = function(cell, formatterParams){
//	var value = this.sanitizeHTML(cell.getValue());
//	//var value = "images/remove.JPG";
//	//alert(value)
//	var img = $("<img src='" + value + "'/>");
//	
//	img.css({width:"170px"});
//	img.css({height:"85px"});
//	
//	img.on("load", function(){
//		cell.getRow().normalizeHeight();
//		stadiumtable.redraw();
//	}
//	)
//	return img;
//}

var saveIcon = function(cell, formatterParams){ //plain text value
    return "<img src='images/save.JPG' alt='Guardar' height='22' width='22'>";
};

 stadiumtable =  new Tabulator("#stadiumTable", {
			layout:'fitColumns',
			tooltips:true,
			height:"86%",
			columnMinWidth:120,
	columns:[
			{title:"Manager", field:"manager", sortable:true, sorter:"string", formatter:"textarea", frozen:true},
			{title:"id", field:"id", sortable:true, visible:false},
			{title:"Nom Estadi", field:"stadium", sortable:true, editor: true, sorter:"string", formatter:"textarea"},
			{title:"Prestigi", field:"reputation", sortable:true, formatter:"star", sorter:"number", align:"center", formatterParams:{stars:6}},
			{title:"Foto", field:"picstadium", formatter:"image", align:"center", variableHeight:true, formatterParams:{height:'85px', width:'170px'} },
			{title:"Aforament", field:"seats",  formatter:"money",align:"center" ,formatterParams:{precision:0, thousand :'.'}, editor:"select",  editorParams:{values:["10000", "20000", "30000", "40000", "50000", "60000", "70000", "80000", "90000", "100000", "110000", "120000"]}},
			{title:"Instal.lacions",
				columns:[
					{title:"Terreny", field:"field",  editor:"select",  editorParams:{values:["Sorra", "Artificial", "Natural", "Amb calefacció","Jardiner"]}},
					{title:"Estructura", field:"structure",  editor:"select",  editorParams:{values:["Cap", "Funcional", "Ciments sòlids", "Sostre cobert", "Arquitecte"]}},
					{title:"Parking", field:"pk",  editor:"select",  editorParams:{values:["Sense iluminació", "Aire lliure", "Funcional", "Subterranis", "Aparca-cotxes"]}},
					{title:"Il.luminació", field:"light",  editor:"select",  editorParams:{values:["Sense iluminació", "Bàsica", "Decent", "Bona", "Tècnic de llums"]}},
					{title:"Marcador", field:"score",  editor:"select",  editorParams:{values:["Sense Marcador", "Manual", "Electrònic", "Videomarcador", "Speaker"]}},
				 ],
			},
			//Deprecated after Victor left
			//{title:"Merchandising",
			//	columns:[
			//		{title:"Tendes", field:"nbrstores", sortable:true, formatter:"star", sorter:"number", align:"center", formatterParams:{stars:10}, editor: true},
			//		{title:"Director Marketing", field:"director", sortable:true, formatter:"star", sorter:"number", align:"center", formatterParams:{stars:10}, editor: true},
			//	]},
			{title:"Diners invertits", field:"investment", formatter:"money", align:"center", sortable:true, sorter:"number", formatterParams:{precision:0, thousand :'.', symbol:'€', symbolAfter:true},  editor: true},
			{formatter:saveIcon, width:40, align:"center", cellClick:function(e, cell){
			
			if(confirm("Segur que vols actualitzar les dades d'estadi de " + cell.getRow().getCell("manager").getValue() + " ?")){
			
		    	var data = "data=[" + JSON.stringify(cell.getRow().getData()) + "]";
			
			    //alert(data);
    			$.ajax({
    				type: "GET",
    				url: "admin/updateStadium.php",
    				data: data,
    				cache:false,
    				success: function(data){

						if(data == "[{}]"){
							alert("dades actualitzades correctament");
							stadiumtable.setData("stadiumInfo.php?" + new Date().getTime());
						}else{
							alert("there was an error with the transaction");
						}	
    				}
    			});
			}
			
			}}	

		]
	});
	
	stadiumtable.setData("stadiumInfo.php");
}

function saveStadiumData() {
 
 	if (confirm('Segur que vols actualitzar les dades?')) {

		var rowData = $("#stadiumTable").tabulator("getData", true);
		var data = "data=" + JSON.stringify(rowData);
		alert(data);
		$.ajax({
			type: "GET",
			url: "admin/updateStadium.php",
			data: data,
			cache:false,
			success: function(data){	
				stadiumtable.setData("stadiumInfo.php");
				alert("dades actualitzades correctament");
			}
		});
 
	}
}