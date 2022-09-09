const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint
const Body = Matter.Body
const Composites = Matter.Composites
const Composite = Matter.Composite

let engine
let world

let ground

let corda , corda2 , corda3
let fruta, frutaImg
let link ,   link2  , link3
let fundoImg 
let coelho ,coelhoPiscando , coelhoComendo , coelhoChorando
let botao1 ,botao2 , botao3
let somFundo , somCorda , somComendo , somChorando , somAr
let botaoMudo
let balao

function preload() {
  somFundo=loadSound('./assets/background_sound.mp3')
  somComendo=loadSound('./assets/eating_sound.mp3')
  somCorda=loadSound('./assets/cut_sound.mp3')
  somChorando=loadSound('./assets/sad_sound.wav')
  somAr=loadSound('./assets/air_sound.wav')
fundoImg=loadImage('./assets/background.png')  
frutaImg=loadImage('./assets/melon.png')
coelhoPiscando=loadAnimation('./assets/blink_1.png', './assets/blink_2.png','./assets/blink_3.png')
coelhoComendo=loadAnimation('./assets/eat_1.png' , './assets/eat_2.png' , './assets/eat_3.png' , './assets/eat_4.png' , './assets/eat_5.png')
coelhoChorando=loadAnimation('./assets/sad_1.png' , './assets/sad_2.png' , './assets/sad_3.png' )

coelhoPiscando.playing=true
coelhoComendo.playing=true
coelhoChorando.playing=true

coelhoPiscando.looping=true
coelhoComendo.looping=false
coelhoChorando.looping=false

coelhoPiscando.frameDelay=15
coelhoComendo.frameDelay=15
coelhoChorando.frameDelay=15
}

function setup() {
  createCanvas(500,700)

  engine = Engine.create()
  world = engine.world
 
  rectMode(CENTER)
  ellipseMode(RADIUS)
  imageMode(CENTER)
  textSize(50)

  // criei um objeto do modelo Ground
  ground = new Ground(250, 660, 500, 10)
  corda= new Rope(8, {x:245,y: 35})
  corda2= new Rope(8, {x:450,y: 200})
  corda3= new Rope(9, {x:20,y: 30})

let opcoesFruta={
  density: 0.001
}

fruta=Bodies.circle(300,300,15,opcoesFruta)
Composite.add(corda.body,fruta)

link=new Link(corda,fruta)
link2=new Link(corda2,fruta)
link3=new Link(corda3,fruta)

coelho=createSprite(350,600)
coelho.addAnimation('piscando',coelhoPiscando)
coelho.addAnimation('comendo',coelhoComendo)
coelho.addAnimation('chorando',coelhoChorando)
coelho.scale=0.2

botao1=createImg('./assets/cut_button_1.png')
botao1.position(220,35)
botao1.size(50,50)
botao1.mouseClicked(soltar1)

botao2=createImg('./assets/cut_button_1.png')
botao2.position(450,200)
botao2.size(50,50)
botao2.mouseClicked(soltar2)

botao3=createImg('./assets/cut_button_1.png')
botao3.position(20,30)
botao3.size(50,50)
botao3.mouseClicked(soltar3)


balao=createImg('./assets/balloon_1.png')
balao.position(10,250)
balao.size(150,100)
balao.mouseClicked(assoprar)

somFundo.play()
somFundo.setVolume(0.1)

botaoMudo=createImg('./assets/mute_button.png')
botaoMudo.position(450,20)
botaoMudo.size(50,50)
botaoMudo.mouseClicked(mutar)
}

function draw() {
  background('black')
  image(fundoImg,width/2,height/2,500,700)
  
  Engine.update(engine)

  
  corda.show()
  corda2.show()
  corda3.show()
  if (fruta !== null) {
    image(frutaImg, fruta.position.x , fruta.position.y,60,60)
  }

  
  if (colidir(fruta,coelho)) {
    coelho.changeAnimation('comendo')
    somComendo.play()
  }

  if (fruta !== null && fruta.position.y > 600) {
    coelho.changeAnimation('chorando')
    World.remove(world , fruta)
    fruta=null
    somChorando.play()
  }

  drawSprites()
}
function soltar1() {
  corda.break()
  link.desfaser()
  link=null
  somCorda.play()
}

function soltar2() {
  corda2.break()
  link2.desfaser()
  link2=null
  somCorda.play()
}
  function soltar3() {
    corda3.break()
    link3.desfaser()
    link3=null
    somCorda.play()
  }
function colidir(corpoA,corpoB) {
  if (corpoA !== null) {
    let distance = dist(corpoA.position.x , corpoA.position.y,corpoB.position.x , corpoB.position.y)
    if (distance <=80) {
      World.remove(world , fruta)
      fruta=null
      return true
    } else {
      return false
    }
  }
}

function mutar() {
  if (somFundo.isPlaying()) {
    somFundo.stop()
  } else {
    somFundo.play()
  }
}


function assoprar() {
  Body.applyForce(fruta,{x:0,y:0}, {x:0.01,y:0})
}