import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route, Link, Switch }
    from "react-router-dom";
import SignUp from './components/signUp/SignUp';
import Login from './components/Login/Login';
import Home from './components/home/Home';

function App() {
  return (
    <><div className="App"><BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>

      </div></>
  );
}

export default App;
