import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Home from '../home/Home';

function Login() {
const navigate=useNavigate()
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [token, setToken] = useState('');

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:3001/login", { email, password });
          setToken(response.data.token);
          alert('Login successful.');
        } catch (error) {
          console.error(error);
          alert('Login failed.');
        }
      };

  return (
    <>
        {
          token? <Home token={token}/>:<div className="signup-form-container">
          <form onSubmit={handleSubmit} className="signup-form">
            <label className='labelinline'>
              Email:
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
            </label>
            <label className='labelinline'>
              Password:
              <input
              className='inputtext'
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
            </label>
            <button type="submit">Login</button>
          </form>
         
        </div>
        }
    </>
  )
}

export default Login 