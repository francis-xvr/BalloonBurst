import './App.css';
import GameConsole from './components/GameConsole';
import AuthProvider, {useAuth} from './security/AuthContext';
import {BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import { SignUpComponent, LoginComponent, LogoutComponent } from './components/SessionComponent';
import ErrorComponent from './components/ErrorComponent';
import WelcomeComponent from './components/Welcome';

function AuthenticatedRoute({children}){
  const authContext = useAuth();
  if(authContext.isAuthenticated)
      return (children);
  else
      return <Navigate to="/login"/>;
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUpComponent/>}/>
            <Route path="/login" element={<LoginComponent/>}/>
            <Route path="/logout" element={<LogoutComponent/>}/>
            <Route path="/balloonburst" element={
              <AuthenticatedRoute><GameConsole/></AuthenticatedRoute>
            }/>
            <Route path="/" element={
              <AuthenticatedRoute><WelcomeComponent/></AuthenticatedRoute>
            }/>
            <Route path="*" element={<ErrorComponent/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
