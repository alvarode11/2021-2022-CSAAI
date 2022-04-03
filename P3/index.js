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

const brickRowCount = 9;
const brickColumnCount = 5;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
};

const paddle = {
    x: canvas.width / 2 -40,
    y:canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
};

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};

const bricks = [];
for (let i = 0; i < brickRowCount; i++){
    bricks[i] = [];
    for(let j= 0; j< brickColumnCount; j++){
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo }; 
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#48d1cc';
    ctx.fill();
    ctx.closePath()
}

var vidas = 3;

function drawVidas() {
    ctx.font = '20px Arial';
    ctx.fillText(`Vidas: ${vidas}`, canvas.width-750, 30);
}



let microsegundos = 0;
let segundos = 0;
let minutos = 0;

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
function cronometro(){
    ctx.font = "20px Arial";
    ctx.fillText('Tiempo: ', 355, 30);
    ctx.fillText(minutos + ':' + segundos, 435, 30);
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#48d1cc';
    ctx.fill();
    ctx.closePath();
}

function drawScore(){
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}` , canvas.width - 100, 30);
}

function drawBricks(){
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#48d1cc' : 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}

function movePaddle() {
    paddle.x += paddle.dx;

    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
    }

    if(paddle.x < 0){
        paddle.x = 0;
    }
}

function moveBall() {

    if(startGame){
        ball.x += ball.dx;
        ball.y += ball.dy;
    } 
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
        ball.dx *= -1;
    }

    if(ball.y + ball.size > canvas.height ) {

        ball.dy *= -1; 
        vidas = vidas - 1;
        MUSIC.play();
   
        if(vidas ==0){

            MUSICA.play();
            alert('GAME OVER')
                        document.location.reload();
        }

    }else if(ball.y - ball.size <0){

        ball.dy *= -1; 
        
    }
    
    if(
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ){
        ball.dy = -ball.speed;
        music.play();
    }

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

    if(ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
}

function increaseScore() {
    score++;

    if(score % (brickRowCount * brickRowCount) === 0){
        showAllBricks();
    }
}

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => (brick.visible = true));
    });
}

function draw() {

    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
    drawVidas();
    cronometro();
}

function update() {
    movePaddle();
    moveBall();
    draw();
    time();
    requestAnimationFrame(update);
}

update();


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

document.addEventListener('keydown', Keydown);
document.addEventListener('keyup', Keyup);


rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));