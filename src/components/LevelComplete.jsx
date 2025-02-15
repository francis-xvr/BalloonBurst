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
    return (
        <div className="progressCardContainer">
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
                    <img className="nextbuttonimage" src="./images/playbutton.svg"></img>
                </div>
            </div>
            <div className="progressCardBackdrop"></div>
        </div>
    );
}

