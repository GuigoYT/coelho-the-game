class Ground {
  constructor(x, y, width, height) {
    let options = {
      isStatic: true
    }
    
    this.width = width
    this.height = height
    this.body = Bodies.rectangle(x, y, width, height, options)
    World.add(world, this.body)
  }

  display() {
    let position = this.body.position

    push()
    noStroke()
    fill('red')
    rect(position.x,position.y, this.width, this.height)
    pop()
  }
}
