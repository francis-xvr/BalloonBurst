export const BalloonColorLibrary = [
    "red",
    "blue",
    "green",
    "yellow",
    "pink",
    "purple"
]

const BalloonRepository = {
    red: "./images/balloon-red.png",
    blue: "./images/balloon-blue.png",
    green: "./images/balloon-green.png",
    yellow: "./images/balloon-yellow.png",
    pink: "./images/balloon-pink.png",
    purple: "./images/balloon-purple.png" 
};

export default function getBalloonByColor(color){
    return BalloonRepository[color] != null? BalloonRepository[color]: BalloonRepository["red"];
}

export const BalloonAnimStepFunctionMap = {
    btot: stepBottomToTop,
    ttob: stepTopToBottom,
    ltor: stepLeftToRight,
    rtol: stepRightToLeft,
    dbrtol: stepDBRightToLeft,
    dtrtol: stepDTRightToLeft,
    dbltor: stepDBLeftToRight,
    dtltor: stepDTLeftToRight,
}

function stepBottomToTop(x,y, setpFactor){
    y = y - setpFactor < -20 ? window.innerHeight : y-setpFactor;
    return [x,y];
}

function stepTopToBottom(x,y, setpFactor){
    y = y + setpFactor > window.innerHeight? 10 : y + setpFactor;
    return [x,y];
}

function stepLeftToRight(x,y, setpFactor){
    x = x + setpFactor > window.innerWidth ? 10 : x + setpFactor;
    return [x,y];
}

function stepRightToLeft(x,y, setpFactor){
    x = x - setpFactor < 0 ? window.innerWidth : x - setpFactor;
    return [x,y];
}

function stepDBRightToLeft(x,y, setpFactor){
    x = x - setpFactor < 0 ? window.innerWidth : x - setpFactor;
    y = y - setpFactor < -20 ? window.innerHeight : y-setpFactor;
    return [x,y];
}

function stepDTRightToLeft(x,y, setpFactor){
    x = x - setpFactor < 0 ? window.innerWidth : x - setpFactor;
    y = y + setpFactor > window.innerHeight? 10 : y + setpFactor;
    return [x,y];
}

function stepDBLeftToRight(x,y, setpFactor){
    x = x + setpFactor > window.innerWidth ? 10 : x + setpFactor;
    y = y - setpFactor < -20 ? window.innerHeight : y-setpFactor;
    return [x,y];
}

function stepDTLeftToRight(x,y, setpFactor){
    x = x + setpFactor > window.innerWidth ? 10 : x + setpFactor;
    y = y + setpFactor > window.innerHeight? 10 : y + setpFactor;
    return [x,y];
}