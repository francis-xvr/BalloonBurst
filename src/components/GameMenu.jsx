import '../css/gamecanvas.css';
import '../css/Welcome.css';
import { useAuth } from '../security/AuthContext';

export default function GameMenu({isRunning, controls}){
    const authContext = useAuth();
    
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
    return (
        <div className='gameMenuContainer'>
            <table className='menuTable'>
                <thead>
                    <tr className='menuHeaderRow'>
                        <td>Menu</td>
                    </tr>
                </thead>
                <tbody>
                    <tr className='menuBodyRow'>
                    <td> <span className='menuOption' onClick={controls.newgame}>New Game</span></td>
                    </tr>
                    <tr className='menuBodyRow'>
                        <td ><span className='menuOption' onClick={controls.exitgame}>Exit Game</span></td>
                    </tr>
                    <tr className='menuBodyRow'>
                        <td ><span className='menuOption' onClick={controls.cancel}>Back</span></td>
                    </tr>
                </tbody>
            </table>
            <div className='playerCardContainer'>
                <div className='playerNameBlock'>
                    <img className="playimage" src="./images/playerpic.svg"></img>
                    {/* <span>{authContext.username}</span> */}
                </div>
                {/* <div className='playerScoreBlock'><span>Highscore : {authContext.playerData.highscore}</span></div> */}
            </div>
            <div className='gameSettingsContainer'>
                <div className='audioBlock'>                    
                    {authContext.isMusicOn && <img className="audioToggle" src="./images/music-on.svg" onClick={toggleAudio}></img>}
                    {!authContext.isMusicOn && <img className="audioToggle" src="./images/music-off.svg" onClick={toggleAudio}></img>}
                    {authContext.isSoundOn && <img className="audioToggle" src="./images/audio-on.svg" onClick={toggleMusic}></img>}
                    {!authContext.isSoundOn && <img className="audioToggle" src="./images/audio-off.svg" onClick={toggleMusic}></img>}
                </div>
            </div>
        </div>
    );
}