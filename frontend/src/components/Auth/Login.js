import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // MOCK login logic (replace with API call)
    let role = null;
    if(email === 'student@test.com') role = 'student';
    else if(email === 'lecturer@test.com') role = 'lecturer';
    else if(email === 'prl@test.com') role = 'prl';
    else if(email === 'pl@test.com') role = 'pl';
    else return alert('Invalid user');

    onLogin({ email, role }); // set user in App
    navigate('/dashboard');  // go to dashboard
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
