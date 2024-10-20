import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Car, Wallet } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Bus className="mr-2" /> IndiaTransit
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/ridesharing" className="flex items-center hover:text-blue-200">
                <Car className="mr-1" /> Ridesharing
              </Link>
            </li>
            <li>
              <Link to="/public-transport" className="flex items-center hover:text-blue-200">
                <Bus className="mr-1" /> Public Transport
              </Link>
            </li>
            <li>
              <Link to="/wallet" className="flex items-center hover:text-blue-200">
                <Wallet className="mr-1" /> Wallet
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;