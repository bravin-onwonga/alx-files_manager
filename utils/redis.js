const redis = require("redis");

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => console.log(err));
    this.client.connect();
  }

  async isAlive() {
    try {
      await this.client.ping();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.error(err);
    }
  }

  async set(key, value, duration) {
    try {
      setTimeout(async () => {
        await this.client.set(key, value);
      }, duration);
    } catch (err) {
      console.error(err);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(err);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
