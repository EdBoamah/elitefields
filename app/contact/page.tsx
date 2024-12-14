'use client';

import React, { useState } from 'react';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    const whatsappMessage = `Hello, my name is ${name}. Email: ${email}, Phone: ${phone}. Message: ${message}`;
    const whatsappUrl = `https://wa.me/233506632349?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>

      {/* Contact Form */}
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">We'd love to hear from you!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Your Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-600">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send via WhatsApp
          </button>
        </form>
      </div>

      {/* Social Media Links */}
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Follow Us on Social Media</h2>
        <div className="flex justify-center space-x-6">
          
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all">
              <FaInstagram className="w-8 h-8 text-white" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
