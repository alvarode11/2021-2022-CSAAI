console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
var img = document.getElementById('isaac');
const ctx = canvas.getContext('2d');
const r = document.getElementById('r');
const g = document.getElementById('g');
const b = document.getElementById('b');
const r_value = document.getElementById('rvalue');
const g_value = document.getElementById('gvalue');
const b_value = document.getElementById('bvalue');
const gris = document.getElementById('gris');
const color = document.getElementById('color');
const negativ = document.getElementById('negativo');
const vint = document.getElementById('vintage');

const botonimagen1 = document.getElementById('botonimagen1');
const botonimagen2 = document.getElementById('botonimagen2');

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

    r.style.display = "none";
    g.style.display = "none";
    b.style.display = "none";
  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0,0);
  console.log("Imagen cargada");

};

botonimagen1.onclick = () => {
    img = document.getElementById('isaac');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0,0);
}

botonimagen2.onclick = () => {
    img = document.getElementById('isaac2');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0,0);
}

r.oninput = () => {
    rgb(r);
}

g.oninput = () => {
    rgb(g);
}

b.oninput = () => {
    rgb(b);
}

gris.onclick = () => {
    grises();
    r.style.display = "none";
    g.style.display = "none";
    b.style.display = "none";
    
}

color.onclick = () => {
    colores();
    r.style.display = "inline-block";
    g.style.display = "inline-block";
    b.style.display = "inline-block";

}

negativ.onclick = () => {
    negativo();
    r.style.display = "none";
    g.style.display = "none";
    b.style.display = "none";
}

vint.onclick = () => {
    vintage();
    r.style.display = "none";
    g.style.display = "none";
    b.style.display = "none";
}

function rgb () {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0,0);

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    
    let data = imgData.data;


    r_value.innerHTML = r.value;
    g_value.innerHTML = g.value;
    b_value.innerHTML = b.value;

    valorrojo = r.value
    valorverde = g.value
    valorazul = b.value

    for (let i = 0; i < data.length; i+=4) {
        if(data[i] > valorrojo) 
            data[i] = valorrojo;
        if(data[i + 1] > valorverde)
            data[i + 1] = valorverde;
        if(data[i + 2] > valorazul)
            data[i + 2] = valorazul;
    }


    ctx.putImageData(imgData, 0, 0);
}


function grises () {

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0,0);

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    
    let data = imgData.data;

    for (let i=0; i< data.length; i+=4) {
        blancoynegro = (3 * data[i] + 4 * (data[i + 1]) + (data[i + 2]))/8;
        data[i] = blancoynegro;
        data[i + 1] = blancoynegro;
        data[i + 2] = blancoynegro;
    }

    ctx.putImageData(imgData, 0, 0);
}

function colores () {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0,0);

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    //let data = imgData.data;

    ctx.putImageData(imgData, 0, 0);
}

function negativo () {

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0,0);

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data;

    for (let i=0; i< data.length; i+=4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }

    ctx.putImageData(imgData, 0, 0);

}

function vintage () {

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0,0);

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data;

    for (let i=0; i< data.length; i+=4) {
        data[i] = (data[i]*.393) + (data[i + 1]*.769) + (data[i + 2]*.189);
        data[i + 1] = (data[i]*.349) + (data[i + 1]*.686)+ (data[i + 2]*.168);
        data[i + 2] = (data[i]*.272) + (data[i + 1]*.543)+ (data[i + 2]*.131);
    }

    ctx.putImageData(imgData, 0, 0);

}

console.log("Fin...");