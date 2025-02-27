import {apiClient} from './APIClient';

export const getAllLevels = ()=> apiClient.get("/levels");

export const bkupgetLevelTerms = (level_id) => apiClient.get("/levels/"+ level_id);

export const updatePlayerHighScore = (player_id, highscore, current_level ) => apiClient.put("/score",{ player_id, highscore, current_level});

export const getLeaderBoard = (limit) => apiClient.get("/leaderboard/" + limit);

export function getLevelTerms(level_id){
    return level_map[level_id];
}

const level_map = {
    "1" : {
            "level_id": 1,
            "level": 1,
            "level_name": "The Beginning",
            "no_of_balloons": 1,
            "no_of_colors": 1,
            "static_balloon": true,
            "movement": null,
            "movement_factor": 10,
            "completion_time": 2
    },
    "2" : {
        "level_id": 2,
        "level": 2,
        "level_name": "Getting hang of it",
        "no_of_balloons": 3,
        "no_of_colors": 1,
        "static_balloon": true,
        "movement": null,
        "movement_factor": 10,
        "completion_time": 3
    },
    "3" : {
        "level_id": 3,
        "level": 3,
        "level_name": "I am not single colour",
        "no_of_balloons": 6,
        "no_of_colors": 2,
        "static_balloon": true,
        "movement": null,
        "movement_factor": 10,
        "completion_time": 3
    },
    "4" : {
        "level_id": 4,
        "level": 4,
        "level_name": "Even more balloons",
        "no_of_balloons": 10,
        "no_of_colors": 3,
        "static_balloon": true,
        "movement": null,
        "movement_factor": 10,
        "completion_time": 4
    },
    "5" : {
        "level_id": 5,
        "level": 5,
        "level_name": "Catch me if you can",
        "no_of_balloons": 1,
        "no_of_colors": 1,
        "static_balloon": false,
        "movement": "btot",
        "movement_factor": 10,
        "completion_time": 1
    },
    "6" : {
        "level_id": 6,
        "level": 6,
        "level_name": "Catch me more",
        "no_of_balloons": 3,
        "no_of_colors": 1,
        "static_balloon": false,
        "movement": "btot",
        "movement_factor": 13,
        "completion_time": 1
    },
    "7" : {
        "level_id": 7,
        "level": 7,
        "level_name": "Things Go Sideways",
        "no_of_balloons": 2,
        "no_of_colors": 1,
        "static_balloon": false,
        "movement": "ltor",
        "movement_factor": 10,
        "completion_time": 1
    },
    "8" : {
        "level_id": 8,
        "level": 8,
        "level_name": "And more...",
        "no_of_balloons": 4,
        "no_of_colors": 2,
        "static_balloon": false,
        "movement": "ltor",
        "movement_factor": 13,
        "completion_time": 2
    },
    "9" : {
        "level_id": 9,
        "level": 9,
        "level_name": "Every things goes up will,",
        "no_of_balloons": 2,
        "no_of_colors": 1,
        "static_balloon": false,
        "movement": "ttob",
        "movement_factor": 10,
        "completion_time": 1
    },
    "10" : {
        "level_id": 10,
        "level": 10,
        "level_name": "And repeat..",
        "no_of_balloons": 5,
        "no_of_colors": 3,
        "static_balloon": false,
        "movement": "ttob",
        "movement_factor": 13,
        "completion_time": 1
    },
    "11" : {
        "level_id": 11,
        "level": 11,
        "level_name": "Its right this time",
        "no_of_balloons": 3,
        "no_of_colors": 1,
        "static_balloon": false,
        "movement": "rtol",
        "movement_factor": 10,
        "completion_time": 1
    }

}