import { useState } from "react";

export default function MailSubscription() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full flex items-center justify-center bg-base-200 p-6">
      <div className="max-w-4xl w-full bg-base-100 rounded-sm shadow overflow-hidden grid md:grid-cols-2">
        <div className="hidden md:flex justify-center items-center py-5">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/014/440/980/small_2x/email-message-icon-design-in-blue-circle-png.png"
            alt="Newsletter"
            className="w-[80%]"
          />
        </div>

        {/* Right Side - Subscription Form */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Get the latest updates, articles, and exclusive offers straight to your inbox.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-sm font-medium cursor-pointer transition"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
              🎉 Thanks for subscribing! Please check your inbox.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
