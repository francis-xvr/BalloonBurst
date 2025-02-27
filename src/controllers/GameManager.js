import { getLevelTerms } from "../api/GameManagerService";
import GameLevel from "./GameLevel";
import GameController from "./GameController";

export default class GameManager{
    constructor(){
        this.currentLevel = 1;
        this.isRunning = false;
        this.isPaused = false;
        this.levelData = null;
        this.game = null;
        this.score = 0;
    }
    async startNewGame(level=1){
        this.currentLevel = level;
        this.game = null;
        try{
            const res = await getLevelTerms(this.currentLevel);
            // if(res.status===200){
                // if(res.data == "No_levels"){
                    // return null;
                // }
            this.levelData = new GameLevel(res);
            this.game = new GameController(this.levelData);
            this.isRunning = true;
            return this.game;

        }catch(err){
            console.error(err);
        }
    }

    async startNextGameLevel(){
        this.currentLevel++;
        return await this.startNewGame(this.currentLevel);
    }

    pauseGame(){
        this.isPaused = true;
    }

    resumeGame(){
        this.isPaused = false;
    }

    stop(){
        this.isRunning = false;
        this.isPaused = false;
    }

    resetScore(){
        this.score = 0;
    }

    updateScore(points){
        this.score += points;
        const finished = this.game.updateProgress();
        if(finished){
            this.isRunning = false;
        }
    }
}