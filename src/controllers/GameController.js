import { BalloonAnimStepFunctionMap, BalloonColorLibrary } from "./BalloonLogic";
import { Balloon, StaticBalloon } from "./GameObjects";

export default class GameController{

    constructor(gameLevel){
        this.sequence = 0;
        this.gameLevel = gameLevel;
        this.level = gameLevel.level;
        this.gameObjects = [];
        this.progress = 0;
        this.completed = false;
    }
    init(){
        for(let i=0; i< this.gameLevel.no_of_balloons; i++){
            const id = this.gameLevel.level + "_" + this.sequence++;
            const {x, y} = this.getRandomCoord(i, this.gameLevel.no_of_balloons);
            const color = this.getColorByStrategy(this.gameLevel.no_of_colors);
            const stepFactor = this.gameLevel.movement_factor;
            let balloon;
            if(this.gameLevel.static_balloon){
                balloon = new StaticBalloon(id, color, x, y);
            }else{
                let stepFn = null;
                let movement = "";
                if(this.gameLevel.movement === "random"){
                    movement = this.getRandomMovement();
                    stepFn = BalloonAnimStepFunctionMap[movement];
                }else{
                    stepFn = BalloonAnimStepFunctionMap[this.gameLevel.movement];
                }
                balloon = new Balloon(id, color, x, y, this.gameLevel.movement, stepFn, stepFactor);
            }
            this.gameObjects.push(balloon);
        }
    }

    getLevelNo(){
        return this.gameLevel.level;
    }

    updateProgress(){
        this.progress++;
        if(this.progress == this.gameLevel.no_of_balloons){
            this.completed = true;
            return true;
        }
        return false;
    }

    getRandomCoord(nthBalloon, totalBalloon){
        const y = Math.floor(Math.random() * (window.innerHeight -250)) + 100;
        let x = Math.floor((nthBalloon * window.innerWidth/totalBalloon) 
            +  (Math.random() * (window.innerWidth/totalBalloon * 0.75))) + (window.innerWidth/totalBalloon*0.125);
        x = x < 0 ? 50 : x > window.innerWidth - 50 ? x - 100: x;
        return {x:x, y:y};
    }

    getRandomMovement(){
        const movements = Object.keys(BalloonAnimStepFunctionMap);
        const randIndex = Math.max(0,Math.floor(Math.random() * movements.length-1));
        return movements[randIndex];
    }

    getColorByStrategy(num){
        if(num === 1){
            return BalloonColorLibrary[0];
        }
        else{
            const randomIndex = Math.floor(Math.random()*BalloonColorLibrary.length);
            return BalloonColorLibrary[randomIndex];
        }
     }
}
