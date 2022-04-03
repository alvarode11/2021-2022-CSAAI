//Definiendo todas las variables y constantes que voy a utilizar para la practica

const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const music = new Audio('laser.mp3');
const musica = new Audio('pum.mp3');
const MUSICA = new Audio('gameover.mp3');
const MUSIC = new Audio('error.mp3');
var startGame = false;
let score = 0;
let microsegundos = 0;
let segundos = 0;
let minutos = 0;
let vidas = 3;
const brickRowCount = 9;
const brickColumnCount = 5;

//Creando pelotita

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2 +270,
    size: 15,
    speed: 4,
    dx: 1.5,
    dy: -4
};

//Creando la raqueta

const paddle = {
    x: canvas.width / 2 -40,
    y:canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
};

//Definiendo caracteristicas de cada

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};

//Creando los ladrillos

const bricks = [];
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
    ctx.fillStyle = '#3399FF';
    ctx.fill();
    ctx.closePath();
}

//Dibujando la raqueta dentro del canvas

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#00FFCC';
    ctx.fill();
    ctx.closePath();
}

//Dibujando la puntuacion dentro del canvas

function drawScore(){
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}` , canvas.width - 100, 30);
}

//Dibujando las vidas dentro del canvas

function drawVidas() {
    ctx.font = '20px Arial';
    ctx.fillText(`Vidas: ${vidas}`, canvas.width-750, 30);
}

//Funcion que calculara el tiempo 

function time(){
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

//Dibujando el cronometro dentro del canvas

function cronometro(){
    ctx.font = "20px Arial";
    ctx.fillText('Tiempo: ', 355, 30);
    ctx.fillText(minutos + ':' + segundos, 435, 30);
}

//Dibujando los ladrillos dentro del canvas

function drawBricks(){
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ?'#00FFCC': 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}

//Movimiento de la raqueta

function movePaddle() {
    paddle.x += paddle.dx;

    //Detecta las paredes del canvas

    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
    }

    if(paddle.x < 0){
        paddle.x = 0;
    }
}

//Movimiento de la pelotita en el canvas

function moveBall() {
    if (startGame){
    ball.x += ball.dx;
    ball.y += ball.dy;
    } 

    //Colision con las paredes laterales del canvas

    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
        ball.dx *= -1; 
    }

    //Colision con el suelo y el techo del canvas

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

    //Colision con los ladrillos

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
                    musica.play();
                    increaseScore();
                }
            }
        });
    });

    //Si la pelotita toca el suelo pierdes

    if(ball.y + ball.size > canvas.height) {
        vidas = vidas - 1;
        music.play();
        if(vidas ==0){

            MUSICA.play();
            alert('GAME OVER')
                        document.location.reload();
        }
        showAllBricks();
        score = 0;

    }
}

//Funcion para la puntuacion

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

//Procedemos a dibujar todo lo anterior en el canvas

function draw() {
   
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
    drawVidas();
    cronometro();
}

//Funcion para todo aquello que no es constante y necesita de actualizarse

function update() {
    movePaddle();
    moveBall();
    draw();
    time();
    requestAnimationFrame(update);
}

update();

//Evento al presionar una tecla

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

//Llamando a los eventos del teclado

document.addEventListener('keydown', Keydown);
document.addEventListener('keyup', Keyup);

//Eventos para los botones de las reglkas que se mostraran por pantalla

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));