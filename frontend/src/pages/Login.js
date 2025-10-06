import React, { useState } from 'react';
import api from '../api';

export default function Login({ onLogin }) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { emailOrUsername, password });
      onLogin(res.data.user, res.data.token);
    } catch (err) {
      setErr(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth:420 }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Email or username" value={emailOrUsername} onChange={e=>setEmailOrUsername(e.target.value)} /></div>
        <div><input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button>Login</button>
        {err && <div style={{ color:'red' }}>{err}</div>}
      </form>
    </div>
  );
}
