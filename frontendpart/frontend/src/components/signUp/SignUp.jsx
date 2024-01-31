import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './SignUp.css'
function SignUp() {
  const navigate= useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Add your signup logic here using formData
         axios.post("http://localhost:5000/register",formData).then(result=> {console.log(result)
         navigate("/login")}).catch(err=> console.log(err))
        console.log('Form submitted:', formData);
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
                value={formData.username}
                onChange={handleChange}
              />
            </label>
            <label className='labelinline'>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label className='labelinline'>
              Password:
              <input
              className='inputtext'
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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