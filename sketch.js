var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;

var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;

var nuvem, grupodenuvens, imagemdanuvem;
var grupodeobstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

var pontuacao;

var imgFimDeJogo,imgReiniciar



function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
    
  imgReiniciar = loadImage("restart.png")
  imgFimDeJogo = loadImage("gameOver.png")
}

function setup() {
  createCanvas(600, 200);
  
    trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided", trex_colidiu);
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  solo.velocityX = -(6 + 3*pontuacao/100);
    
  fimDeJogo = createSprite(300,100);
  fimDeJogo.addImage(imgFimDeJogo);
  
  reiniciar = createSprite(300,140);
  reiniciar.addImage(imgReiniciar);
  
  fimDeJogo.scale = 0.5;
  reiniciar.scale = 0.5;
  
  fimDeJogo.visible = false;
  reiniciar.visible = false;
    
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
   
  grupodenuvens = new Group();
  grupodeobstaculos = new Group();
  
  pontuacao = 0;
}

function draw() {
  //trex.debug = true;
  background(180);
  text("Pontuação: "+ pontuacao, 500,50);
    
  if(estadoJogo === JOGAR){
    pontuacao = pontuacao + Math.round(frameCount/60);
    solo.velocityX = -(6 + 3* pontuacao/100)

    
    if(touches.length >0 || keyDown("space")&& trex.y >= 159) {
       trex.velocityY = -12;
    }
    
    trex.velocityY = trex.velocityY + 0.8

    if (solo.x < 0){
      solo.x = solo.width/2;
    }
    
    trex.collide(soloinvisivel);
    gerarNuvens();
    gerarObstaculos();
    
    if(grupodeobstaculos.isTouching(trex)){
        estadoJogo = ENCERRAR;
    }
  }
     else if (estadoJogo === ENCERRAR) {
      fimDeJogo.visible = true;
      reiniciar.visible = true;

      //define velocidade de cada objeto do jogo como 0
      solo.velocityX = 0;
      trex.velocityY = 0
      grupodeobstaculos.setVelocityXEach(0);
      grupodenuvens.setVelocityXEach(0);

      //altera a animação do Trex
      trex.changeAnimation("collided", trex_colidiu);
          
      //define o tempo de vida dos objetos do jogo para que nunca sejam destruídos
     grupodeobstaculos.setVelocityXEach(-1);
     grupodenuvens.setVelocityXEach(-1);   
    
    if(mousePressedOver(reiniciar)) {
      reset();
    }
  }

    
  drawSprites();
}

function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,120,40,10);
    nuvem.y = Math.round(random(80,120));
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    
     //atribuir tempo de duração à variável
    nuvem.lifetime = 200; 
    
    //ajustando a profundidade
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
        
    //adicionando nuvem ao grupo
   grupodenuvens.add(nuvem);
  }
  
}

function gerarObstaculos(){
 if (frameCount % 60 === 0){
   var obstaculo = createSprite(600,165,10,40);
  //obstaculo.debug = true;
  obstaculo.velocityX = -(6 + 3*pontuacao/100);
      
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
      default: break;
    }
   
    //atribuir escala e tempo de duração ao obstáculo         
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;
    //adicionar cada obstáculo ao grupo
    grupodeobstaculos.add(obstaculo);
 }
}

function reset(){
  estadoJogo = JOGAR;
  fimDeJogo.visible = false;
  reiniciar.visible = false;
  
  grupodeobstaculos.destroyEach();
  grupodenuvens.destroyEach();
  
  trex.changeAnimation("running",trex_correndo);
  
  
 
  pontuacao = 0;
}
