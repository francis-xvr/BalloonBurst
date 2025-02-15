export default class GameLevelManager{
    constructor(level, gameconditions){
        this.level = level;
        this.gameconditions = gameconditions;
    }

    getLevel(){
        return this.level;
    }

    getGameConditions(){
        return this.gameconditions;
    }
}