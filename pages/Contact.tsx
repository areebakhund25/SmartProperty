
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gray-900 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://picsum.photos/id/160/1920/600" alt="Contact BG" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Get in Touch</h1>
          <p className="text-blue-100 text-xl font-light">We are here to help you find your new home.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {[
              { icon: 'fa-phone-alt', title: 'Call Us', value: '+1 (555) 0123 4567', detail: 'Mon-Fri from 8am to 5pm' },
              { icon: 'fa-envelope', title: 'Email Support', value: 'hello@smartproperty.com', detail: 'We respond within 24 hours' },
              { icon: 'fa-map-marker-alt', title: 'Our Office', value: '123 Sky Tower, Downtown', detail: 'New York, NY 10001' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-xl">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-blue-600 font-bold mb-1">{item.value}</p>
                <p className="text-gray-400 text-sm font-medium">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 h-full">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-bounce-in">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 text-4xl">
                    <i className="fas fa-paper-plane"></i>
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Message Received!</h2>
                  <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
                    Thank you for reaching out. One of our team members will get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-blue-600 font-bold flex items-center hover:underline"
                  >
                    <i className="fas fa-arrow-left mr-2"></i> Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Send us a Message</h2>
                  <p className="text-gray-500 mb-10">Have questions? Fill out the form below and we'll get in touch.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">First Name</label>
                        <input 
                          type="text" 
                          required 
                          className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Last Name</label>
                        <input 
                          type="text" 
                          required 
                          className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Subject</label>
                      <select className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white">
                        <option>General Inquiry</option>
                        <option>Partnership Opportunities</option>
                        <option>Feedback</option>
                        <option>Property Listing Support</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Message</label>
                      <textarea 
                        required 
                        rows={6}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center text-lg"
                    >
                      Send Message
                      <i className="fas fa-paper-plane ml-3"></i>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
