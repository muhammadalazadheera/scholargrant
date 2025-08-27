import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full md:w-[90%] mx-auto min-h-screen flex items-center justify-center p-6">
      <div className="w-full bg-base-200 shadow rounded-lg grid md:grid-cols-2 overflow-hidden">
        
        {/* Left Side - Form */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">Contact Us</h2>
          <p className="text-gray-600 mb-6 font-light">
            We’d love to hear from you. Fill out the form and we’ll get back to you soon.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary cursor-pointer text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              ✅ Thanks for reaching out! We’ll get back to you soon.
            </div>
          )}
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src="https://capitaleyenepal.com/assets/frontend/images/contact/1.png"
            alt="Contact"
            className="h-[500px] rounded-sm shadow object-cover"
          />
        </div>
      </div>
    </div>
  );
}
