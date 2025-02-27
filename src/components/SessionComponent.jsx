import '../css/Login.css';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';

export function SignUpComponent(){
    const authContext = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handleEmailChange(event){
        setEmail(event.target.value);
    }

    async function signUp(){
        if(await authContext.signUpByUsername(username, email)){
            setLoginError(false);
            authContext.playAudio();
            navigate("/BalloonBurst/");
        }
        else{
            setLoginError(true);
        }
    }

    return (
        <div className="loginContainer">
            <div className="loginForm">
                <h1 className="loginHeader"></h1>
                {loginError && <div id="loginErrorMessage">**Wrong Credentials</div>}
                <div className='fieldContainer'><input className="loginField" type="text" placeholder="User Name"
                     name="username" value={username} onChange={handleUsernameChange}/></div>
                <div className='fieldContainer'><input className="loginField" type="text" placeholder="Email"
                     name="email" value={email} onChange={handleEmailChange}/></div>
                <div className='fieldContainer'><input className="loginButton" type="submit" value="Sign Up" onClick={signUp}/></div>
                <div><span>Already signed up? </span><Link to={"/login"}>Log In</Link></div>
            </div>
        </div>
    );
}

export function LoginComponent(){
    const authContext = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handleEmailChange(event){
        setEmail(event.target.value);
    }

    async function login(){
        if(await authContext.loginByUsername(username, email)){
            setLoginError(false);
            authContext.playAudio();
            navigate("/");
        }
        else{
            setLoginError(true);
        }
    }

    return (
        <div className="loginContainer">
            <div className="loginForm">
                <h1 className="loginHeader">Balloon Burst</h1>
                {loginError && <div id="loginErrorMessage">**Wrong Credentials</div>}
                <div className='fieldContainer'><input className="loginField" type="text" placeholder="User Name"
                     name="username" value={username} onChange={handleUsernameChange}/></div>
                <div className="lineBreak">- Or - </div>
                <div className='fieldContainer'><input className="loginField" type="text" placeholder="Email"
                     name="email" value={email} onChange={handleEmailChange}/></div>
                <div className='fieldContainer'><input className="loginButton" type="submit" value="Sign In" onClick={login}/></div>
                <div><span>New user? </span><Link to={"/signup"}>Sign up</Link></div>
            </div>
            
        </div>
    );
}

export function LogoutComponent(){
    const authContext = useAuth();
    const divStyle={width:"50vw"};
    return (
        <div id="logoutContainer" >
            <div id="logoutDiv" style={divStyle}>
                <h2>You are logged Out.</h2>
                <p>changed your mind? <a href="/login">Sign in</a></p> 
            </div>
        </div>
    );
}