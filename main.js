var foguete, foguete_img
var terra, terra_img
var meteoro, meteoro_img
var chao
var space
var meteoroS
var lazer_img
var lazerS
var kaboom
var gameState = "play"
var score = 0
var et, explosaom, fundo, laser, explosaot
var municao = 80

function preload() {
  foguete_img = loadImage("assets/nave.png")
  terra_img = loadImage("assets/terraaaa.png")
  meteoro_img = loadImage("assets/meteoro.png")
  space = loadImage("assets/spacee.jpg")
  lazer_img = loadImage("assets/lazer.png")
  kaboom = loadImage("assets/bye.png")
  et = loadSound("assets/et.mp3")
  explosaom = loadSound("assets/explosao.mp3")
  fundo = loadSound("assets/fundo.mp3")
  laser = loadSound("assets/laser.mp3")
  explosaot = loadSound("assets/explosao_grande.wav")
}
function setup() {
  createCanvas(windowWidth, windowHeight)
  terra = createSprite(width / 2, height + 700)
  terra.addImage(terra_img)
  terra.scale = 1
  terra.debug = false
  terra.setCollider("circle", 0, 0, 900)
  foguete = createSprite(width - 100, 300)
  foguete.addImage(foguete_img)
  foguete.scale = 0.4
  foguete.rotation = -90
  meteoroS = new Group()
  lazerS = new Group()

  terra.rotationSpeed = 1
  //meteoro.rotationSpeed=0//
  chao = createSprite(width / 2, height, width, 300)
  chao.debug = true
  chao.visible = false

}

function draw() {
  background(space)
  drawSprites()
  textAlign("center")
  textSize(30)
  fill("Fuchsia")
  
  
  // if(!et.isPlaying()){
  //   et.play()
  // }

  foguete.y = mouseY

  if (gameState === "play") {
    meteoroo();
    if (!fundo.isPlaying()) {
      fundo.play()
    }
    text("Score: " + score, width / 2, 30)
    text("Munição: "+ municao , width/2,60)
  }
  if (mouseIsPressed === true) {
    if(municao>0){
      tiro()
    }
    
  }

  

  meteoroS.isTouching(lazerS, hit)

  //if (meteoroS.isTouching(lazerS)) {
  //meteoroS.destroyEach()
  //score+=15
  //}
  //fim de mundo
  if (meteoroS.isTouching(chao)) {
    terra.addImage(kaboom)
    meteoroS.destroyEach()
    terra.scale = 3
    terra.y = height / 2
    explosaot.play()
    foguete.destroy()
    fundo.stop()
    terra.depth-=10
    text("Você fracassou em sua missão.\nAss:Piloto " ,width/2,height/2)
    gameState = "end"
  }
  if(score>100){
    gameState="end"
    textSize(40)
    text("Você salvou todos nós!\nAss:Globo" ,width/2,height/2)
  }

}


function meteoroo() {
  if (frameCount % 60 == 0) {
    meteoro = createSprite(width / 2, -50)
    meteoro.addImage(meteoro_img)
    meteoro.scale = 0.1

    meteoro.x = random(100, width - 300)
    meteoro.velocityY = 5
    meteoro.velocityX = random(-3, 3)
    meteoro.rotation = random(-45, 45)
    meteoro.lifetime = height / 5
    meteoroS.add(meteoro)

    console.log(meteoro.lifetime)
  }
}

function tiro() {
  var lazer = createSprite(foguete.x, foguete.y)
  lazer.addImage(lazer_img)
  lazer.scale = 0.1
  lazer.velocityX = -20
  lazerS.add(lazer)
  laser.play()
  municao -= 1
}

function hit(a, b) {
  a.remove()
  score += 15
  explosaom.play()
  explosaom.setVolume(0.2)
}
