var currentSeason = 0;
var statsTab = false;
var adminTab = false;
var championsTab = false;
var copaTab = false;
var managerTab = false;
var stadiumTab = false;
var sponsorTab = false;
var tvrightsTab = false;
var clauseTab = false;
var currentTab = "";

var months = ["January", "February", "March","April", "May", "June","July", "August", "September","October", "November", "December"];

var d = new Date();

var saveIcon = function(cell, formatterParams){ //plain text value
    return "<img src='images/save.JPG' alt='Guardar' height='22' width='22'>";
};
var printIcon = function(cell, formatterParams){ //plain text value
    return "<img src='images/save.JPG' alt='Guardar' height='22' width='22'>";
};


function openTab(evt, tabName, season) {
    // Declare all variables
    var i, tabcontent, tablinks;

    //alert(tabName);
	currentTab = tabName;
	currentSeason = season;
	document.body.style.backgroundImage = "url('images/backgrounds/statsbackground.jpg')";
	//document.body.style.backgroundSize = "100% 100%";
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

	//$('topnav').slideToggle(300);
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
	
	if("statistics" == tabName){
    	
        document.body.style.backgroundImage = "url('images/backgrounds/statsbackground.jpg')"
		changeManagerTable();
		changeGWStats();
		loadGraph();
	}else if("admin" == tabName){
		document.body.style.backgroundImage = "url('images/backgrounds/adminbackground.jpg')";
		adminTab = true;
		loadWeekPoint();
		loadPayHistTable();
		//loadPreTemp();
		//comboButton();
	}else if("champions" == tabName){
		document.body.style.backgroundImage = "url('images/backgrounds/champions.jpg')";
		//if(championsTab == false){
			//alert("asd")
		//	championsTab = true;
			championsLeague();
		//}
	}else if("copa" == tabName){
		document.body.style.backgroundImage = "url('images/backgrounds/copa.jpg')";
		//if(copaTab == false){
		//	copaTab = true;
			loadCopa();
		//}
		
	}else if("manager" == tabName && managerTab == false){
	    document.body.style.backgroundImage = "url('images/backgrounds/adminbackground.jpg')";
		managerTab = true;
		loadManagerTable();
	}else if("stadium" == tabName && stadiumTab == false){
	    document.body.style.backgroundImage = "url('images/backgrounds/adminbackground.jpg')";
		stadiumTab = true;
		loadStadiumTable();
	}else if("sponsor" == tabName){
	    document.body.style.backgroundImage = "url('images/backgrounds/sponsors background.jpg')";
		sponsorTab = true;
		tvrightsTab = false;
		loadSponsorsTable();
	}else if("tvrights" == tabName){
	    document.body.style.backgroundImage = "url('images/backgrounds/tvbackground.jpg')";
		tvrightsTab = true;
		sponsorTab = false;
		loadTvRightsTable();
	}else if("calendar" == tabName){
	    //document.body.style.backgroundImage = "url('images/backgrounds/tvbackground.jpg')";
		//tvrightsTab = true;
		//sponsorTab = false;
		loadCalendar();
	
	}else if("clause" == tabName){
		document.body.style.backgroundImage = "url('images/backgrounds/clausebackground.jpg')";
		clauseTab = true;
		loadClauseInfo();
		createPlayerComboBox();
	}else if("rules" == tabName || "calendar" == tabName ){
		document.body.style.backgroundImage = "url('images/backgrounds/adminbackground.jpg')";
	}
	
	
	document.getElementById('menuicon').click();
	
}

//function myFunction() {
//    document.getElementById("myDropdown").classList.toggle("show");
//}

function showClubManagement() {
    document.getElementById("clubManagement").classList.toggle("show");
}


function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


function formatMoney(value) {
   if(value > 0){
      return "<span style='color:#99ff99;'>" + value.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1.') + " €" + "</span>";
   }else if(value < 0){
         return "<span style='color:ff4d4d;'>" + value.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1.') + " €" + "</span>";
   }else if(isNaN(value)){
       return "<span style='color:white;'>" + "0€" + "</span>";
   }else{
       return "<span style='color:white;'>" + value.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1.') + " €" + "</span>";
   }
}

var removeIcon = function(cell, formatterParams){ //plain text value
    return "<img src='images/remove.JPG' alt='Borrar' height='22' width='22'>";
};

// Close the dropdown menu if the user clicks outside of it
//window.onclick = function(event) {
//  if (!event.target.matches('.dropbtn')) {
//
//    var dropdowns = document.getElementsByClassName("dropdown-content");
//    var i;
//    for (i = 0; i < dropdowns.length; i++) {
//      var openDropdown = dropdowns[i];
//      if (openDropdown.classList.contains('show')) {
//        openDropdown.classList.remove('show');
//      }
//    }
//  }
//}


function dropMenu() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user=getCookie("username");
  if (user != "") {
    //alert("Welcome again " + user);
	
  } else {
     //user = prompt("Please enter your name:","");
     if (user != "" && user != null) {
       setCookie("username", user, 30);
     }
  }
}

function cookieOn() {
  document.getElementById("cookieelement").style.display = "block";
}

function cookieOff() {
  document.getElementById("cookieelement").style.display = "none";
}
