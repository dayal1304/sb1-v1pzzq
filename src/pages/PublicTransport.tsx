import React, { useState } from 'react';
import { MapPin, Search, CheckCircle } from 'lucide-react';

const PublicTransport: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [routes, setRoutes] = useState<string[]>([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement public transport route fetching from smart contract
    // For now, we'll use dummy data
    setRoutes([
      'Bus 101 - Departure: 10:00 AM, Arrival: 10:45 AM',
      'Metro Line 2 - Departure: 10:15 AM, Arrival: 10:55 AM',
      'Bus 205 - Departure: 10:30 AM, Arrival: 11:15 AM',
    ]);
  };

  const handleBooking = (route: string) => {
    // TODO: Implement booking logic with smart contract interaction
    console.log('Booking route:', route);
    setSelectedRoute(route);
    setBookingConfirmed(true);
    // Hide the confirmation message after 5 seconds
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedRoute(null);
    }, 5000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Public Transport</h2>
      {bookingConfirmed && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md flex items-center">
          <CheckCircle className="mr-2" />
          Booking Successful! Your trip on {selectedRoute} has been confirmed.
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <div className="relative">
              <MapPin className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter starting point"
                required
              />
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <div className="relative">
              <MapPin className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter destination"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <Search className="inline-block mr-2" />
          Find Routes
        </button>
      </form>

      {routes.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Available Routes:</h3>
          <ul className="space-y-4">
            {routes.map((route, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <p className="text-lg font-medium">{route}</p>
                <button
                  onClick={() => handleBooking(route)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Book
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PublicTransport;