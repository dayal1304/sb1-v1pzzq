import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Shield } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to IndiaTransit</h1>
      <p className="text-xl mb-8">Revolutionizing urban transportation in India with blockchain technology</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<MapPin className="w-12 h-12 text-blue-500" />}
          title="Efficient Routing"
          description="Optimize your travel with AI-powered route suggestions"
        />
        <FeatureCard
          icon={<Clock className="w-12 h-12 text-green-500" />}
          title="Real-time Updates"
          description="Stay informed with live traffic and public transport updates"
        />
        <FeatureCard
          icon={<Shield className="w-12 h-12 text-red-500" />}
          title="Secure Payments"
          description="Transact safely with our blockchain-based payment system"
        />
      </div>
      
      <div className="space-x-4">
        <Link to="/ridesharing" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Book a Ride
        </Link>
        <Link to="/public-transport" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300">
          Check Public Transport
        </Link>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;