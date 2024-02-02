import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './SignUp.css'
function SignUp() {
  const navigate= useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:3001/register", {username,email,password});
          alert('User registered successfully.');
          navigate("/login")
        } catch (error) {
          console.error(error);
          alert('Registration failed.');
        }
      };
  return (
    <>
        <div className="signup-form-container">
          <form onSubmit={handleSubmit} className="signup-form">
            <label className='labelinline'>
              Username:
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
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
            <button type="submit">Sign Up</button>
          </form>
          <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
        </div>
    </>
  )
}

export default SignUp