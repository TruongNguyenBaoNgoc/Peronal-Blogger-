import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailPassword, sendMagicLink } from '../services/authService';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const loginEmailPass = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signInWithEmailPassword(email, password);
    setLoading(false);
    if (error) {
      setStatus(error.message);
    } else {
      navigate('/admin');
    }
  };

  const loginMagic = async () => {
    setLoading(true);
    const { error } = await sendMagicLink(email);
    setLoading(false);
    setStatus(error ? error.message : 'Magic link đã gửi. Kiểm tra email của bạn.');
  };

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Đăng nhập Admin</h2>
        <form onSubmit={loginEmailPass} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-xl"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            className="w-full px-4 py-3 border rounded-xl"
          />
          <button type="submit" disabled={loading} className="w-full py-3 bg-[#9DE0E5] text-white rounded-xl font-bold">
            {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
          </button>
        </form>
        <div className="mt-4">
          <button onClick={loginMagic} disabled={loading} className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold">
            Gửi Magic Link
          </button>
        </div>
        {status && <p className="mt-4 text-sm text-slate-500">{status}</p>}
      </div>
    </div>
  );
};

export default Login;
