import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';
//import { cn } from '../lib/utils';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('ACCESS GRANTED. PROCEED WITH PURPOSE.');
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000); // waits 2000 milliseconds before navigating
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-xs font-mono tracking-[0.2em] text-lumon-neon mb-2">
          IDENTIFICATION
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 font-mono text-sm focus:outline-none"
          placeholder="ENTER EMAIL"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-mono tracking-[0.2em] text-lumon-neon mb-2">
          SECURITY CODE
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 font-mono text-sm focus:outline-none pr-10"
            placeholder="ENTER CODE"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-lumon-neon/50 hover:text-lumon-neon"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="text-xs font-mono tracking-wider text-lumon-neon bg-lumon-neon/5 p-4 border border-lumon-neon/20 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-3 flex-shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-lumon-neon/10 hover:bg-lumon-neon/20 text-lumon-neon border border-lumon-neon/30 
        font-mono text-sm tracking-[0.2em] py-3 transition-all duration-300 relative group"
      >
        <span className="absolute inset-0 bg-lumon-neon/0 group-hover:bg-lumon-neon/5 transition-all duration-300"></span>
        AUTHENTICATE
      </button>

      <div className="flex items-center justify-between pt-4 border-t border-lumon-neon/10">
        <Link 
          to="/forgot-password" 
          className="text-[10px] font-mono tracking-[0.2em] text-lumon-blue hover:text-lumon-neon transition-colors duration-300"
        >
          RESET ACCESS
        </Link>
        <Link 
          to="/register" 
          className="text-[10px] font-mono tracking-[0.2em] text-lumon-blue hover:text-lumon-neon transition-colors duration-300"
        >
          REQUEST ACCESS
        </Link>
      </div>
    </form>
  );
};

export default Login;