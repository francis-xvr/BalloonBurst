import {apiClient} from './APIClient';

export const getAllLevels = ()=> apiClient.get("/levels");

export const getLevelTerms = (level_id) => apiClient.get("/levels/"+ level_id);

export const updatePlayerHighScore = (player_id, highscore, current_level ) => apiClient.put("/score",{ player_id, highscore, current_level});

export const getLeaderBoard = (limit) => apiClient.get("/leaderboard/" + limit);