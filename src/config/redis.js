const redis = require("redis");
const logger = require("../utils/loggers");

const client = redis.createClient({
  url: "redis://localhost:6379",
});

client.on("connect", () => logger.info(`Connected to Redis`));
client.on("error", (err) => logger.error(`Redis Connection Error: ${err}`));

const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

const disconnectRedis = async () => {
  if (client.isOpen) {
    await client.quit();
    // console.log("Redis is Closed");
    logger.info(`Redis is Closed`);
  }
};

module.exports = {
  connectRedis,
  getClient: () => client,
  disconnectRedis,
};


