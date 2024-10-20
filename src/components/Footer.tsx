import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">IndiaTransit</h3>
            <p className="mt-2 text-sm">
              Decentralized transportation for a better India
            </p>
          </div>

          <div className="w-full md:w-1/3 text-center md:text-right">
            <p className="text-sm">
              &copy; 2024 IndiaTransit. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
