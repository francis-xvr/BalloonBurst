import '../css/gamecanvas.css';
import { useState, useEffect, useRef } from 'react';
import Balloon from './balloon';
import { useAuth } from '../security/AuthContext';
import { updatePlayerHighScore } from '../api/GameManagerService';
import { Balloon as DynamicBalloon } from '../controllers/GameObjects';
import LevelProgressCard from './LevelComplete';

export default function GameCanvas(props){
    const authContext = useAuth();
    const gameManager = useRef(props.gamemanager);
    const game = useRef(props.gamemanager.game);
    const [gameObjects, setGameObjects] = useState([]);
    const [score, setScore] = useState(0);
    const [showProgressCard, setShowProgressCard] = useState(false);
    const [showGameOverCard, setGameOverCard] = useState(false);
    const [timeLeft, setTimeLeft] = useState(game.current.gameLevel.completion_time * 60);
    const timerRef = useRef(null);
    const [reinit, setReinit] = useState(false);
    const [showLevelTitle, setShowLevelTitle] = useState(false);

    useEffect(()=>{
        const container = document.getElementById("gameCanvasContainerID");
        container.style.cursor = `url('./images/sword-big.png') 1 1, auto`;

        return () => stopTimer();
    },[])

    useEffect(()=>{
        game.current = gameManager.current.game;
        setGameObjects([]);
        setScore(gameManager.current.score);
        setTimeLeft(game.current.gameLevel.completion_time * 60);
        setReinit(prev => !prev);
        setShowLevelTitle(true);
        authContext.playLevelReveal();
        setTimeout(startGamePlay, 1000);
    }, [props.reInit]);

    useEffect(()=>{
        startBalloonMovement();
    },[gameObjects]);

    useEffect(()=>{
        startBalloonMovement();
        if(!timerRef.current){
            timerRef.current = setInterval(()=>{
                setTimeLeft((prev)=> {
                    if(prev -1 <=0){
                        gameOver();
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    },[props.resume]);

    function startGamePlay(){
        if(game.current.gameObjects.length === 0 
            && game.current.progress === 0){
            game.current.init();
            setGameObjects(game.current.gameObjects);
            gameManager.current.isPaused=false;
            setTimeLeft(game.current.gameLevel.completion_time * 60);
            if(!timerRef.current){
                timerRef.current = setInterval(()=>{
                    setTimeLeft((prev)=> {
                        if(prev -1 <=0){
                            gameOver();
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
            setTimeout(()=>{setShowLevelTitle(false)}, 500);
        }
    }

    function pokedBalloon(balloonId){
        gameManager.current.updateScore(1);
        setScore(gameManager.current.score);
        const pokedIndex = gameObjects.findIndex((o)=>(o.id === balloonId));
        if(gameObjects[pokedIndex].isExploded){
            return;
        }
        gameObjects[pokedIndex].explode();
        game.current.gameObjects[pokedIndex].explode();
        setGameObjects(game.current.gameObjects);
        if(game.current.completed){
            gameManager.current.isPaused=true;
            authContext.playLevelComplete();
            stopTimer();
            setShowProgressCard(true);
        }
    }

    function saveAndContinue(){
        setShowProgressCard(false);
        const completedLevel = gameManager.current.currentLevel;
        props.gameCompleted();
        if(gameManager.current.score > authContext.playerData.highscore){
            updatePlayerHighScore(
                authContext.playerData.player_id,
                gameManager.current.score,
                completedLevel)
                .then(()=>(authContext.refreshPlayerData())).catch((err)=>(console.error(err)));
        }
    }

    function stepBalloonAnim(currentTime){
        if(gameManager.current.isPaused)
            return;
        setGameObjects(prevGameObjects => {
            const newGameObjects = prevGameObjects.map(balloon => {
                if(balloon instanceof DynamicBalloon && !balloon.isExploded){
                    balloon.step();
                    return balloon;
                }
                return balloon;
            });
            return newGameObjects;
        });
    }

    function openMenu(){
        stopTimer();
        props.openMenu();
    }

    function stopTimer(){
        if(timerRef.current){
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }

    function gameOver(){
        stopTimer();
        setGameOverCard(true);
        authContext.playGameOver();
        setGameObjects([]);
    }

    function startBalloonMovement(){
        requestAnimationFrame(stepBalloonAnim)
    }

    function avoidRightClick(event){
        event.preventDefault();
    }

    return (
        <div id="gameCanvasContainerID" className="gameCanvasContainer" onContextMenu={avoidRightClick}>
            <ScoreCard score={score} level={game.current.level} timeLeft={timeLeft} 
            openMenu={openMenu} reinit={reinit} gameover={showGameOverCard}/>
            {
                gameObjects.map(
                    (balloon) => {
                        return <Balloon key={balloon.id} balloonId={balloon.id} x={balloon.x}
                        y={balloon.y} color={balloon.color} poked={pokedBalloon} isExploded={balloon.isExploded}/>
                    }
                )
            }
            {showLevelTitle && <LevelTitle title={game.current.gameLevel.level_name}/>}
            {showProgressCard && <LevelProgressCard level={game.current.level} 
            score={score} nextGame={saveAndContinue} levelName={game.current.gameLevel.level_name}/>}
            {showGameOverCard && <GameOverCard controls={props.controls} hideGameOver={setGameOverCard}/>}
        </div>
    );
}

function LevelTitle({title, showTitle}){
    const dom = useRef(null);
    useEffect(()=>{
        
    },[]);
    return (
        <div className='levelTitleBlock' ref={dom}>
            <div className='upperBar'></div>
            <div className='levelTitle'>{title}</div>
            <div className='lowerBar'></div>
        </div>
    );
}

function ScoreCard({score, level, timeLeft,  openMenu, reinit, gameover}){
    const timerDom = useRef(null);
    const [scoreAnimate, setScoreAnimate] = useState(false);
    useEffect(()=>{
        if(timeLeft > 30){
            timerDom.current.style.color = "aliceblue";
            timerDom.current.style.animation = "none"
        }
    },[reinit])

    useEffect(()=>{
        setScoreAnimate(true);
        const scoreTimeout = setTimeout(()=> setScoreAnimate(false), 500);
        return ()=> clearTimeout(scoreTimeout);
    }, [score]);

    function getTime(){
        if(timeLeft === 30 ){
            timerDom.current.style.color = "red";
            timerDom.current.style.animation = "blink 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) infinite normal forwards";
        }
        const mm = Math.max(0,Math.floor(timeLeft/60));
        const ss = Math.max(0,timeLeft - (mm*60));
        return (mm < 10 ? "0"+mm: mm ) + ":" + (ss <10 ? "0" + ss : ss);
    }
    return (
        <div className='scoreCardCointainer'>
            <div className='levelCard'>
                <span>Level: {level}</span>
                <div className='timerSpan'><img className="clock" alt="" src="./images/sandclock-white.svg"/><span ref={timerDom} id="timerId"> {getTime()}s</span></div>
            </div>
            <div className={scoreAnimate? "scoreCardAnim" : "scoreCard" }><span className='score'>{score}</span></div>
            {!gameover &&<div className='menuCard'><span onClick={openMenu}>Menu</span></div>}
            {gameover && <div className='menuCard'><span >Menu</span></div>}
        </div>
    );
}

function GameOverCard({controls, hideGameOver}){
    function restart(){
        hideGameOver(false);
        controls.newgame();
    }
    function exit(){
        hideGameOver(false);
        controls.exitgame();
    }
    return (
        <div className='gameOverCardBlock'>
            <div className='gameOverTitle'>Gameover</div>
            <div className='gameOverMessage'>I know you could have done better champ!</div>
            <div className='gameOverControls'>
                <div className='gameOverControlsButton' onClick={restart}>Restart</div>
                <div className='gameOverDecoy'></div>
                <div className='gameOverControlsButton' onClick={exit}>Exit</div>
            </div>
        </div>
    );
}

