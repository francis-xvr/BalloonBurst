import {apiClient} from './APIClient';

export const authenticate = (username, email) => apiClient.post("/login",{username, email});

export const signUpUser = (username, email) => apiClient.post("/signup", {username, email});

export const getPlayerData = (player_id) => apiClient.get(`/${player_id}/me`);
