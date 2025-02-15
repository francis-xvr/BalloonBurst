class StaticBalloon{
    constructor(id, color, x, y){
        this.id = id;
        this.color = color;
        this.x = x;
        this.y = y;
        this.isExploded = false;
    }

    explode(){
        this.isExploded = true;
    }
}

class Balloon{
    constructor(id, color, x, y, movement, stepFn, stepFactor){
        this.id = id;
        this.color = color;
        this.x = x;
        this.y = y;
        this.isExploded = false;
        this.movement = movement;
        this.stepFn = stepFn;
        this.stepFactor = 0.04 * stepFactor;
    }

    explode(){
        this.isExploded = true;
    }

    step(){
       [this.x, this.y] = this.stepFn(this.x, this.y, this.stepFactor);
    }
}

export {StaticBalloon, Balloon};
