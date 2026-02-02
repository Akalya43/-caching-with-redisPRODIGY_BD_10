**API Performance Optimization using Redis Caching**
This project demonstrates how to optimize API performance by integrating Redis caching with a Node.js, Express, and MongoDB backend.
The APIs are tested using Thunder Client, and performance improvements are measured before and after caching.

**Features**
1)Redis caching for frequently accessed endpoints
2) Cache invalidation on update and delete operations
3) Cache expiration (TTL) to ensure fresh data
4) Performance comparison (MongoDB vs Redis)
5) API testing using Thunder Client with proper HTTP status codes.

**Tech Stack**
Backend: Node.js, Express.js
Database: MongoDB
Caching: Redis
API Testing: Thunder Client
Environment Variables: dotenv.

**Project structure**
TASK4
│
├── cache/
│   └── redisClient.js
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── package
├── server.js
├── .env
├── package.json
└── node modules/

**RUN**
Run the server
node server.js

**server output**
MongoDB connected
Redis connected
Server running on port 5000

**Performance Improvement**
Source	Approx Response Time
MongoDB	200–500 ms
Redis	5–20 ms

