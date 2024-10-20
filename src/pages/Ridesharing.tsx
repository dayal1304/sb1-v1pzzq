import React, { useState } from 'react';
import { MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';

const Ridesharing: React.FC = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement ride booking logic with smart contract interaction
    console.log('Booking ride:', { pickup, destination, date, time });
    // Simulate a successful booking
    setBookingConfirmed(true);
    // Reset the form
    setPickup('');
    setDestination('');
    setDate('');
    setTime('');
    // Hide the confirmation message after 5 seconds
    setTimeout(() => setBookingConfirmed(false), 5000);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Book a Ride</h2>
      {bookingConfirmed && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md flex items-center">
          <CheckCircle className="mr-2" />
          Booking Successful! Your ride has been confirmed.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
          <div className="relative">
            <MapPin className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              id="pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter pickup location"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
          <div className="relative">
            <MapPin className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter destination"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <Calendar className="absolute top-3 left-3 text-gray-400" />
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
          <div className="relative">
            <Clock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Book Ride
        </button>
      </form>
    </div>
  );
};

export default Ridesharing;