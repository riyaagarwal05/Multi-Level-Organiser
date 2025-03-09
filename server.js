const express = require("express");
const db = require("./src/config/db");
const redis = require("./src/config/redis");
const logger = require("./src/utils/loggers")

const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();
const port = 3000;

app.use(express.json());

const startServer = async () => {
  await db.connectDB(); 
  await redis.connectRedis();
  app.use("/auth", authRoutes);
  app.use("/task", taskRoutes);

  app.listen(port, () => {
    //  console.log(`Server is running on http://localhost:${port}`);
    logger.info(`Server is running on http://localhost:${port}`);
  });
};

startServer();

process.on("SIGINT", async () => {
  await redis.disconnectRedis();
  process.exit(0);
});
