var prevGameWeek = "0";
var weekpointstable = "";
var payhisttable = "";
var pretemptable = "";

function loadWeekPoint(){

	var formatCell = function(cell, formatterParams){
				   var value = parseInt(cell.getValue());
				   return formatMoney(value);
	}
	
	weekpointstable = new Tabulator("#week-points", {
		layout:'fitColumns',
		height:"33%",
		//movableCols:true,
		//movableRows:true,
		columnMinWidth:110,
		tooltips:true,
		columns:[
			{title:"Manager", field:"player", sortable:true, sorter:"string", frozen:true},
			{title:"Jornada", field:"gameweek", sortable:true, sorter:"number", align:"center"},
			{title:"Mes", visible:false,field:"month",  editor:"select", editorParams:{values:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}},
			{title:"Player_id", field:"playerId", sortable:true, sorter:"string",  visible:false},
			{title:"Prestigi",  visible:false, field:"reputation", sortable:true, formatter:"star", sorter:"number", align:"center"},
			{title:"Valor d'equip", field:"teamval", sortable:true, sorter:"number", editor:"input", align:"center", formatter:formatCell},
			{title:"Salaris", visible:false, field:"penal", sorter:"string", sortable:true, align:"center", formatter:formatCell},
			{title:"Saldo actual", field:"balance", sortable:true, sorter:"number",editor:"input",align:"center", formatter:formatCell},
			{title:"Patrimoni", visible:false, field:"property", sortable:true, sorter:"number", align:"center", formatter:formatCell},
			{title:"Pos J.", field:"pos", sortable:true, sorter:"number", align:"center",editor:"input"},
			{title:"Punts J.", field:"points", sortable:true, sorter:"number", align:"center",editor:"input"},
			{title:"Premi", visible:false, field:"prizepos", sorter:"number", formatter:formatCell, align:"center", sortable:true,  visible:false},
			{title:"Premi punts Fut", visible:false, field:"prizefut", sorter:"number", align:"center", formatter:formatCell, sortable:true,  visible:false},
			{title:"Premi pos Fut", field:"prizeposfut", sorter:"number", align:"center", formatter:formatCell, sortable:true,  visible:false},
			//{title:"11 ideal", field:"onzeideal", sorter:"number", align:"center", sortable:true, editor:"input"},
			//{title:"Premi 11 ideal", field:"onzeidealprize", sorter:"number", align:"center", formatter:formatCell, sortable:true,  visible:false},
			//{title:"Drets TV", field:"dretstv", sortable:true, sorter:"number", align:"center", formatter:formatCell,editor:"input",},	
			//{title:"Sponsors", field:"sponsor", sortable:true, sorter:"number", align:"center", formatter:formatCell,editor:"input",},
			{title:"Estadi",
							columns:[
								{title:"Reputació", field:"stadiumrep", sortable:true, formatter:"star", sorter:"number", align:"center",  visible:false},
								{title:"Seients", field:"audience", sortable:true, formatter:"number", sorter:"number", align:"center",  visible:false},
								{title:"Partit", field:"matchtype",visible:false,  editor:"select", editorParams:{values:["Eurolliga", "Champions", "Copa Republicana", "Final Copa", "Final Champions", ""]}},
								{title:"Entrada", field:"stadiuminc", sortable:true,visible:false, sorter:"number", align:"center", formatter:formatCell},	
								],	
			},															
			/*{title:"Premis",
							columns:[
								{title:"Concepte", field:"extracon",  editor:"select", editorParams:{values:["Ronda Champions", "Ronda Europa League", "Ronda Copa", "Jackpot", "Varis", "Manager del mes", ""]}},
								{title:"Valor", field:"extraval", sorter:"number", formatter:formatCell, align:"center", sortable:true, width:180,editor:"input"},	
			 ],
			},*/
			/*{title:"Capità",
							columns:[
								{title:"Capità", field:"captain", sortable:true, sorter:"string", editor:"input"},
								{title:"Punts", field:"cappoints", sorter:"number", sortable:true, align:"center", editor:"input"},
								{title:"Rating", field:"caprating",  editor:"select", editorParams:{values:["Sou Base", "Onze ideal", "Millor jugador", "Sense escollir", ""]}},
								{title:"Premi", field:"prizecap", sorter:"number", formatter:formatCell, sortable:true, align:"center", width:120},
							 ],
			},*/
			{title:"Premi Futmondo", field:"totalfut", sorter:"number", align:"center", formatter:formatCell, sortable:true, width: 150,  visible:false},
			{title:"Total a pagar", field:"payment", sorter:"number",visible:false, align:"center", formatter:formatCell, sortable:true, width: 150}
			],
				cellEdited:function(cell){
				
				var rowData = cell.getRow().getData();
				

				//var rowData = $("#week-points").tabulator("getData");

				var totalPay = 0;
				var property = 0;
				var futmondoPoints = 0;
				var penalty = 0;
				var prizeCaptain = 0;
				var prizePos = 0;
				var prizePosFut = 0;			
				var capPoints = 0;
				var extraPay = 0 ;
				var totalFut = 0 ;
				var teamvalue = 0;
				var saldo = 0;
				var captainRating = "";
				var captainPoints = 0;
				var position =  "";
				var extra = 0;
				var spons = 0;
				var guix   = 0;
				var tvrights = 0;
				var onzeid = 0;
				var point = 0;
				var repCoef = 0;
				var reput = 0;
				var stadiumIncome = 0;
				var match =  "";
				var stadiumreput =  0;
				var seatsaudience =  0;
				var onzeIdealPrize = 0;
				
				if(!!rowData.teamval){
					teamvalue = rowData.teamval*1;
				}
				if(!!rowData.balance){
					saldo = rowData.balance*1;
				}
				if(!!rowData.reputation){
					reput = rowData.reputation*1;
				}
				if(!!rowData.caprating){
					captainRating = rowData.caprating;
				}
				if(!!rowData.cappoints){
					captainPoints = rowData.cappoints*1;
				}
				if(!!rowData.pos){
					position = rowData.pos;
				}
				if(!!rowData.extraval){
					extra = rowData.extraval*1;
				}
				//if(!!rowData.sponsor){
					//spons = rowData.sponsor*1;
				//}
				if(!!rowData.guixeta){
					guix = rowData.guixeta*1;
				}
				if(!!rowData.dretstv){
					tvrights = rowData.dretstv*1;
				}
				if(!!rowData.onzeideal){
					onzeid = rowData.onzeideal*1;
				}
				if(!!rowData.points){
					point = rowData.points*1;
				}
				if(!!rowData.stadiuminc){
					stadiumIncome = rowData.stadiuminc*1;
				}
				if(!!rowData.matchtype){
					match = rowData.matchtype;
				}
				if(!!rowData.stadiumrep){
					stadiumreput = rowData.stadiumrep*1;
				}
				if(!!rowData.audience){
					seatsaudience = rowData.audience*1;
				}
				
				
				futmondoPoints = point*40000;
				//if(!!onzeid){
				//	onzeIdealPrize = onzeid*500000;
				//}
							
			
//				switch(reput){
//					default:
//						repCoef = 0.5;
//						break;
//					case 1:
//						repCoef = 0.5;
//						break;
//					case 2:
//						repCoef = 0.75;
//						break;
//					case 3:
//						repCoef = 1;
//						break;
//					case 4:
//						repCoef = 1.25;
//						break;
//					case 5:
//						repCoef = 1.5;
//						break;
//					case 6:
//						repCoef = 1.5;
//						break;					
//				}
				//alert(reput);

                //if(reput < 2){
                //	repCoef = 0.5;
                //}else if (reput >= 2 && reput < 3){				
                //	repCoef = 0.6;
                //}else if (reput >= 3 && reput < 4){				
                //	repCoef = 0.7;
                //}else if (reput >= 4 && reput < 5){				
                //	repCoef = 0.8;
                //}else if (reput >= 5 && reput < 6){				
                //	repCoef = 1;
                //}	
				
				//switch(reput){
				//	case 1:
				//		repCoef = 0.8;
				//		break;
				//	case 2:
				//		repCoef = 0.9;
				//		break;
				//	case 3:
				//		repCoef = 1;
				//		break;
				//	case 4:
				//		repCoef = 1.1;
				//		break;
				//	case 5:
				//		repCoef = 1.2;
				//		break;
				//}
				
				
				//2020-2021 - Cobrem salaris a tots els nivells
				//if(teamvalue >= 300000000 && teamvalue < 350000000){
				//	penalty = -0.01*teamvalue*repCoef;
				//}else if(teamvalue >= 350000000 && teamvalue < 400000000){
				//	penalty = -0.015*teamvalue*repCoef;
				//}else if(teamvalue >= 400000000){
				//	penalty = -0.02*teamvalue*repCoef;
				//}
				//penalty = -0.01*teamvalue*repCoef;
				//
				//switch(position){
				//	default:
				//		prizePos = 0;
				//		prizePosFut = 0;
				//		break;
				//	case "1":
				//		prizePos = 3200000;
				//		prizePosFut = 3200000;
				//		break;
				//	case "2":
				//		prizePos = 2400000;
				//		prizePosFut = 2400000;
				//		break;
				//	case "3":
				//		prizePos = 1200000;
				//		prizePosFut = 1200000;
				//		break;
				//	case "4":
				//		prizePos = 800000;
				//		prizePosFut = 800000;
				//		break;
				//	case "5":
				//		prizePos = 400000;
				//		prizePosFut = 400000;
				//		break;
				//}
				
				//if(!!rowData.captain){
				//	captainRating = "Sense escollir";
				//	captainPoints = 1;
				//}
				
				
				//switch(captainRating){
				//	case "Sou Base":
				//		prizeCaptain = 40000*captainPoints*2;
				//		break;
				//	case "Onze ideal":
				//		prizeCaptain = 40000*captainPoints*3;
				//		break;
				//	case "Millor jugador":
				//		prizeCaptain = 40000*captainPoints*4;
				//		break;
				//	case "Sense escollir":
				//		prizeCaptain = -200000*captainPoints;
				//		captainPoints = 0;
				//		break;				
				//}
				var eurocof = 1;
				var uefacof = 0.8;
				var copacof = 0.8;
				var championscof = 1.5;
				var copafinalcof = 1.4;
				var championsfinalcof = 2;

				var entradaBase = (seatsaudience*40)+stadiumreput*reput*600000;
				
				switch(match){
					case "Eurolliga":
						stadiumIncome = entradaBase*eurocof;
						break;
					case "Copa Republicana":
						stadiumIncome = entradaBase*copacof;
						break;
					case "UEFA":
						stadiumIncome = seatsaudience*stadiumreput*(uefacof+repCoef/2)*20;
						break;	
					case "Champions":
						stadiumIncome = entradaBase*championscof;
						break;
					case "Final UEFA":
						stadiumIncome = seatsaudience*stadiumreput*(uefacopafinalcof+repCoef/2)*20;
						break;
					case "Final Copa":
						stadiumIncome = entradaBase*copafinalcof;
						break;							
					case "Final Champions":
						stadiumIncome = entradaBase*championsfinalcof;
						break;
					case "":
						stadiumIncome = 0;
						break;							
				}
				
				//alert(repCoef);
										
				if(stadiumIncome < 200000 && match != ""){
					stadiumIncome = 200000;
				}
				//alert(stadiumIncome)
				extraPay = stadiumIncome + extra;			
				//totalFut = onzeIdealPrize+futmondoPoints+prizePosFut;
				totalPay = prizeCaptain + penalty + extraPay;
				property = saldo + teamvalue + totalPay;
				
				//cell.getRow().update({payment:totalPay, penal:penalty, cappoints:captainPoints,matchtype:match, stadiuminc:stadiumIncome,onzeideal:onzeid,prizecap:prizeCaptain,prizepos:prizePos,property:property,prizefut:futmondoPoints,onzeidealprize:onzeIdealPrize,prizeposfut:prizePosFut,extraval:extra,dretstv:tvrights,totalfut:totalFut});
				cell.getRow().update({payment:totalPay, penal:penalty, cappoints:captainPoints,matchtype:match, stadiuminc:stadiumIncome,prizecap:prizeCaptain,prizepos:prizePos,property:property,prizefut:futmondoPoints,prizeposfut:prizePosFut,extraval:extra,totalfut:totalFut});
			}
				
		});
		weekpointstable.setData("loadPayInfoAdmin.php?"+ new Date().getTime());
		
	}

	function paySalaries(){


		var rowData = weekpointstable.getData();
		
									
		var processData = "\n";
		var x;
		var validation = true;
		
		gameWeek = rowData[0].gameweek;
		
		if(rowData.length > 0 ){
			
			for(x in rowData){
				//alert(rowData[x].cappoints);
				//alert(rowData[x].cappoints == ""); 
				if(rowData[x].teamval == undefined || rowData[x].balance == 0 || undefined == rowData[x].pos || rowData[x].points == undefined  || rowData[x].teamval == "" || rowData[x].balance == 0 || "" == rowData[x].pos ){		
					alert("Falta introduir dades. Revisa tots els camps. Revisa " + rowData[x].player);
					validation = false;
					
					break;
				}else{
					processData += rowData[x].player + " : " + rowData[x].payment + ",\n"
				}
			
			}
			
			var data = "data=" + JSON.stringify(rowData);
			//alert(data);
			if(validation){
				if (confirm('Segur que vols realitzar els següents pagamanets per la jornada ' + gameWeek + ' : ' + processData + ' ?')) {
					
					$.ajax({
						type: "GET",
						url: "admin/insertGW.php",
						data: data,
						cache:false,
						success: function(data){
							if(data == "[{}]"){
								alert("salaries successfully inserted");
								weekpointstable.setData("loadPayInfoAdmin.php?"+ new Date().getTime());
								payhisttable.setData("loadHistoryAdmin.php?"+ new Date().getTime());
							}else{
								alert("there was an error with the transaction");
							}		
						}
					});
					
				}
			}
		}
	}
		

	function showCols() {

	$("#week-points").tabulator("showColumn","property");
	$("#week-points").tabulator("showColumn","prizepos");
	$("#week-points").tabulator("showColumn","prizefut");
	$("#week-points").tabulator("showColumn","prizeposfut");
	$("#week-points").tabulator("showColumn","onzeidealprize");
	$("#week-points").tabulator("showColumn","extraval");
	$("#week-points").tabulator("showColumn","penal");
	$("#week-points").tabulator("showColumn","prizecap");

	$("#week-points").tabulator("redraw");
	}

	function hideCols() {

		$("#week-points").tabulator("hideColumn","property");
		$("#week-points").tabulator("hideColumn","prizepos");
		$("#week-points").tabulator("hideColumn","prizefut");
		$("#week-points").tabulator("hideColumn","prizeposfut");
		$("#week-points").tabulator("hideColumn","onzeidealprize");
		$("#week-points").tabulator("hideColumn","extraval");
		$("#week-points").tabulator("hideColumn","penal");
		$("#week-points").tabulator("hideColumn","prizecap");
		
		$("#week-points").tabulator("redraw");
	}

	//function resetChampionship() {
	//
	//	if (confirm('Segur que vols reiniciar el campeonat?')) {
	//				
	//				$.ajax({
	//					type: "GET",
	//					url: "admin/resetChampionship.php",
	//					cache:false,
	//					success: function(data){
	//						alert("Campeonat reiniciat correctament");
	//						$("#pay-hist").tabulator("setData", "selectSalary.php");
	//					}
	//				});				
	//			}
	//
	//}


	//function loadPreTemp() {
	//
	//	var formatCell = function(cell, formatterParams){
	//		   var value = parseInt(cell.getValue());
	//		   return formatMoney(value);
	//		   
	//		}
	//		
	//	pretemptable = new Tabulator("#preTemp", {
	//		fitColumns:true,
	//		//movableCols:true,
	//		//movableRows:true,
	//		tooltips:true,
	//		columns:[
	//			{title:"Data", field:"insertDate", sortable:true, editor:"input"},
	//			{title:"Name", field:"player", sortable:true, sorter:"string"},
	//			{title:"Player_id", field:"playerId", sortable:true, sorter:"string",  visible:false},
	//			{title:"Valor d'equip", field:"teamval", sortable:true, sorter:"number", formatter:formatCell,editor:"input", formatterParams:{precision:0, thousand :'.', symbol:'', symbolAfter:true}},
	//			{title:"Saldo actual", field:"balance", sortable:true, sorter:"number", formatter:formatCell,editor:"input", formatterParams:{precision:0, thousand :'.', symbol:'', symbolAfter:true}},
	//			{title:"Patrimoni", field:"property", sortable:true, sorter:"number", formatter:formatCell, width: 100, formatterParams:{precision:0, thousand :'.', symbol:'', symbolAfter:true}}
	//		],
	//			cellEdited:function(cell){
	//				
	//				var property = 0;
	//				var teamvalue = 0;
	//				var saldo = 0;
	//				
	//				var rowData = cell.getRow().getData();
	//				
	//				if(!!rowData.teamval){
	//					teamvalue = rowData.teamval*1;
	//				}
	//				if(!!rowData.balance){
	//					saldo = rowData.balance*1;
	//				}
	//				
	//				property = teamvalue + saldo;
	//				
	//				cell.getRow().update({property:property});
	//			}
	//	});
	//
	//	pretemptable.setData("loadPayInfoAdmin.php");
	//
	//}

	//function saveResultsPreTemp() {
	//
	//	if (confirm('Segur que vols guardar les dades de Pretemporada?')) {
	//				
	//			var rowDataPreTemp = pretemptable.getData();
	//
	//				var processData = "\n";
	//				var x;
	//				var validation = true;
	//				
	//				if(rowDataPreTemp.length > 0 ){
	//					
	//					for(x in rowDataPreTemp){
	//						if(rowDataPreTemp[x].teamval == undefined || rowDataPreTemp[x].balance == 0){		
	//							alert("Falta introduir dades. Revisa tots els camps. Revisa " + rowDataPreTemp[x].player);
	//							validation = false;
	//							break;
	//						}else{
	//							processData += rowDataPreTemp[x].player + " : " + rowDataPreTemp[x].payment + ",\n"
	//						}
	//
	//					}
	//					
	//					var data = "data=" + JSON.stringify(rowDataPreTemp);
	//					//alert(data);
	//					
	//					if(validation){
	//							
	//							$.ajax({
	//								type: "GET",
	//								url: "admin/insertPreTempRecord.php",
	//								data: data,
	//								cache:false,
	//								success: function(data){
	//
	//									alert("dades Pre-temp successfully inserted");
	//								}
	//							});
	//
	//					}
	//				}		
	//	}
	//
	//}


	function deleteLastGW() {
		
		//alert(prevGameWeek);
		
		if (confirm('Segur que vols esborrar les dades de la jornada ' + prevGameWeek + '?')) {
			if (confirm('Estas completament segur Victor, ultima oportunitat que et dono?')) {
				$.ajax({
					type: "GET",
					url: "admin/deleteLastGW.php",
					data: {prevgameweek: prevGameWeek},
					cache:false,
					success: function(data){						
						//alert(data)
						if(data == "[{}]"){
							alert("Jornada " + prevGameWeek + " borrada");
							prevGameWeek = prevGameWeek - 1;
							weekpointstable.setData("loadPayInfoAdmin.php?"+ new Date().getTime());
							payhisttable.setData("loadHistoryAdmin.php?"+ new Date().getTime());
						}else{
							alert("there was an error with the transaction");
						}		
					}
				});

			}	
		}
		
	}


function loadPayHistTable(){

	var formatCell = function(cell, formatterParams){
				   var value = parseInt(cell.getValue());
				   return formatMoney(value);
	}
		
	
	payhisttable = new Tabulator("#pay-hist", {
		
		layout:'fitColumns',
		height:"50%",
		tooltips:true,
		columnMinWidth:130,
		groupBy:function(data){
			//data - the data object for the row being grouped
			
			return "Jornada: " + data.gameweek + " - Data pagament: " + data.paydate; //groups by data and age
		},
		groupStartOpen:function(value, count, data, group){
			//value - the value all members of this group share
			//count - the number of rows in this group
			//data - an array of all the row data objects in this group
			//group - the group component for the group
			//Comparem la jornada pasada 
			//alert(parseInt(value.substr(9, 2).trim()))
			//var currentGW = $("#week-points").tabulator("getRows",0).getData();
			
			if(parseInt(value.substr(9, 2).trim()) > prevGameWeek){
				prevGameWeek = parseInt(value.substr(9, 2).trim());
				//alert(value);
			}
			
			return (parseInt(value.substr(9, 2).trim()) == parseInt(prevGameWeek)); //all groups with more than three rows start open, any with three or less start closed
		},
		groupHeader:function(value, count, data, group){
			//value - the value all members of this group share
			//count - the number of rows in this group
			//data - an array of all the row data objects in this group
			//group - the group component for the group
		
			return value + "<span style='color:#d00; margin-left:10px;'></span>";
		},
		columns:[
			{title:"Manager", field:"name", sortable:true, sorter:"string", frozen:true, width: 160},
			{title:"Jornada", field:"gameweek", sortable:true, sorter:"number",  headerFilter:true, visible: false},
			{title:"Mes",visible:false, field:"month",  editor:"select", editorParams:{values:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}},
			{title:"Data", field:"paydate", sortable:true, sorter:"date", sorterParams:{format:"DD/MM/YY"}, visible:false},
			{title:"Player_id", field:"playerId", sortable:true, sorter:"string", visible: false},
			{title:"Prestigi", field:"reputation", sortable:true, formatter:"star", sorter:"number", align:"center",  visible: false},
			{title:"Valor d'equip",visible:true, field:"teamval", sortable:true, sorter:"number",width: 130, editor:"input", align:"center", formatter:formatCell},
			{title:"Salaris", field:"penal", sorter:"string", sortable:true, align:"center", formatter:formatCell},
			{title:"Saldo actual",visible:true, field:"balance", sortable:true, sorter:"number",width: 130 ,editor:"input",align:"center", formatter:formatCell},
			{title:"Patrimoni", field:"property", sortable:true, sorter:"number", align:"center", formatter:formatCell},
			{title:"Pos J.", field:"pos", sortable:true, sorter:"number", align:"center",editor:"input"},
			{title:"Punts J.", field:"points", sortable:true, sorter:"number", align:"center",editor:"input"},
			{title:"Premi", field:"prizepos", sorter:"number", formatter:formatCell, align:"center", sortable:true},
			{title:"Premi punts Fut", field:"prizefut", sorter:"number", align:"center", formatter:formatCell, sortable:true, visible: false},
			{title:"Premi pos Fut", field:"prizeposfut", sorter:"number", align:"center", formatter:formatCell, sortable:true, visible: false},
			{title:"11 ideal", field:"onzeideal", sorter:"number", align:"center", sortable:true, editor:"input", visible: false},
			{title:"Premi 11 ideal", field:"onzeidealprize", sorter:"number", align:"center", formatter:formatCell, sortable:true, visible: false},
			//{title:"Drets TV", field:"dretstv", sortable:true, sorter:"number", align:"center", formatter:formatCell, editor:"input"},	
			//{title:"Sponsors", field:"sponsor", sortable:true, sorter:"number", align:"center", formatter:formatCell, editor:"input"},	
			//{title:"Guixeta", field:"guixeta", sortable:true, sorter:"number", align:"center", formatter:formatCell, editor:"input"},	
			{title:"Estadi",
							columns:[
								{title:"Reputació", field:"stadiumrep", sortable:true, formatter:"star", sorter:"number", align:"center", visible: false},
								{title:"Seients", field:"audience", sortable:true, formatter:"number", sorter:"number", align:"center", visible: false},
								{title:"Partit", field:"matchtype", visible:false, editor:"select", editorParams:{values:["Eurolliga", "Champions", "Copa Republicana", "Final Copa", "Final Champions", ""]}},
								{title:"Entrada", field:"stadiuminc",visible:false, sortable:true, sorter:"number", align:"center", formatter:formatCell},	
								],	
			},															
			{title:"Premis",
							columns:[
								{title:"Concepte", field:"extracon",  editor:"select", editorParams:{values:["Ronda Champions", "Ronda Europa League", "Ronda Copa", "Jackpot", "Varis", "Manager del mes", ""]}},
								{title:"Valor", field:"extraval", sorter:"number", formatter:formatCell, align:"center", sortable:true, width:180,editor:"input"},	
			 ],
			},
			{title:"Capità",
							columns:[
								{title:"Capità", field:"captain", sortable:true, sorter:"string", editor:"input"},
								{title:"Punts", field:"cappoints", sorter:"number", sortable:true, align:"center", editor:"input"},
								{title:"Rating", field:"caprating",  editor:"select", editorParams:{values:["Sou Base", "Onze ideal", "Millor jugador", "Sense escollir", ""]}},
								{title:"Premi", field:"prizecap", sorter:"number", formatter:formatCell, sortable:true, align:"center", width:120},
							 ],
			},
			{title:"Premi Futmondo", field:"totalfut", sorter:"number", align:"center", formatter:formatCell, sortable:true, width: 150},
			{title:"Total a pagar", field:"payment", sorter:"number", align:"center", formatter:formatCell, sortable:true, width: 150},
			{formatter:saveIcon, width:40, align:"center", cellClick:function(e, cell){
			
				if(confirm("Segur que vols actualitzar les dades de " + cell.getRow().getCell("name").getValue() + " per la jornada " + cell.getRow().getCell("gameweek").getValue() + " ?")){
			
					var data = "data=[" + JSON.stringify(cell.getRow().getData()) + "]";
						
					//alert(data);
					$.ajax({
						type: "GET",
						url: "admin/updateGW.php",
						data: data,
						cache:false,
						success: function(data){
							
							if(data == "[{}]"){
								alert("dades actualitzades correctament");
								payhisttable.setData("loadHistoryAdmin.php?"+ new Date().getTime());
							}else{
								alert("there was an error with the transaction");
							}								
						}
					});
				}
			
			}}	
			],
				cellEdited:function(cell){
				
				var rowData = cell.getRow().getData();
				

				//var rowData = $("#week-points").tabulator("getData");

				var totalPay = 0;
				var property = 0;
				var futmondoPoints = 0;
				var penalty = 0;
				var prizeCaptain = 0;
				var prizePos = 0;
				var prizePosFut = 0;			
				var capPoints = 0;
				var extraPay = 0 ;
				var totalFut = 0 ;
				var teamvalue = 0;
				var saldo = 0;
				var captainRating = "";
				var captainPoints = 0;
				var position =  "";
				var extra = 0;
				var spons = 0;
				var guix   = 0;
				var tvrights = 0;
				var onzeid = 0;
				var point = 0;
				var repCoef = 0;
				var reput = 0;
				var stadiumIncome = 0;
				var match =  "";
				var stadiumreput =  0;
				var seatsaudience =  0;
				var onzeIdealPrize = 0;
				
				if(!!rowData.teamval){
					teamvalue = rowData.teamval*1;
				}
				if(!!rowData.balance){
					saldo = rowData.balance*1;
				}
				if(!!rowData.reputation){
					reput = rowData.reputation*1;
				}
				if(!!rowData.caprating){
					captainRating = rowData.caprating;
				}
				if(!!rowData.cappoints){
					captainPoints = rowData.cappoints*1;
				}
				if(!!rowData.pos){
					position = rowData.pos;
				}
				if(!!rowData.extraval){
					extra = rowData.extraval*1;
				}
				//if(!!rowData.sponsor){
					//spons = rowData.sponsor*1;
				//}
				if(!!rowData.guixeta){
					guix = rowData.guixeta*1;
				}
				if(!!rowData.dretstv){
					tvrights = rowData.dretstv*1;
				}
				if(!!rowData.onzeideal){
					onzeid = rowData.onzeideal*1;
				}
				if(!!rowData.points){
					point = rowData.points*1;
				}
				if(!!rowData.stadiuminc){
					stadiumIncome = rowData.stadiuminc*1;
				}
				if(!!rowData.matchtype){
					match = rowData.matchtype;
				}
				if(!!rowData.stadiumrep){
					stadiumreput = rowData.stadiumrep*1;
				}
				if(!!rowData.audience){
					seatsaudience = rowData.audience*1;
				}
				
				
				futmondoPoints = point*40000;
				if(!!onzeid){
					onzeIdealPrize = onzeid*500000;
				}
							
			
//				switch(reput){
//					default:
//						repCoef = 0.5;
//						break;
//					case 1:
//						repCoef = 0.5;
//						break;
//					case 2:
//						repCoef = 0.75;
//						break;
//					case 3:
//						repCoef = 1;
//						break;
//					case 4:
//						repCoef = 1.25;
//						break;
//					case 5:
//						repCoef = 1.5;
//						break;
//					case 6:
//						repCoef = 1.5;
//						break;					
//				}
				//alert(reput);

                //if(reput < 2){
                //	repCoef = 0.5;
                //}else if (reput >= 2 && reput < 3){				
                //	repCoef = 0.6;
                //}else if (reput >= 3 && reput < 4){				
                //	repCoef = 0.7;
                //}else if (reput >= 4 && reput < 5){				
                //	repCoef = 0.8;
                //}else if (reput >= 5 && reput < 6){				
                //	repCoef = 1;
                //}	
				
				switch(reput){
					case 1:
						repCoef = 0.8;
						break;
					case 2:
						repCoef = 0.9;
						break;
					case 3:
						repCoef = 1;
						break;
					case 4:
						repCoef = 1.1;
						break;
					case 5:
						repCoef = 1.2;
						break;
				}
				
				
				//2020-2021 - Cobrem salaris a tots els nivells
				//if(teamvalue >= 300000000 && teamvalue < 350000000){
				//	penalty = -0.01*teamvalue*repCoef;
				//}else if(teamvalue >= 350000000 && teamvalue < 400000000){
				//	penalty = -0.015*teamvalue*repCoef;
				//}else if(teamvalue >= 400000000){
				//	penalty = -0.02*teamvalue*repCoef;
				//}
				penalty = -0.01*teamvalue*repCoef;
		
				switch(position){
					default:
						prizePos = 0;
						prizePosFut = 0;
						break;
					case "1":
						prizePos = 3200000;
						prizePosFut = 3200000;
						break;
					case "2":
						prizePos = 2400000;
						prizePosFut = 2400000;
						break;
					case "3":
						prizePos = 1200000;
						prizePosFut = 1200000;
						break;
					case "4":
						prizePos = 800000;
						prizePosFut = 800000;
						break;
					case "5":
						prizePos = 400000;
						prizePosFut = 400000;
						break;
				}
				
				//if(!!rowData.captain){
				//	captainRating = "Sense escollir";
				//	captainPoints = 1;
				//}
				
				
				switch(captainRating){
					case "Sou Base":
						prizeCaptain = 40000*captainPoints*2;
						break;
					case "Onze ideal":
						prizeCaptain = 40000*captainPoints*3;
						break;
					case "Millor jugador":
						prizeCaptain = 40000*captainPoints*4;
						break;
					case "Sense escollir":
						prizeCaptain = -200000*captainPoints;
						captainPoints = 0;
						break;				
				}
				var eurocof = 1;
				//var uefacof = 0.1;
				var copacof = 0.8;
				var championscof = 1.5;
				var copafinalcof = 1.4;
				var championsfinalcof = 2;

				var entradaBase = (seatsaudience*40)+stadiumreput*reput*600000;
				
				switch(match){
					case "Eurolliga":
						stadiumIncome = entradaBase*eurocof;
						break;
					case "Copa Republicana":
						stadiumIncome = entradaBase*copacof;
						break;
					//case "UEFA":
					//	stadiumIncome = seatsaudience*stadiumreput*(uefacof+repCoef/2)*20;
					//	break;	
					case "Champions":
						stadiumIncome = entradaBase*championscof;
						break;
					//case "Final UEFA":
					//	stadiumIncome = seatsaudience*stadiumreput*(uefacopafinalcof+repCoef/2)*20;
					//	break;
					case "Final Copa":
						stadiumIncome = entradaBase*copafinalcof;
						break;							
					case "Final Champions":
						stadiumIncome = entradaBase*championsfinalcof;
						break;
					case "":
						stadiumIncome = 0;
						break;							
				}
				
				//alert(repCoef);
										
				if(stadiumIncome < 200000 && match != ""){
					stadiumIncome = 200000;
				}
				//alert(stadiumIncome)
				extraPay = stadiumIncome + extra;			
				totalFut = onzeIdealPrize+futmondoPoints+prizePosFut;
				totalPay = prizeCaptain + penalty + extraPay;
				property = saldo + teamvalue + totalPay;

				
				cell.getRow().update({payment:totalPay, penal:penalty,matchtype:match, stadiuminc:stadiumIncome, cappoints:captainPoints, prizecap:prizeCaptain,prizepos:prizePos,property:property,prizefut:futmondoPoints,onzeidealprize:onzeIdealPrize,prizeposfut:prizePosFut,totalfut:totalFut});
			}
				
		});

		payhisttable.setData("loadHistoryAdmin.php?"+ new Date().getTime());
		
	}		