class Stone 
{
  constructor(x, y, r) 
  {
    let options = {
     isStatic:false
    };
    
    this.body = Bodies.circle(x, y, r, options);
    this.r = r
    //this.color= color;
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    push();
    ellipseMode(RADIUS);
    noStroke();
    fill("white");
    ellipse(pos.x,pos.y, this.r, this.r);
    pop();
  }
}
