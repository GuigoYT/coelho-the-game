class Link {

    constructor(corpoA,corpoB ) {
        let utimoRetangulo = corpoA.body.bodies.length-2
        this.restricao = Constraint.create(
            {
                bodyA: corpoA.body.bodies[utimoRetangulo],
                bodyB: corpoB,
                length: -10,
                stiffness: 0.01
            }
        )

        World.add(world,this.restricao)

}

desfaser() {
    World.remove(world ,this.restricao )
}







}