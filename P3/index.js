//Definiendo todas las variables y constantes que voy a utilizar para la practica

const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var grd = ctx.createLinearGradient(10,75,900,75);
grd.addColorStop(0, "red");
grd.addColorStop(0.24, "orange");
grd.addColorStop(0.42, "yellow");
grd.addColorStop(0.56, "green");
grd.addColorStop(0.70, "blue");
grd.addColorStop(0.84, "indigo");
grd.addColorStop(1, "violet");
var startGame = false;
let score = 0;
const brickRowCount = 9;
const brickColumnCount = 5;
let vidas = 3
let microsegundos = 0;
let segundos = 0;
let minutos = 0;
const music = new Audio('laser.mp3');
const MuSiCa = new Audio('victoria.mp3');
const musica = new Audio('pum.mp3');
const MUSICA = new Audio('gameover.mp3');
const MUSIC = new Audio('error.mp3');


//Creando la pelotita

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2 +267,
    size: 12.5,
    speed: 4,
    dx: 3.5,
    dy: -4
};

//Creando la raqueta

const paddle = {
    x: canvas.width / 2 -40,
    y:canvas.height - 20,
    w: 80,
    h: 16,
    speed: 8,
    dx: 0
};

//Definiendo caracteristicas de cada ladrillito

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};

//Creando ladrillitos

var bricks = [];
for (let i = 0; i < brickRowCount; i++){
    bricks[i] = [];
    for(let j= 0; j< brickColumnCount; j++){
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo }; 
    }
}



//Dibujando la pelotita dentro del canvas

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#33FF99';
    ctx.fill();
    ctx.closePath();
}

//Dibujando la raqueta dentro del canvas

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.closePath();
}

//Dibujando la puntuacion dentro del canvas

function drawScore(){
    ctx.font = '20px Arial';
    ctx.fillStyle = '#33FF99'
    ctx.fillText(`Score: ${score}` , canvas.width - 100, 30);
}

//Dibujando las vidas dentro del canvas

function drawVidas() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#33FF99'
    ctx.fillText(`Vidas: ${vidas}`, canvas.width - 750, 30);
}

//Dibujando los ladrillitos dentro del canvas

function drawBricks(){
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? grd: 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}



//Funcion que calculara el tiempo 

function time(){
    if (startGame){ 
    microsegundos ++;
    if(microsegundos === 100){
        microsegundos = 0;
        segundos ++;
        if(segundos < 10){
            segundos = '0' + segundos;
        }
    }
    if(segundos == 60){
        minutos ++;
        segundos = 0;
        if(minutos < 10){
            minutos = "0" + minutos;
        }
        if(segundos == 0){
            segundos = "0" + segundos;
        }
    }

}
}

//Dibujando el cronometro dentro del canvas

function cronometro(){
    ctx.font = "20px Arial";
    ctx.fillStyle = '#33FF99'
    ctx.fillText('Tiempo: ', 355, 30);
    ctx.fillText(minutos + ':' + segundos, 435, 30);
}

//Movimiento de la raqueta

function movePaddle() {
    paddle.x += paddle.dx;

    //Deteccion de las paredes laterales del canvas

    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
    }

    if(paddle.x < 0){
        paddle.x = 0;
    }
}

//Moveimiento de la pelotita dentro del canvas

function moveBall() {
    if (startGame){
        ball.x += ball.dx;
        ball.y += ball.dy;
        } 

    //Colision con las paredes laterales del canvas

    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
        ball.dx *= -1; 
    }

    //Colision con la pared superior e inferior del canvas

    if(ball.y + ball.size > canvas.height || ball.y - ball.size <0){
        ball.dy *= -1; 
    }
    
    //Colision con la raqueta

    if(
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ){
        ball.dy = -ball.speed;
        MUSIC.play();
    }

    //Colision con cada ladrillo

    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible){
                if(
                    ball.x - ball.size > brick.x && 
                    ball.x + ball.size < brick.x  + brick.w && 
                    ball.y + ball.size > brick.y && 
                    ball.y - ball.size < brick.y  + brick.h 
                ){
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                    if (score ==  brickRowCount *brickColumnCount ){

                        
                        alert('HAS GANADO BIEEEEEEN')
                                    document.location.reload();
                                    MuSiCa.play();

                    }
                    musica.play();
                }
            }
        });
    });

    //Si la pelotita toca la pared inferir del canvas pierdes una vida

    if(ball.y + ball.size > canvas.height) {
        vidas = vidas - 1;
        music.play();

        ball.x = canvas.width / 2,
        ball.y = canvas.height / 2 +267,
        ball.size = 12.5,
        ball.speed = 4,
        ball.dx = 3.5,
        ball.dy = -4

        paddle.x =  canvas.width / 2 -40,
        paddle.y = canvas.height - 20,
        paddle.w = 80,
        paddle.h = 16,
        paddle.speed = 8,
        paddle.dx = 0

        startGame=false;

        if(vidas ==0){

            // Si te quedas sin vidas pierdes la partida

            MUSICA.play();
            alert('GAME OVER')
                        document.location.reload();
        }

        score = score;
        
    }
}

//Incremento de la puntuacion

function increaseScore() {
    score++;

    if(score % (brickRowCount * brickRowCount) === 0){
        showAllBricks();
    }
}

//Muestra todos los ladrillos a la vez

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => (brick.visible = true));
    });
}

//Procedemos a mostrar todo lo anterior ya situado en el canvas

function draw() {

    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawVidas();
    cronometro();
    drawBricks();
    

}

//Funciones que requieren de actualizaciones de eventos durante el funcionamiento del juego

function update() {
    movePaddle();
    moveBall();
    draw();
    time();
    requestAnimationFrame(update);
}

update();

//Evento de presionar una tecla

function Keydown(ev) {
    switch (ev.keyCode) {
        case 37: 

            paddle.dx = -paddle.speed

        break;

        case 39:

            paddle.dx = paddle.speed

        break;

        case 32:

            startGame=true;

        break;

    }
}

//Evento al dejar de presionar una tecla

function Keyup(ev){

    switch (ev.keyCode) {
        case 37: 

        paddle.dx = 0;

        break;

        case 39:

            paddle.dx = 0;

        break;


    }

}

//Llam a los eventos del teclado

document.addEventListener('keydown', Keydown);
document.addEventListener('keyup', Keyup);

//Eventos para los botones de las instrucciones 

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));