import { useEffect } from "react";
import { useAuth } from "../security/AuthContext";

export default function LevelProgressCard({level, score, nextGame, levelName}){
    const authContext = useAuth();
    function getScore(){
        return score < 10 ? "0"+score: score;
    }
    function next(){
        authContext.playClick();
        nextGame();
    }
    useEffect(()=>{
        const handleKeyDown = (event) => {
            if(event.key === "Enter")
                next();
        }
        document.addEventListener("keydown", handleKeyDown);

        const confettiWrapper = document.querySelector('.confetti-wrapper');

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `${Math.random() * -10}%`;
            confetti.style.setProperty('--fall-duration', `${Math.random() * 3+ 1.5}s`);
            confetti.style.setProperty('--confetti-color', getRandomColor());
            confetti.style.setProperty('--confetti-start-rot',`${Math.random() * 360}deg` );
            confettiWrapper.appendChild(confetti);
        }
        function getRandomColor() {
            const colors = ['#ff6347', '#ffa500', '#32cd32', '#1e90ff', '#ff69b4'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    },[]);


    return (
        <div className="progressCardContainer">
             <div className="confetti-wrapper"></div>
            <div className="progressCardBlock">
                <h1 className="progressTitle">Level {level}</h1>
                <span className="gameLevelName">"{levelName}"</span>
                <div className="awesomeBlock">
                    <div className="awesome">Awesome!</div>
                    <div className="awesomeBody">Level completed!</div>
                </div>
                <div className="progressScoreBlock">
                    <div className="progressScoreTitle">Score:</div>
                    <div className="progressScoreDiv">
                        <span className="progressScore">{getScore()}</span>
                    </div>
                </div>
                <div className="nextGameButton" onClick={next}>Next
                    <img className="nextbuttonimage" src="./images/playbutton.svg" alt=""></img>
                </div>
            </div>
            <div className="progressCardBackdrop"></div>
        </div>
    );
}

