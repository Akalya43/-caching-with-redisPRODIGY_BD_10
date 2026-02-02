const redis = require('redis');
require('dotenv').config();
const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});
redisClient.connect()
    .then(() => console.log('Redis connected'))
    .catch(err => console.log('Redis connection error:', err));
module.exports = redisClient;
