import { useEffect, useRef, useState } from 'react';
import '../css/gamecanvas.css';
import { useAuth } from '../security/AuthContext';
import getBalloonByColor from '../controllers/BalloonLogic';

export default function Balloon({balloonId, x, y, color, poked, isExploded}){
    const authContext = useAuth();
    const balloonRef = useRef(null);
   
    useEffect(()=>{
        if(balloonRef.current){
            balloonRef.current.style.animationDelay =  `${Math.random()}s`;
        }
    },[]);
    const style = {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        backgroundImage: `url("${getBalloonByColor(color)}")`,
        backgroundPosition: "0px 0px",
      }
    
    function burst(){
        if(!isExploded){
            authContext.playBalloonAudio();
                balloonRef.current.style.animation = "balloonburst 0.5s steps(17) normal forwards";
                poked(balloonId);
        }
    }
    function handleRightClick(event){
        event.preventDefault();
        burst();
    }


    return (
        <div id={balloonId} ref={balloonRef} className="balloonContainer" style={style} 
        onClick={burst} onContextMenu={handleRightClick}>
        </div>
    );
}