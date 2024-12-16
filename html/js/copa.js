var currentOperator;
var competition;

function loadCopa(){

    //alert(currentSeason);
	//$(document).ready(function() {
	   resetCopaData();
	   getData();
	//});
}


function alternativeSaveData() {
    
    competition = "cup";
    
       var knockoutdata = '{"p1knock1":"' + $("#p1knock1").val()  + '","p1knock1res1":"' + $("#p1knock1res1").val() + '","p1knock1res2":"' + $("#p1knock1res2").val() + '",' +
			'"p2knock1":"' + $("#p2knock1").val()  + '","p2knock1res1":"' + $("#p2knock1res1").val() + '","p2knock1res2":"' + $("#p2knock1res2").val() + '",' +	
		    '"p3knock1":"' + $("#p3knock1").val()  + '","p3knock1res1":"' + $("#p3knock1res1").val() + '","p3knock1res2":"' + $("#p3knock1res2").val() + '",' +
		    '"p4knock1":"' + $("#p4knock1").val()  + '","p4knock1res1":"' + $("#p4knock1res1").val() + '","p4knock1res2":"' + $("#p4knock1res2").val() + '",' +
		    '"p5knock1":"' + $("#p5knock1").val()  + '","p5knock1res1":"' + $("#p5knock1res1").val() + '","p5knock1res2":"' + $("#p5knock1res2").val() + '",' +
		    '"p6knock1":"' + $("#p6knock1").val()  + '","p6knock1res1":"' + $("#p6knock1res1").val() + '","p6knock1res2":"' + $("#p6knock1res2").val() + '",' +
		    '"p7knock1":"' + $("#p7knock1").val()  + '","p7knock1res1":"' + $("#p7knock1res1").val() + '","p7knock1res2":"' + $("#p7knock1res2").val() + '",' +
		    '"p8knock1":"' + $("#p8knock1").val()  + '","p8knock1res1":"' + $("#p8knock1res1").val() + '","p8knock1res2":"' + $("#p8knock1res2").val() + '",' +
			'"p1knock2":"' + $("#p1knock2").val()  + '","p1knock2res1":"' + $("#p1knock2res1").val() + '","p1knock2res2":"' + $("#p1knock2res2").val() + '",' +
			'"p2knock2":"' + $("#p2knock2").val()  + '","p2knock2res1":"' + $("#p2knock2res1").val() + '","p2knock2res2":"' + $("#p2knock2res2").val() + '",' +	
		    '"p3knock2":"' + $("#p3knock2").val()  + '","p3knock2res1":"' + $("#p3knock2res1").val() + '","p3knock2res2":"' + $("#p3knock2res2").val() + '",' +
		    '"p4knock2":"' + $("#p4knock2").val()  + '","p4knock2res1":"' + $("#p4knock2res1").val() + '","p4knock2res2":"' + $("#p4knock2res2").val() + '",' +
		    '"p1knock3":"' + $("#p1knock3").val()  + '","p1knock3res1":"' + $("#p1knock3res1").val() + '",' +
			'"p2knock3":"' + $("#p2knock3").val()  + '","p2knock3res1":"' + $("#p2knock3res1").val() + '",' +
			'"winner":"' + $("#winner").val()  + '"}';
		   
        //alert(currentSeason);
        
	if(confirm("Segur que vols actualitzar el cuadre for season " + currentSeason + "?")){
		$.ajax({
			type: "get",
			url: "admin/saveKnockOut.php",
			data: {data: knockoutdata, comp: competition, season: currentSeason},
			cache:false,
			//dataType:'json',
			success: function(data2){
			        resetCopaData();
			        getData();
    			    alert("dades actualitzades");
                    	
            	}
            });

	    }		
        
       // var obj = JSON.parse(text);
       // alert(obj)
    }
        

    function getData() {
    
    	competition = "cup";
    	
    	
    	
    	$.ajax({
    		type: "get",
    		url: "loadKnockOut.php",
        	dataType:'json',
    		data: {comp: competition, season: currentSeason},
    		//cache:false,
    		success: function(data2){

                document.getElementById("p1knock1").value = data2.p1knock1;
                document.getElementById("p1knock1res1").value = data2.p1knock1res1;
                document.getElementById("p1knock1res2").value = data2.p1knock1res2;
                document.getElementById("p2knock1").value = data2.p2knock1;
                document.getElementById("p2knock1res1").value = data2.p2knock1res1;
                document.getElementById("p2knock1res2").value = data2.p2knock1res2;
                document.getElementById("p3knock1").value = data2.p3knock1;
                document.getElementById("p3knock1res1").value = data2.p3knock1res1;
                document.getElementById("p3knock1res2").value = data2.p3knock1res2;
                document.getElementById("p4knock1").value = data2.p4knock1;
                document.getElementById("p4knock1res1").value = data2.p4knock1res1;
                document.getElementById("p4knock1res2").value = data2.p4knock1res2;
                document.getElementById("p5knock1").value = data2.p5knock1;
                document.getElementById("p5knock1res1").value = data2.p5knock1res1;
                document.getElementById("p5knock1res2").value = data2.p5knock1res2;
                document.getElementById("p6knock1").value = data2.p6knock1;
                document.getElementById("p6knock1res1").value = data2.p6knock1res1;
                document.getElementById("p6knock1res2").value = data2.p6knock1res2;
                document.getElementById("p7knock1").value = data2.p7knock1;
                document.getElementById("p7knock1res1").value = data2.p7knock1res1;
                document.getElementById("p7knock1res2").value = data2.p7knock1res2;
                document.getElementById("p8knock1").value = data2.p8knock1;
                document.getElementById("p8knock1res1").value = data2.p8knock1res1;
                document.getElementById("p8knock1res2").value = data2.p8knock1res2;
                
                document.getElementById("p1knock2").value = data2.p1knock2;
                document.getElementById("p1knock2res1").value = data2.p1knock2res1;
                document.getElementById("p1knock2res2").value = data2.p1knock2res2;
                document.getElementById("p2knock2").value = data2.p2knock2;
                document.getElementById("p2knock2res1").value = data2.p2knock2res1;
                document.getElementById("p2knock2res2").value = data2.p2knock2res2;
                document.getElementById("p3knock2").value = data2.p3knock2;
                document.getElementById("p3knock2res1").value = data2.p3knock2res1;
                document.getElementById("p3knock2res2").value = data2.p3knock2res2;
                document.getElementById("p4knock2").value = data2.p4knock2;
                document.getElementById("p4knock2res1").value = data2.p4knock2res1;
                document.getElementById("p4knock2res2").value = data2.p4knock2res2;
                
                document.getElementById("p1knock3").value = data2.p1knock3;
                document.getElementById("p1knock3res1").value = data2.p1knock3res1;
                document.getElementById("p2knock3").value = data2.p2knock3;
                document.getElementById("p2knock3res1").value = data2.p2knock3res1;

                document.getElementById("winner").value = data2.winner;
                
                //alert(data2.p1knock2res1);
                

    		}
    	});
    }

    function resetCopaData(){
     
            document.getElementById("p1knock1").value = "";
            document.getElementById("p1knock1res1").value = "";
            document.getElementById("p1knock1res2").value = "";
            document.getElementById("p2knock1").value = "";
            document.getElementById("p2knock1res1").value = "";
            document.getElementById("p2knock1res2").value = "";
            document.getElementById("p3knock1").value = "";
            document.getElementById("p3knock1res1").value = "";
            document.getElementById("p3knock1res2").value = "";
            document.getElementById("p4knock1").value = "";
            document.getElementById("p4knock1res1").value = "";
            document.getElementById("p4knock1res2").value = "";
            document.getElementById("p5knock1").value = "";
            document.getElementById("p5knock1res1").value = "";
            document.getElementById("p5knock1res2").value = "";
            document.getElementById("p6knock1").value = "";
            document.getElementById("p6knock1res1").value = "";
            document.getElementById("p6knock1res2").value = "";
            document.getElementById("p7knock1").value = "";
            document.getElementById("p7knock1res1").value = "";
            document.getElementById("p7knock1res2").value = "";
            document.getElementById("p8knock1").value = "";
            document.getElementById("p8knock1res1").value = "";
            document.getElementById("p8knock1res2").value = "";
                                                    ""
            document.getElementById("p1knock2").value = "";
            document.getElementById("p1knock2res1").value = "";
            document.getElementById("p1knock2res2").value = "";
            document.getElementById("p2knock2").value = "";
            document.getElementById("p2knock2res1").value = "";
            document.getElementById("p2knock2res2").value = "";
            document.getElementById("p3knock2").value = "";
            document.getElementById("p3knock2res1").value = "";
            document.getElementById("p3knock2res2").value = "";
            document.getElementById("p4knock2").value = "";
            document.getElementById("p4knock2res1").value = "";
            document.getElementById("p4knock2res2").value = "";
                                                    ""
            document.getElementById("p1knock3").value = "";
            document.getElementById("p1knock3res1").value = "";
            document.getElementById("p2knock3").value = "";
            document.getElementById("p2knock3res1").value = "";
            
            document.getElementById("winner").value = "";
        
    }
