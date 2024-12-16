var paramDesc = "";

function loadGraph(){

		param = document.getElementById("changeGraph").value;

		var t = document.getElementById("changeGraph");
		paramDesc = t.options[t.selectedIndex].text;
		
		//param = 'total_renew';
		
		if (param=="pretemp") {
			url = "statsPreTempTable.php";
		}else if (param=="total_renew"){
		    loadGraph2("loadRenewGraph.php");
		}else if (param=="stadium_investment"){
		    loadGraph2("loadStadiumInvest.php");
		}else if (param=="clause_payment"){
		    loadGraph2("loadPayClauseGraph.php");
		}else {
			url = "graph.php"
		}

		$(document).ready(function() {

		
		var options = {
			
			 chart: {
			 renderTo: 'graph',
			 backgroundColor: 'rgba(250,235,215, 0.65)'
        },
        title: {
            text: paramDesc
        },
        xAxis: {
            categories: [],
            title: {
                text: 'Jornada'
            }
        },plotOptions: {
			series: {
					pointWidth: 25
			}
		},
       
        credits: {
            enabled: false
        },
        series: [{
            name: 'Guilleurinho'
        },{
            name: 'Nikklopp'
        },{
            name: 'Cholo'
        },{
            name: 'Climendiola'
        },{
            name: 'Abrahamxarlich'
        },{
            name: 'Karlverde'
        },{
            name: 'Pepcelo'
        },{
            name: 'Luis Enrique'
        },{
            name: 'Borjalotti'
        }]
			
		};
		
			$.ajax({
				type: "get",
				url: url,
				//cache:false,
				dataType:'json',
				data: {query: param, season: currentSeason},
				success: function(data){
					
					
					options.xAxis.categories = data.gameweek;
					//alert(currentSeason);
					//alert(data.player1);				
					options.series[0].name = data.playerlist[0];
					options.series[1].name = data.playerlist[1];
					options.series[2].name = data.playerlist[2];
					options.series[3].name = data.playerlist[3];
					options.series[4].name = data.playerlist[4];
					options.series[5].name = data.playerlist[5];
					options.series[6].name = data.playerlist[6];
					options.series[7].name = data.playerlist[7];
					
					options.series[0].data = data.player1;
					options.series[1].data = data.player2;
					options.series[2].data = data.player3;
					options.series[3].data = data.player4;
					options.series[4].data = data.player5;
					options.series[5].data = data.player6;
					options.series[6].data = data.player7;
					options.series[7].data = data.player8;

					var chart = new Highcharts.Chart(options);
			}
			});
	});
}

function changeManagerTable(){

param = document.getElementById("changeTable").value

var formatCell = function(cell, formatterParams){
			   var value = parseInt(cell.getValue());
			   return formatMoney(value);
			   
			}
			
var custPoints = function(cell, formatterParams){
    var val = parseInt(cell.getValue());
    //alert(val)
    return val;
}

var managertable = new Tabulator("#manager-month", {
			//pagination:"local",
			//paginationSize:8,
		//	height:"32%",
			layout:'fitColumns',
			tooltips:true,
			groupBy:"month",
			columnMinWidth:120,
            groupStartOpen:false,
            groupHeader:function(value, count, data, group){
                //value - the value all members of this group share
                //count - the number of rows in this group
                //data - an array of all the row data objects in this group
                //group - the group component for the group
            
                return value + "<span style='color:#d00; margin-left:10px;'></span>";
            },
            groupStartOpen:function(value, count, data, group){
                //value - the value all members of this group share
                //count - the number of rows in this group
                //data - an array of all the row data objects in this group
                //group - the group component for the group
                return (value== months[d.getMonth()] || value=="Season"); //all groups with more than three rows start open, any with three or less start closed
            },
	columns:[
		//{title:"Mes", field:"month", sortable:true, sorter:"string",  headerFilter:true},
        {title:"Name", field:"name", sorter:"string",  width:170, frozen:true},
		{title:"Pts", field:"points", sortable:true, sorter:"number", formatter:custPoints, align:"center"},
		{title:"Finances",
			columns:[
				{title:"Ingressos", field:"total_income", sorter:"number", sortable:true, formatter:formatCell,  align:"center"},
				{title:"Salaris", field:"penal", sortable:true, sorter:"number", formatter:formatCell,  align:"center"},
				{title:"Evo Equip", field:"teamgrowth", sortable:true, sorter:"number", formatter:formatCell,  align:"center" },
				{title:"Evo Saldo", field:"balancegrowth", sortable:true, sorter:"number",  formatter:formatCell,  align:"center"},
				{title:"Balanç", field:"net", sortable:true, sorter:"number",formatter:formatCell,  align:"center"},
		]},
		{title:"Premis per posicio", field:"prize", sortable:true, sorter:"number", visible:false,
		    formatter:formatCell},
		{title:"Capità", field:"cappoints", sortable:true, sorter:"number", formatter:custPoints,  align:"center"},
		//{title:"Onze", field:"onzeideal", sortable:true, sorter:"number", align:"center"}
		]
	});
		
	url="";
	
	switch(param){
			case "month":
				url="statsSummary.php?query=month" + "&season=" + currentSeason + "&" + new Date().getTime();
				break;
			case "season":
				url="statsSummary.php?query=season" + "&season=" + currentSeason + "&" + new Date().getTime();
				break;		
	}
	
	managertable.setData(url);
}


function changeGWStats(){

paramGW = document.getElementById("gameweekStats").value;

var custCalc = function(values, data, calcParams){
    //values - array of column values
    //data - all table data
    //calcParams - params passed from the column defintion object

    var count = 0;
	var sum = 0;
	var calc = 0;
	
    values.forEach(function(value){
		sum = sum + parseInt(value);
		//alert(sum);
		count ++;
	});

	calc = sum/count;
    return calc.toFixed(2);
}

var bottomFormat = function(cell, formatterParams){
    
	   var value = parseInt(cell.getValue());
	   if(paramGW.includes("tv_rights") || paramGW.includes("sponsor") || paramGW.includes("extra_payment_val") || paramGW.includes("audience") || paramGW.includes("team_salary") || paramGW.includes("payment") || paramGW.includes("futmondo_prize") || paramGW.includes("total") || paramGW.includes("position_prize")){
		   return formatMoney(value);
	   }else if(paramGW.includes("gameweek_position") || paramGW.includes("best_lineup") || paramGW.includes("captain_points") || param.includes("gameweek_points") ){
	       return "<span'>" + parseFloat(cell.getValue()).toFixed(1) + "</span>";
	   }else if(paramGW.includes("captain")){
			return ("");
	   }else{
           return "<span'>" + value.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1.') + "</span>";
	   }
	   
}

var formatCell = function(cell, formatterParams){
	 
	  var value;
	  
	   if(paramGW.includes("captain")){
	        value = cell.getValue();
	   }else{
	        value = parseInt(cell.getValue());
	   }

	   if(paramGW.includes("tv_rights") || paramGW.includes("sponsor") || paramGW.includes("extra_payment_val") || paramGW.includes("audience") || paramGW.includes("team_salary") || paramGW.includes("payment") || paramGW.includes("futmondo_prize") || paramGW.includes("total") || paramGW.includes("position_prize")){
		   return formatMoney(value);
	   }else if(paramGW.includes("captain")){
			return value;
	   }else{
           return "<span'>" + value.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1.') + "</span>";
	   }
}


	gameweekstatstable = new Tabulator("#gameweek-stats",{
			layout:'fitColumns',
			//height:"47%",
			columnMinWidth:120,
			//movableRows:true,
			//tooltips:true,
	columns:[
		{title:"Jornada",  		field:"gameweek", sortable:true, sorter:"number", align:"center",  width:45, frozen:true},
        {title:"Guillerinho",		 field:"player1", sortable:true, sorter:"number", align:"center", formatter:formatCell,bottomCalc:custCalc, bottomCalcFormatter:bottomFormat},
		{title:"Niklop", 		field:"player2", sortable:true, sorter:"number", align:"center", bottomCalc:custCalc, bottomCalcFormatter:bottomFormat, formatter:formatCell},
		{title:"Cholo", 		field:"player3", sortable:true, sorter:"number", align:"center", bottomCalc:custCalc, bottomCalcFormatter:bottomFormat, formatter:formatCell},
        {title:"Climente", 	    field:"player4", sortable:true, sorter:"number", align:"center", bottomCalc:custCalc, bottomCalcFormatter:bottomFormat, formatter:formatCell},
		{title:"Abrahamxarlich",field:"player5", sortable:true, sorter:"number", align:"center", bottomCalc:custCalc, bottomCalcFormatter:bottomFormat, formatter:formatCell},
        {title:"Karlverde", 	field:"player6", sortable:true, sorter:"number", align:"center", bottomCalc:custCalc, bottomCalcFormatter:bottomFormat, formatter:formatCell},
		{title:"Pipedine", 		field:"player7", sortable:true, sorter:"number", align:"center", bottomCalc:custCalc, bottomCalcFormatter:bottomFormat, formatter:formatCell},
		{title:"Luis Enrique",  field:"player8", sortable:true, sorter:"number", align:"center", bottomCalc:custCalc, bottomCalcFormatter:bottomFormat, formatter:formatCell},
		{title:"Borjalotti",  field:"player9", sortable:true, sorter:"number", align:"center", bottomCalc:custCalc, bottomCalcFormatter:bottomFormat, formatter:formatCell},
		]
	});

	url="statstable.php?query=" + paramGW + "&season=" + currentSeason + "&" + new Date().getTime();

	//var data = [{"gameweek":1,"player1":1,"player2":4,"player3":6,"player4":2,"player5":3,"player6":5,"player7":7,"player8":8},{"gameweek":2,"player1":4,"player2":2,"player3":8,"player4":1,"player5":3,"player6":5,"player7":7,"player8":6},{"gameweek":3,"player1":2,"player2":1,"player3":8,"player4":3,"player5":5,"player6":6,"player7":4,"player8":7},{"gameweek":4,"player1":4,"player2":1,"player3":5,"player4":3,"player5":2,"player6":8,"player7":8,"player8":5},{"gameweek":5,"player1":1,"player2":3,"player3":2,"player4":8,"player5":5,"player6":4,"player7":6,"player8":7},{"gameweek":6,"player1":3,"player2":4,"player3":5,"player4":1,"player5":7,"player6":2,"player7":6,"player8":8},{"gameweek":7,"player1":1,"player2":3,"player3":6,"player4":7,"player5":8,"player6":4,"player7":5,"player8":2}];
	
	gameweekstatstable.setData(url);
	
}

function loadGraph2(pageToLoad){
	
	
	if(!!graph){
		//graph.destroy();
	}    
	
    $(document).ready(function() {

		
		var options = {
			
			 chart: {
			 renderTo: 'graph',
			 backgroundColor: 'rgba(250,235,215, 0.65)'
        },
        title: {
            text: paramDesc
        },
        xAxis: {
			categories: [],
			crosshair: true
        },  plotOptions: {
			series: {

			}
		},
       
        credits: {
            enabled: false
        },
        series: [{  name: 'Despeses',
        			threshold : 0,
        			type: 'column',
        			color: '#20B2AA'}]
			
		};
		
			$.ajax({
				type: "get",
				url: pageToLoad,
				data: {season: currentSeason},
				//cache:false,
				dataType:'json',
				success: function(data){
					
					options.xAxis.categories = data.players;
					options.series[0].data = data.value;
					var chart = new Highcharts.Chart(options);
				}
			});
	});
    
}