import { createClient } from 'redis';

const redisClient = createClient();

// For connecting to redis client on specific host and port
// const redisClient = createClient({
//     url: 'redis://alice:foobared@awesome.redis.server:6380'
//   });
// connection string format : redis[s]://[[username][:password]@][host][:port][/db-number]

redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect();
await redisClient.set('key-val', 'key-value');

export default redisClient;