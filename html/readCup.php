<?php
include 'properties.php';

$compet = $_GET["comp"];
$seas = $_GET["season"];

//echo $compet;
//echo $seas;

$file = 'json/';

if ($compet == "cup") {
	$file = $file . "cuptest" . $seas . ".txt";
	$str = file_get_contents($file);
} else if ($compet == "champions"){
   	$file = $file . "champions" . $seas . ".json";
	$str = file_get_contents($file);
} else if ($compet == "uefa"){
   $file = $file . "uefa" . $seas . ".json";
   $str = file_get_contents($file);
}

$file = $file . "cuptest.json";
$str = "";

$str = $str . file_get_contents($file);

//$str = '{' . $str . '}';

//$str = '{"p1knock1":"Florenfitto","p1knock1res1":"","p1knock1res2":"","p2knock1":"Abrahamxarlich","p2knock1res1":"","p2knock1res2":"","p3knock1":"Ferrninone","p3knock1res1":"","p3knock1res2":""}' ;
//. $str; 

echo $str . "";

?>