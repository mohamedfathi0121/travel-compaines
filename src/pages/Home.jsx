import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.webp"; // Update with appropriate hero image

export default function Home() {
  const features = [
    {
      icon: "🏢",
      title: "For Travel Companies",
      description:
        "Easily publish and manage your travel packages to reach more customers.",
    },
    {
      icon: "📊",
      title: "Business Analytics",
      description:
        "Track bookings, revenue, and customer engagement with detailed insights.",
    },
    {
      icon: "🤝",
      title: "Partner Network",
      description:
        "Join our network of trusted travel companies and expand your business reach.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[calc(100vh-64px)] flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Grow Your Travel Business
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10">
            Connect with travelers worldwide and expand your company's reach
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/company/register"
              className="bg-button-primary hover:bg-btn-primary-hover text-button-text font-bold py-4 px-10 rounded-full transition duration-300"
            >
              List Your Company
            </Link>
            <Link
              to="/pricing"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-10 rounded-full transition duration-300"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b">
        <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
            <p className="text-gray-600">Travel Companies</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2">10K+</h3>
            <p className="text-gray-600">Monthly Bookings</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2">50K+</h3>
            <p className="text-gray-600">Happy Travelers</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 max-w-screen-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why List Your Company With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105"
            >
              <div className="text-6xl text-button-primary mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-text-secondary text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Expand Your Travel Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our platform and start reaching more customers today.
          </p>
          <Link
            to="/company/register"
            className="bg-white text-primary hover:bg-gray-100 font-bold py-4 px-10 rounded-full transition duration-300 inline-block"
          >
            Register Your Company
          </Link>
        </div>
      </section>
    </div>
  );
}
