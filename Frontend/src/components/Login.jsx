import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
       setMessage('');
    try {

      const res = await axios.post('http://localhost:3001/api/auth/login', { email, password });
     
      localStorage.setItem('token', res.data.token);
       setMessage('Login successfull');
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
setMessage(`${errorMsg}`);

    }
  };

  return (
    <form onSubmit={handleSubmit}>
     <h2 style={{ color: "white" }}>Login</h2>

      <div style={{ display: 'flex', height:'30px', gap: '10px', marginBottom: '15px' }}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
export default Login;