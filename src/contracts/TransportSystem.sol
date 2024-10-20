// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TransportSystem is ERC20, Ownable {
    struct Ride {
        address passenger;
        address driver;
        uint256 fare;
        string pickup;
        string destination;
        uint256 timestamp;
        bool completed;
    }

    struct PublicTransport {
        string routeNumber;
        string startLocation;
        string endLocation;
        uint256 fare;
    }

    mapping(uint256 => Ride) public rides;
    mapping(string => PublicTransport) public publicTransports;
    uint256 public rideCount;

    event RideCreated(uint256 indexed rideId, address indexed passenger, string pickup, string destination);
    event RideCompleted(uint256 indexed rideId, address indexed driver);
    event PublicTransportAdded(string indexed routeNumber, string startLocation, string endLocation, uint256 fare);

    constructor() ERC20("IndiaTransitToken", "ITT") {
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    function createRide(string memory _pickup, string memory _destination) external {
        rideCount++;
        rides[rideCount] = Ride({
            passenger: msg.sender,
            driver: address(0),
            fare: 0,
            pickup: _pickup,
            destination: _destination,
            timestamp: block.timestamp,
            completed: false
        });
        emit RideCreated(rideCount, msg.sender, _pickup, _destination);
    }

    function completeRide(uint256 _rideId) external {
        Ride storage ride = rides[_rideId];
        require(ride.driver == msg.sender, "Only the assigned driver can complete the ride");
        require(!ride.completed, "Ride already completed");

        ride.completed = true;
        transfer(ride.driver, ride.fare);
        emit RideCompleted(_rideId, msg.sender);
    }

    function addPublicTransport(string memory _routeNumber, string memory _startLocation, string memory _endLocation, uint256 _fare) external onlyOwner {
        publicTransports[_routeNumber] = PublicTransport({
            routeNumber: _routeNumber,
            startLocation: _startLocation,
            endLocation: _endLocation,
            fare: _fare
        });
        emit PublicTransportAdded(_routeNumber, _startLocation, _endLocation, _fare);
    }

    function bookPublicTransport(string memory _routeNumber) external {
        PublicTransport storage transport = publicTransports[_routeNumber];
        require(transport.fare > 0, "Invalid route number");
        require(balanceOf(msg.sender) >= transport.fare, "Insufficient balance");

        transfer(owner(), transport.fare);
    }
}