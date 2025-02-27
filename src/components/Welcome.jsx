import { useNavigate } from 'react-router-dom';
import '../css/Welcome.css';
import { useAuth } from '../security/AuthContext';
import LeaderBoard from './LeaderBoard';

export default function WelcomeComponent(){
    const authContext = useAuth();

    const navigate = useNavigate();
    function startGame(){
        authContext.playClick();
        authContext.playAudio();
        navigate("/BalloonBurst/game");
    }

    function toggleAudio(){
        if(authContext.isMusicOn){
            authContext.stopAudio();
        }else{
            authContext.playAudio();
        }
    }
    function toggleMusic(){
        authContext.toggleMusic();
    }

    function exitGame(){
        authContext.stopAudio();
        authContext.logout();
        navigate("/logout");
    }

    return (
        <div className="welcomPageContainer">
            <div className="gameTitleBlock">
                <h1 className="gameTitle">Balloon Burst
                </h1>
            </div>
            <div className='playBlock'>
                <div className='playButtonBlock' onClick={startGame}><span>Play</span>
                    <img className="playbuttonimage" src="./images/playbutton.svg"></img>
                </div>
            </div>
            <div className='playerCardContainer'>
                <div className='playerNameBlock'>
                    <img className="playimage" src="./images/playerpic.svg"></img>
                    <span>{authContext.username}</span>
                </div>
                {/* <div className='playerScoreBlock'><span>Highscore : {authContext.playerData.highscore}</span>
                    <LeaderBoard/>
                </div> */}
            </div>
            <div className='gameSettingsContainer'>
                <div className='audioBlock'>
                    {authContext.isMusicOn && <img className="audioToggle" src="./images/music-on.svg" onClick={toggleAudio}></img>}
                    {!authContext.isMusicOn && <img className="audioToggle" src="./images/music-off.svg" onClick={toggleAudio}></img>}
                    {authContext.isSoundOn && <img className="audioToggle" src="./images/audio-on.svg" onClick={toggleMusic}></img>}
                    {!authContext.isSoundOn && <img className="audioToggle" src="./images/audio-off.svg" onClick={toggleMusic}></img>}
                </div>
                <div className='exitGameBlock'><img className="audioToggle" src="./images/exit.svg" onClick={exitGame}></img></div>
            </div>
        </div>
    );
}