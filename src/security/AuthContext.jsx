import { createContext, useContext, useRef, useState } from "react";
import { authenticate, getPlayerData, signUpUser } from "../api/AuthenticationAPIService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({children}){
    const audioRef = useRef(new Audio("/audio/gamemusic.mp3"));
    audioRef.current.loop = true;
    const balloonAudRef1 = useRef(new Audio("./audio/burst.mp3"));
    const balloonAudRef2 = useRef(new Audio("./audio/burst2.mp3"));
    const balloonAudRef3 = useRef(new Audio("./audio/burst3.mp3"));
    const clickAudioRef = useRef(new Audio("./audio/buttonClick1.mp3"));
    const levelCompleteAudioRef = useRef(new Audio("./audio/levelComplete.mp3"))
    const gameOverAudioRef = useRef(new Audio("./audio/gameover.mp3"));
    const levelRevealAudioRef = useRef(new Audio("./audio/levelreveal.mp3"));

    const [isMusicOn, setMusicOn] = useState(true);
    const [isSoundOn, setSoundOn] = useState(true);    
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null)
    const [playerData, setPlayerData] = useState(null)

    const playAudio = () => {
        audioRef.current.play()
            .then(() => setMusicOn(true))
            .catch((err) => console.log("Audio play failed:", err));
    };

    const stopAudio = () => {
        audioRef.current.pause();
        setMusicOn(false)
    }

    function toggleMusic(){
        setSoundOn(!isSoundOn)
    }

    const playBalloonAudio = () => {
        if(isSoundOn){
            const aRef = getRandomBurstAudio();
            aRef.current.currentTime = 0;
            aRef.current.play()
                .then()
                .catch((err) => console.log("Audio play failed:", err));
        }
    };

    const playClick = () => {
        if(isSoundOn){
            clickAudioRef.current.currentTime = 0;
            clickAudioRef.current.play()
                .then()
                .catch((err) => console.log("Click Audio play failed:", err));
        }
    }
    const playLevelComplete = () => {
        if(isSoundOn){
            levelCompleteAudioRef.current.currentTime = 0;
            levelCompleteAudioRef.current.play()
                .then()
                .catch((err) => console.log("Level complete Audio play failed:", err));
        }
    }

    const playGameOver = () => {
        if(isSoundOn){
            gameOverAudioRef.current.currentTime = 0;
            gameOverAudioRef.current.play()
                .then()
                .catch((err)=> console.log("Gameover audio play failed:", err));
        }
    }

    const playLevelReveal = () => {
        if(isSoundOn){
            levelRevealAudioRef.current.currentTime = 0;
            levelRevealAudioRef.current.play()
                .then()
                .catch((err) => console.log("LevelReveal audio play failed:", err));
        }
    }

    function getRandomBurstAudio(){
        const num = Math.floor(Math.random() * 3);
        switch(num){
            case 1:
                return balloonAudRef1;
            case 2:
                return balloonAudRef2;
            default:
                return balloonAudRef3;
        }
    }
    
    async function signUpByUsername(username, email){
        try{
            const res = await signUpUser(username, email);
            if(res.status===200){
                if(await loginByUsername(username, email)){
                    return true;
                }else{
                    return false;
                }
            }
        }catch(err){
            console.error(err);
            setAuthenticated(false);
            return false;
        }
    }

    async function loginByUsername(username, email){
        try{
            const res = await authenticate(username, email);
            if(res.status===200){
                const playerData = res.data;
                setPlayerData(playerData);
                setAuthenticated(true);
                setUsername(username);
                return true;           
            }else{
                setAuthenticated(false);
                setUsername(null); 
                return false;         
            }
        }catch(err){
            console.error(err);
            setAuthenticated(false);
            return false;
        }
    }

    function logout(){
        setAuthenticated(false);
        return true;   
    }

    async function refreshPlayerData(){
        try{
            const res = await getPlayerData(playerData.player_id);
            if(res.status === 200){
                setPlayerData(res.data);
            }
        }catch(err){
            console.error(err);
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            username, 
            playerData, 
            signUpByUsername, 
            loginByUsername, 
            logout,
            refreshPlayerData,
            playAudio,
            stopAudio,
            isMusicOn,
            isSoundOn,
            toggleMusic,
            playBalloonAudio,
            playClick,
            playLevelComplete,
            playGameOver,
            playLevelReveal
            }}>
            {children}
        </AuthContext.Provider>
    );
}