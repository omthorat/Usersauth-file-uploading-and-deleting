import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import './SignUp.css'

function Login() {
const navigate=useNavigate()
    const [formData, setFormData] = useState({
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
        // Add yourLogin logic here using formData
         axios.post("http://localhost:5000/login",formData).then(result=>{console.log(result)
        if(result.data==="Success"){
          navigate("/home")
          console.log("logged in successfully")
        }}
        ).catch(err=> console.log(err))
        console.log('Form submitted:', formData);
      };
  return (
    <>
        <div className="signup-form-container">
          <form onSubmit={handleSubmit} className="signup-form">
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
            <button type="submit">Login</button>
          </form>
         
        </div>
    </>
  )
}

export default Login 