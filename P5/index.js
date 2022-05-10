
let directo = document.getElementById("directo");
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const btn_video1 = document.getElementById("btn_video1");
const btn_test = document.getElementById("btn_test");
const btn_src_on = document.getElementById("btn_src_on");
const btn_src_off = document.getElementById("btn_src_off");


directo.width=840;
directo.height=400;
video1.width=400;  
video1.height=200;
video2.width=400;  
video2.height=200;

const TEST_IMAGE_URL = "test.png";



directo.poster = TEST_IMAGE_URL;
video1.poster = TEST_IMAGE_URL;
video2.poster = TEST_IMAGE_URL;


btn_src_off.onclick = () => {
 

    directo.poster = TEST_IMAGE_URL;
    directo.src = TEST_IMAGE_URL;
    video1.poster=TEST_IMAGE_URL;
    video1.src = TEST_IMAGE_URL;
    video2.poster=TEST_IMAGE_URL;
    video2.src = TEST_IMAGE_URL;
    
  };



btn_src_on.onclick = () => {

  video1.src="Adorables gatitos sin pelo jugando juntos TATACHAN Y QUIJOTE  GATOS SPHYX.mp4";
  video2.src="Los Sphynx, gatos sin pelo.mp4";

  video1.currentTime = 0;
  video1.play();

  video2.currentTime = 0;
  video2.play();



  video1.muted=true;
  video2.muted=true;


  directo.poster = TEST_IMAGE_URL;
};

btn_test.onclick = () => {
    directo.poster = TEST_IMAGE_URL;
    directo.src = TEST_IMAGE_URL;
};


btn_video1.onclick = () => {
    
        
    directo.src = video1.src;
    directo.currentTime = video1.currentTime;
    directo.play();
    
};
btn_video2.onclick = () => {
    
        
    directo.src = video2.src;
    directo.currentTime = video2.currentTime;
    directo.play();
    
};