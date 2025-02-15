class Player{

    constructor(username, email, score, currentLevel){
        this.username = username;
        this.email = email;
        this.score = score;
        this.currentLevel = currentLevel;
    }

    getUsername(){
        return this.username;
    }

    getEmail(){
        return this.email
    }
}