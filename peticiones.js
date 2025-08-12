/* Usamos una página PHP (backend) propia ya que esta API no devuelve
cabeceras que admitan CORS, con lo que el navegador bloquea la respuesta.
Nuestra página PHP si las devuelve */
const EndPoints = Object.freeze( 
    {
        familia: "https://www.gliese777.com/web/apiFrutas.php?familia=FAMILIA",
        valorNutricional: "https://www.gliese777.com/web/"
            +"apiFrutas.php?valorNutricional=VALORNUTRICIONAL"
            +"&minimo=MINIMO&maximo=MAXIMO"
    });

function obtenerDatos(url, funcionMostrarDatos, funcionMostrarErrores) {
    fetch(url)
    .then(respuesta => {
        if(respuesta.ok) {
            return respuesta.json();
        } else {
            throw new Error("No se han podido obtener los datos: " + 
                respuesta.status + "(" + url +")");
        }
    })
    .then(datos => {
        /* Mi API intermediaria devuelve un array con las frutas
        o un objeto con un atributo error si faltan datos u otro problema */
        if(datos.error == undefined) {
            funcionMostrarDatos(datos);
        } else {
            funcionMostrarErrores(datos);
        }
    })
    .catch(error => funcionMostrarErrores(error));
}

export function obtenerFrutasPorFamilia(familia, funcionMostrarDatos, funcionMostrarErrores) {
    obtenerDatos(EndPoints.familia.replace("FAMILIA", familia), funcionMostrarDatos, funcionMostrarErrores);
}

export function obtenerFrutasPorValorNutricional(
    valorNutricional, minimo, maximo, funcionMostrarDatos, funcionMostrarErrores) {
    obtenerDatos(
        EndPoints.valorNutricional
            .replace("VALORNUTRICIONAL", valorNutricional)
            .replace("MINIMO", minimo)
            .replace("MAXIMO", maximo)
    , funcionMostrarDatos, funcionMostrarErrores);
}