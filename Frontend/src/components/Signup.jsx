import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [fullName, setfullName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
        setMessage('');
    try {
      await axios.post('http://localhost:3001/api/auth/signup', { fullName, email, password });
       setMessage('Signup successfull');
      navigate('/');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed';
setMessage(` ${errorMsg}`);

    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2 style={{color:"white"}}>Sign UP</h2>

            <div style={{ display: 'flex', height:'30px', gap: '10px', marginBottom: '15px' }}>

      <input type="text" placeholder="fullName" value={fullName} onChange={(e) => setfullName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    
    </div> 
     <button type="submit">SIGNUP</button>
    </form>
  );
}

export default Signup;