
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-2">
                <i className="fas fa-home text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold text-white">SmartProperty</span>
            </Link>
            <p className="text-gray-400 leading-relaxed font-light">
              Elevating the real estate experience with cutting-edge technology and human-centric design. Find your future today.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Services', 'Our Agents', 'Careers', 'Contact'].map(link => (
                <li key={link}>
                  <Link to="#" className="text-gray-400 hover:text-blue-500 transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Discover</h4>
            <ul className="space-y-4">
              {['Properties', 'Plots', 'Apartments', 'Villas', 'Commercial'].map(link => (
                <li key={link}>
                  <Link to="/properties" className="text-gray-400 hover:text-blue-500 transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Newsletter</h4>
            <p className="text-gray-400 mb-6 font-light">Subscribe to get the latest property alerts and market news.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-gray-800 border-none rounded-xl py-4 pl-4 pr-12 text-white focus:ring-2 focus:ring-blue-600"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition-colors">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
          <p>© 2024 SmartProperty Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-500">Privacy Policy</a>
            <a href="#" className="hover:text-blue-500">Terms of Service</a>
            <a href="#" className="hover:text-blue-500">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
