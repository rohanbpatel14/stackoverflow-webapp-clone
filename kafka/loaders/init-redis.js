import { createClient } from 'redis';

// const redisClient = createClient();

// For connecting to redis client on specific host and port
const redisClient = createClient({
    url: 'redis://:Hgh9JCzgTUkXOFa4xtgjApcUhxfOzvEL@redis-19768.c289.us-west-1-2.ec2.cloud.redislabs.com:19768'
});
// connection string format : redis[s]://[[username][:password]@][host][:port][/db-number]

redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect();
await redisClient.set('test', 'Connected to Redis');

export default redisClient;