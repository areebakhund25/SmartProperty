
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'agent'>('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError("Authentication service is unavailable.");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      if (mode === 'register') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              role: role,
            },
          },
        });
        if (signUpError) throw signUpError;
        alert("Check your email for the confirmation link!");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || String(err) || "An unexpected authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-zoom-in">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-10 text-center text-white">
          <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
          <h2 className="text-3xl font-extrabold mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join SmartProperty'}
          </h2>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                  <input 
                    type="text" required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Register As</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      type="button"
                      onClick={() => setRole('user')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${role === 'user' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white text-gray-400'}`}
                    >
                      Buyer/Renter
                    </button>
                    <button 
                      type="button"
                      onClick={() => setRole('agent')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${role === 'agent' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white text-gray-400'}`}
                    >
                      Agent
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
              <input 
                type="email" required 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Password</label>
              <input 
                type="password" required 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-xl transition-all mt-4 disabled:opacity-50"
            >
              {loading ? <i className="fas fa-spinner fa-spin"></i> : (mode === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="ml-2 text-blue-600 font-bold hover:underline"
              >
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
