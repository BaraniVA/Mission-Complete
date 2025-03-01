import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';
//import { cn } from '../lib/utils';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: 'MDR',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('ACCESS REQUEST PENDING APPROVAL FROM LUMON INDUSTRIES.');
    setTimeout(() => {
      navigate('/login');
    }, 2000); // waits 2000 milliseconds before navigating
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-xs font-mono tracking-[0.2em] text-lumon-neon mb-2">
          EMPLOYEE DESIGNATION
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 font-mono text-sm focus:outline-none"
          placeholder="ENTER FULL NAME"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-mono tracking-[0.2em] text-lumon-neon mb-2">
          IDENTIFICATION CODE
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 font-mono text-sm focus:outline-none"
          placeholder="ENTER EMAIL"
        />
      </div>

      <div>
        <label htmlFor="department" className="block text-xs font-mono tracking-[0.2em] text-lumon-neon mb-2">
          DEPARTMENT ASSIGNMENT
        </label>
        <select
          id="department"
          required
          value={formData.department}
          onChange={handleChange}
          className="w-full px-3 py-2 font-mono text-sm focus:outline-none"
        >
          <option value="MDR">MACRODATA REFINEMENT</option>
          <option value="O&D">OPTICS & DESIGN</option>
          <option value="R&D">RESEARCH & DEVELOPMENT</option>
        </select>
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-mono tracking-[0.2em] text-lumon-neon mb-2">
          SECURITY PROTOCOL
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 font-mono text-sm focus:outline-none pr-10"
            placeholder="ENTER PASSWORD"
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

      <div>
        <label htmlFor="confirmPassword" className="block text-xs font-mono tracking-[0.2em] text-lumon-neon mb-2">
          VERIFY SECURITY PROTOCOL
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 font-mono text-sm focus:outline-none pr-10"
            placeholder="CONFIRM PASSWORD"
          />
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
        INITIATE REGISTRATION
      </button>

      <div className="text-center pt-4 border-t border-lumon-neon/10">
        <Link 
          to="/login" 
          className="text-[10px] font-mono tracking-[0.2em] text-lumon-blue hover:text-lumon-neon transition-colors duration-300"
        >
          RETURN TO AUTHENTICATION TERMINAL
        </Link>
      </div>
    </form>
  );
};

export default Register;