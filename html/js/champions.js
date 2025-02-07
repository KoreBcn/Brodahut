var leaguetable = "";
var gamestable = "";

var comp = "champions";

function championsLeague(){
	
	//document.body.style.backgroundImage = "url('images/champions.jpg')";
	
	loadLeagueTable();
	loadGames();
	getKnockOutData();
	//initKnockOutTable(comp);
	resetData();
}

 function resetData()  {
 
        document.getElementById("chp1knock1").value = "";
        document.getElementById("chp1knock1res1").value = "";
        document.getElementById("chp1knock1res2").value = "";
        document.getElementById("chp2knock1").value = "";
        document.getElementById("chp2knock1res1").value = "";
        document.getElementById("chp2knock1res2").value = "";
        document.getElementById("chp3knock1").value = "";
        document.getElementById("chp3knock1res1").value = "";
        document.getElementById("chp3knock1res2").value = "";
        document.getElementById("chp4knock1").value = "";
        document.getElementById("chp4knock1res1").value = "";
        document.getElementById("chp4knock1res2").value = "";
        
        document.getElementById("chp1knock2").value = "";
        document.getElementById("chp1knock2res1").value = "";
        document.getElementById("chp2knock2").value = "";  
        document.getElementById("chp2knock2res1").value = "";
        
        document.getElementById("chwinner").value = "";
 
 }


 function loadLeagueTable() {

	 leaguetable =  new Tabulator("#champions-table", {
		layout:'fitColumns' , //fit columns to width of table (optional)
		height:"238px",
		columns:[ //Define Table Columns
			//{title:"Group", field:"group", sorter:"string", width:150},
			{title:"Pos", field:"position", sorter:"number", align:"left",editable:true, width:60},
			{title:"Team", field:"player", sorter:"string", sortable:false, width:170},
			{title:"P", field:"played", sorter:"number", align:"center",editable:true},
			{title:"W", field:"wins", sorter:"number", align:"center",editable:true},
			{title:"D", field:"draws", sorter:"number", align:"center",editable:true},
			{title:"L", field:"lost", sorter:"number", align:"center",editable:true},
			{title:"GF", field:"gf", sorter:"number", align:"center",editable:true},
			{title:"GC", field:"ga", sorter:"number", align:"center",editable:true},
			{title:"Pts", field:"points", sorter:"number", align:"center",editable:true}
		], rowFormatter:function(row){
			//row - row component

			var data = row.getData();
			if(data.position == "1" || data.position == "2" || data.position == "3" || data.position == "4"){
				row.getElement().style.backgroundColor = "A8F7C3";
				row.getElement().style.color = "black";
				//row.getElement().style.font-weight = "bold";
				//row.getElement().rowBackgroundColor("#A8F7C3");
			}else if(data.position == "5" || data.position == "6" || data.position == "7" || data.position == "8"){
				row.getElement().style.backgroundColor = "D0DAFE";
				row.getElement().style.color = "black";
				//row.getElement().css({"background-color":"#D0DAFE"});
			}
			
		}
		});

		url="loadEuroTable.php?season=" + currentSeason + "&" + new Date().getTime();;
		
		leaguetable.setData(url);
 
} 
  
function loadGames() {
 
	param = document.getElementById("changeGWChampions").value;

 	gamestable =  new Tabulator("#games-table", {
		layout:'fitColumns',
		//persistentLayout:true, //fit columns to width of table (optional)
		height:"152px",
		//pagination:"local",
		//paginationSize:4,
		columns:[ //Define Table Columns
			//{title:"Group", field:"group", sorter:"string", width:150},
			{title:"J", field:"gameweek", sorter:"number", align:"left", width:30},
			{title:"J. Lliga", field:"gwleague", sorter:"number", align:"left", width:80,visible:false},
			{title:"CasaId", field:"homeid",visible:false},
			{title:"ForaId", field:"awayid",visible:false},
			{title:"Casa", field:"home", width:170},
			{title:"Fora", field:"away", width:170},
			{title:"Gols casa", field:"scoreh", align:"center",editor:"input"},
			{title:"Gols fora", field:"scorea", align:"center",editor:"input"},
			{title:"Punts Casa", field:"pointsh",visible:false},
			{title:"Punts Fora", field:"pointsa",visible:false},
	],
		 cellEdited:function(cell){
			
			var rowData = cell.getRow().getData();
			
			var scoreHome = rowData.scoreh;
			var scoreAway = rowData.scorea;
		
			var pointsHome = 0;
			var pointsAway = 0;
				
			if(!!scoreHome && !!scoreAway){
			
				if(scoreHome < scoreAway){	
					pointsHome = 0;
					pointsAway = 3;
				}else if (scoreHome > scoreAway){
					pointsHome = 3;
					pointsAway = 0;
				}else if (scoreHome == scoreAway){
					pointsHome = 1;
					pointsAway = 1;
				}

			}
				cell.getRow().update({pointsh:pointsHome,pointsa:pointsAway});
		 }
	});	

	url="loadEuroGames.php?gameweek=" + param + "&season=" + currentSeason + "&" + new Date().getTime();
	gamestable.setData(url);

}  


function saveEuroData() {
 

 	if (confirm('Segur que vols actualitzar les dades?')) {

		url="admin/updateTable.php?season=" + currentSeason;
		var rowData = gamestable.getData();
		var data = "data=" + JSON.stringify(rowData);
		$.ajax({
			type: "GET",
			url: url,
			data: data,
			cache:false,
			success: function(data){				
				if(data == "[{}]"){
					alert("dades actualitzades correctament");
					url="loadEuroGames.php?gameweek=" + param + "&season=" + currentSeason + "&" + new Date().getTime();
					gamestable.setData(url);
					url="loadEuroTable.php?season=" + currentSeason + "&" + new Date().getTime();
					leaguetable.setData(url);
				}else{
					alert("there was an error with the transaction");
				}								
			}
		});
 
	}
}

function saveKnockOutData() {
		
        var knockoutdata = '{"chp1knock1":"' + $("#chp1knock1").val()  + '","chp1knock1res1":"' + $("#chp1knock1res1").val() + '","chp1knock1res2":"' + $("#chp1knock1res2").val() + '",' +
			'"chp2knock1":"' + $("#chp2knock1").val()  + '","chp2knock1res1":"' + $("#chp2knock1res1").val() + '","chp2knock1res2":"' + $("#chp2knock1res2").val() + '",' +	
		    '"chp3knock1":"' + $("#chp3knock1").val()  + '","chp3knock1res1":"' + $("#chp3knock1res1").val() + '","chp3knock1res2":"' + $("#chp3knock1res2").val() + '",' +
		    '"chp4knock1":"' + $("#chp4knock1").val()  + '","chp4knock1res1":"' + $("#chp4knock1res1").val() + '","chp4knock1res2":"' + $("#chp4knock1res2").val() + '",' +
		    '"chp1knock2":"' + $("#chp1knock2").val()  + '","chp1knock2res1":"' + $("#chp1knock2res1").val() + '",' +
			'"chp2knock2":"' + $("#chp2knock2").val()  + '","chp2knock2res1":"' + $("#chp2knock2res1").val() + '",' +
			'"chwinner":"' + $("#chwinner").val()  + '"}';
		   
        alert(comp + " " + currentSeason);
        
	if(confirm("Segur que vols actualitzar el cuadre de " + comp + " per la temporada" + currentSeason + "?")){
		$.ajax({
			type: "get",
			url: "admin/saveKnockOut.php",
			data: {data: knockoutdata, comp: comp, season: currentSeason},
			cache:false,
			//dataType:'json',
			success: function(data2){
			        getData();
    			    alert("dades actualitzades");
                    	
            	}
            });

	    }		
}

function knockOutComboBox() {

	switch(document.getElementById("changeKnockOut").value){
		default:
			break;
		case "Champions":
			document.getElementById("champions-picture").src = "images/champions.png";
			comp = "champions";		
			break;
		case "UEFA":
			document.getElementById("champions-picture").src = "images/uefa.png";
			comp = "uefa";
			break;
		}
	
	resetData();
	getKnockOutData(comp);
}

function getKnockOutData() {
    	
    	$.ajax({
    		type: "get",
    		url: "loadKnockOut.php",
        	dataType:'json',
    		data: {comp: comp, season: currentSeason},
    		//cache:false,
    		success: function(data2){

                document.getElementById("chp1knock1").value = data2.chp1knock1;
                document.getElementById("chp1knock1res1").value = data2.chp1knock1res1;
                document.getElementById("chp1knock1res2").value = data2.chp1knock1res2;
                document.getElementById("chp2knock1").value = data2.chp2knock1;
                document.getElementById("chp2knock1res1").value = data2.chp2knock1res1;
                document.getElementById("chp2knock1res2").value = data2.chp2knock1res2;
                document.getElementById("chp3knock1").value = data2.chp3knock1;
                document.getElementById("chp3knock1res1").value = data2.chp3knock1res1;
                document.getElementById("chp3knock1res2").value = data2.chp3knock1res2;
                document.getElementById("chp4knock1").value = data2.chp4knock1;
                document.getElementById("chp4knock1res1").value = data2.chp4knock1res1;
                document.getElementById("chp4knock1res2").value = data2.chp4knock1res2;

                document.getElementById("chp1knock2").value = data2.chp1knock2;
                document.getElementById("chp1knock2res1").value = data2.chp1knock2res1;
                document.getElementById("chp2knock2").value = data2.chp2knock2;  
                document.getElementById("chp2knock2res1").value = data2.chp2knock2res1;
                                         
                document.getElementById("chwinner").value = data2.chwinner;
                
                //alert(data2.winner);
                

    		}
    	});
    }
