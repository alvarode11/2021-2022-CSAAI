var acum = 0;
var operador ='';
var cambio=false;
window.onload = function () {

var on = document.getElementById("borrar");
on.onclick = borrarC;

var on = document.getElementById("on");
on.onclick = encender;

var off = document.getElementById("apagar");
off.onclick = apagar;

var igual = document.getElementById("igual");
igual.onclick = resultado;


var cosas = document.getElementsByName("numero");
for (var i = 0; i < cosas.length; i++) {
    cosas[i].onclick = displayer;
}

var operador = document.getElementsByName("op");
for (var j = 0; j < operador.length; j++) {
    operador[j].onclick = operacion;
}

}

function resultado(){


switch (operador) {
    case '+':				
        acum = acum + parseFloat(document.getElementById("resul").value);
        break;
    case '-':
        acum = acum - parseFloat(document.getElementById("resul").value);
        break;
case '*':
        acum = acum * parseFloat(document.getElementById("resul").value);
        break;
case '/':
        acum = acum / parseFloat(document.getElementById("resul").value);
        break;
}

document.getElementById("resul").value = acum;
acum=0;

}

function operacion() {


if (acum==0 ){
    acum=parseFloat(document.getElementById("resul").value);
    operador=this.value;
    
}else{
    switch (operador) {
    case '+':				
        acum = acum + parseFloat(document.getElementById("resul").value);
        document.getElementById("resul").value=acum;
        operador = this.value;
        
        break;
    case '-':
        acum = acum - parseFloat(document.getElementById("resul").value);
        document.getElementById("resul").value=acum;
        operador = this.value;
        
        break;
    case '*':
        acum = acum * parseFloat(document.getElementById("resul").value);
        document.getElementById("resul").value=acum;
        operador = this.value;
        
        break;
    case '/':
        acum = acum / parseFloat(document.getElementById("resul").value);
        document.getElementById("resul").value=acum;
        operador = this.value;
        
        break; 
            
}
}
cambio=true;
}


function borrar() {
document.getElementById("resul").value = " ";
}

function borrarC() {
document.getElementById("resul").value = "";
acum=0;
}

function displayer() {
if (cambio==true){
borrar();
cambio=false;}
document.getElementById("resul").value += this.value;
}


function encender() {

var cosas = document.getElementsByTagName("input");
for (var i = 0; i < cosas.length; i++) {
    cosas[i].disabled = false;
}
document.getElementById("on").disabled = true;

}

function apagar() {

var cosas = document.getElementsByTagName("input");
for (var i = 0; i < cosas.length; i++) {
    cosas[i].disabled = true;
}
document.getElementById("on").disabled = false;
borrarC();
acum=0;
}







