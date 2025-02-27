import './App.css';
import GameConsole from './components/GameConsole';
import AuthProvider, {useAuth} from './security/AuthContext';
import {BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import { SignUpComponent, LoginComponent, LogoutComponent } from './components/SessionComponent';
import ErrorComponent from './components/ErrorComponent';
import WelcomeComponent from './components/Welcome';

function AuthenticatedRoute({children}){
  // const authContext = useAuth();
  // if(authContext.isAuthenticated)
  return (children);
  // else
  //     return <Navigate to="/login"/>;
}

function NavigateHome(){
  return <Navigate to="/BalloonBurst/"/>;
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/BalloonBurst/signup" element={<SignUpComponent/>}/>
            <Route path="/BalloonBurst/login" element={<LoginComponent/>}/>
            <Route path="/BalloonBurst/logout" element={<LogoutComponent/>}/>
            <Route path="/BalloonBurst/game" element={
              <AuthenticatedRoute><GameConsole/></AuthenticatedRoute>
            }/>
            <Route path="/BalloonBurst/" element={
              <AuthenticatedRoute><WelcomeComponent/></AuthenticatedRoute>
            }/>
            <Route path="/BalloonBurst" element={
              <NavigateHome/>
            }/>
            <Route path="*" element={<ErrorComponent/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
