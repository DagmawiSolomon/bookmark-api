import { createClient } from 'redis';

export const reidsClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD!,
    socket: {
        host: process.env.REDIS_HOST!,
        port: Number(process.env.REDIS_PORT)!
    }
});


reidsClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});
