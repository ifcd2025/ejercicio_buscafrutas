import { obtenerFrutasPorFamilia, obtenerFrutasPorValorNutricional } from "./peticiones.js";

function validar() {
    const familia = document.getElementById("familia").value.trim();
    const minimo = document.getElementById("valorNutricionalMinimo").value;
    const maximo = document.getElementById("valorNutricionalMaximo").value;
    const porFamilia = document.getElementById("porFamilia").checked;
    const porValorNutricional = document.getElementById("porValorNutricional").checked;
    const errores = [];
    if(porFamilia && familia.length == 0) {
        errores.push("Falta la familia");
    } else if(porValorNutricional && /^\d+$/.test(minimo) == false) {
        errores.push("Falta el mínimo");
    } else if(porValorNutricional && /^\d+$/.test(maximo) == false) {
        errores.push("Falta el máximo");
    } else if(porValorNutricional && minimo > maximo) {
        errores.push("El mínimo debe ser igual o menor que el máximo");
    } else if(porFamilia == false && porValorNutricional == false) {
        errores.push("Debes marcar una de las opciones");
    }
    return errores;
}

function buscarFrutas() {
    const familia = document.getElementById("familia").value.trim();
    const valorNutricional = document.getElementById("categoria").value;
    const minimo = document.getElementById("valorNutricionalMinimo").value;
    const maximo = document.getElementById("valorNutricionalMaximo").value;
    const porFamilia = document.getElementById("porFamilia").checked;

    const errores = validar();
    if(errores.length > 0) {
        mostrarErrores(errores);
        return;
    }

    if(porFamilia) {
        obtenerFrutasPorFamilia(familia, mostrarFrutas, mostrarErrores);
    } else {
        obtenerFrutasPorValorNutricional(valorNutricional, minimo, maximo, mostrarFrutas,
                mostrarErrores);
    }
}


function mostrarFrutas(datos) {
    const resultados = document.getElementById("resultados");
    resultados.textContent = "";
    const clon = document.getElementById("clon");
    for(const fruta of datos) {
        const nuevoClon = clon.cloneNode(true);
        nuevoClon.querySelector("h2").textContent = fruta.name;
        nuevoClon.querySelector("h3").textContent = fruta.family;
        nuevoClon.querySelector(".calorias").textContent =  fruta.nutritions.calories;
        nuevoClon.querySelector(".grasa").textContent = fruta.nutritions.fat;
        nuevoClon.querySelector(".azucares").textContent = fruta.nutritions.sugar;
        nuevoClon.querySelector(".carbohidratos").textContent = fruta.nutritions.carbohydrates;
        nuevoClon.querySelector(".proteinas").textContent = fruta.nutritions.protein;
        nuevoClon.id = "";
        nuevoClon.classList.remove("d-none");
        resultados.appendChild(nuevoClon);
    }
}

Rosaceae


function mostrarErrores(errores) {
    console.log(errores);
}

document.getElementById("buscar").addEventListener("click", buscarFrutas);

