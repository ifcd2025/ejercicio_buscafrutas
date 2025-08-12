<?php
/*header('Content-Type: application/json');

//Podemos file_get_contents() siempre que el servidor tenga allow_url_fopen activado en php.ini.
$familia = isset($_GET['FAMILIA']) ? urlencode($_GET['FAMILIA']) : null;
$minimo  = isset($_GET['MINIMO']) ? urlencode($_GET['MINIMO']) : null;
$maximo  = isset($_GET['MAXIMO']) ? urlencode($_GET['MAXIMO']) : null;
$valorNutricional  = isset($_GET['valorNutricional']) ? urlencode($_GET['valorNutricional']) : null;
if ($familia) {
    // Endpoint de familia
    $url = "https://www.fruityvice.com/api/fruit/family/$familia";
    echo file_get_contents($url);
} elseif ($minimo && $maximo) {
    // Endpoint de valores nutricionales
    $url = "https://www.fruityvice.com/api/fruit/$valorNutricional?min=$minimo&max=$maximo";
    echo file_get_contents($url);
} else {
    echo json_encode(['error' => 'Parámetros incorrectos.']);
}*/
/* Que no haya espacios ni otro código, excepto comentarios, antes */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); /* Para permitir CORS en el navegador */
header('Access-Control-Allow-Methods: GET, OPTIONS'); /* OPTIONS es necsario */
header('Access-Control-Allow-Headers: Content-Type');

function obtenerDatos($url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $resultado = curl_exec($ch);
    curl_close($ch);
    return $resultado;
}

$familia = isset($_GET['familia']) ? urlencode($_GET['familia']) : null;
$minimo  = isset($_GET['minimo']) ? urlencode($_GET['minimo']) : null;
$maximo  = isset($_GET['maximo']) ? urlencode($_GET['maximo']) : null;
$valorNutricional  = isset($_GET['valorNutricional']) ? urlencode($_GET['valorNutricional']) : null;

if ($familia) {
    $url = "https://www.fruityvice.com/api/fruit/family/$familia";
    echo obtenerDatos($url);
} elseif ($minimo && $maximo && $valorNutricional) {
    $url = "https://www.fruityvice.com/api/fruit/$valorNutricional?min=$minimo&max=$maximo";
    echo obtenerDatos($url);
} else {
    echo json_encode(['error' => 'Parámetros incorrectos.']);
}
?>
