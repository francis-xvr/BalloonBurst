import '../css/gamecanvas.css';
import { useState, useRef } from 'react';
import GameCanvas from './GameCanvas';
import GameManager from '../controllers/GameManager';
import GameMenu from './GameMenu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';



export default function GameConsole(){
    const authContext = useAuth();
    const navigate = useNavigate();

    const gameManager = useRef(new GameManager());
    const [reinit, forceUpdate] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isEnd, setEnd] = useState(false);

    const [showMenu, setShowMenu] = useState(true);
    const [playPauseToggle, setPlayPauseToggle] = useState(false);

    function isRunning(){
        return gameManager.current.isRunning;
    }
    async function newGame(){
        authContext.playClick();
        setLoading(true);
        const res = await gameManager.current.startNewGame(1);
        setLoading(false);
        if(res != null){
            forceUpdate((prev) => prev + 1);
            gameManager.current.resetScore();
            setShowMenu(false);
        }
    }
    async function startNextLevel(){
        setLoading(true);
        const res = await gameManager.current.startNextGameLevel();
        if(res == null){
            setLoading(false);
            setEnd(true);
            gameManager.current.stop();
            setTimeout(()=>{
                setEnd(false);
                navigate("/");
            }, 5000);
        }else{
            setLoading(false);
            if(res != null){
                forceUpdate((prev) => prev + 1);
                setShowMenu(false);
            }
        }
    }
    function continueGame(){
        console.log("continue game");

    }
    function exitGame(){
        authContext.playClick();
        if(gameManager.current.isRunning){
            gameManager.current.stop();
        }
        navigate('/BalloonBurst');
    }
    function cancelMenu(){
        authContext.playClick();
        if(isRunning()){
            gameManager.current.resumeGame();
            setPlayPauseToggle(!playPauseToggle);
            setShowMenu(false);
        }
        else
            navigate("/BalloonBurst");
    }
    const controls = {
        newgame: newGame,
        continuegame: continueGame,
        exitgame: exitGame,
        cancel: cancelMenu
    }

    function gameCompleted(){
        startNextLevel();
    }

    function openMenu(){
        authContext.playClick();
        gameManager.current.pauseGame();
        setShowMenu(true);
    }

    return (
        <div className='gameConsoleContainer'>
            {loading && <LoadingScreen/>}
            {showMenu && <GameMenu isRunning={isRunning} controls={controls}/>}
            {isRunning() && <GameCanvas key={isRunning()} gamemanager={gameManager.current} 
                resume={playPauseToggle} gameCompleted={gameCompleted} 
                reInit={reinit} openMenu={openMenu} controls={controls}/>}
            {isEnd && <EndScreen/>}
        </div>
    );
}

function LoadingScreen(){
    return (
        <div className='loadingScreen'>Loading..<span className='loadingDash'>_</span></div>
    )
}

function EndScreen(){
    return (
        <div className='endScreen'>
            <div className='loadingDash endTitle'>The End</div>
            <div>The problem with being faster than light is..</div>
            <div>You will always be in dark.</div>
            <br></br>
            <br></br>
            <div>Stay low Champ!, redirecting to home...</div>
        </div>
    )
}