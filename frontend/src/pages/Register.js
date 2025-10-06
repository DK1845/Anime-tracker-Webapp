import React, { useState } from 'react';
import api from '../api';

export default function Register({ onRegister }) {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { username, email, password });
      onRegister(res.data.user, res.data.token);
    } catch (err) {
      setErr(err.response?.data?.msg || 'Register failed');
    }
  };

  return (
    <div style={{ maxWidth:420 }}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} /></div>
        <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button>Register</button>
        {err && <div style={{ color:'red' }}>{err}</div>}
      </form>
    </div>
  );
}
