
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { apiService } from './apiService';
import { User } from './types';
import Home from './pages/Home';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        handleSetUser(session.user);
      }
      setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        handleSetUser(session.user);
      } else {
        setUser(null);
        setFavorites([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSetUser = async (supabaseUser: any) => {
    const role = supabaseUser.user_metadata?.role || 'user';
    const mappedUser: User = {
      id: supabaseUser.id,
      name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0],
      email: supabaseUser.email || '',
      role: role,
      favorites: []
    };
    setUser(mappedUser);
    
    // Fetch real favorites from DB
    const favIds = await apiService.getUserFavorites(supabaseUser.id);
    setFavorites(favIds);
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
  };

  const toggleFavorite = async (propertyId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      await apiService.toggleFavorite(user.id, propertyId);
      const favIds = await apiService.getUserFavorites(user.id);
      setFavorites(favIds);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="text-blue-600 animate-bounce text-4xl">
        <i className="fas fa-home"></i>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {!supabase && (
          <div className="bg-amber-100 border-b border-amber-200 px-4 py-2 text-center text-amber-800 text-xs font-bold">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Database connection missing. Using limited offline mode. Login and favorites are disabled.
          </div>
        )}
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
          onOpenAuth={() => setShowAuthModal(true)} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home favorites={favorites} onToggleFavorite={toggleFavorite} />} />
            <Route path="/properties" element={<Listings favorites={favorites} onToggleFavorite={toggleFavorite} />} />
            <Route path="/property/:id" element={<PropertyDetail favorites={favorites} onToggleFavorite={toggleFavorite} user={user} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />

        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    </Router>
  );
};

export default App;
