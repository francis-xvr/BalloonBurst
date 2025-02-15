export default class GameLevel{
    constructor(levelData){
        this.level = levelData.level;
        this.level_id = levelData.level_id;
        this.level_name = levelData.level_name;
        this.no_of_balloons = levelData.no_of_balloons;
        this.no_of_colors = levelData.no_of_colors;
        this.static_balloon = levelData.static_balloon;
        this.movement = levelData.movement;
        this.movement_factor = levelData.movement_factor;
        this.completion_time = levelData.completion_time;
    }
}