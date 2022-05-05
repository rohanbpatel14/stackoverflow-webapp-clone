import redis from 'redis'

const REDIS_PORT = 6379;
const redis = redis.createClient(REDIS_PORT)

export default redis;