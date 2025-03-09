const { MongoClient } = require("mongodb");
const logger = require("../utils/loggers");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let dbInstance;

async function connectDB() {
  try {
    await client.connect();
    //console.log("Connected to MongoDB");
    logger.info(`Connected to MongoDB`);
    dbInstance = client.db("taskManager");
  } catch (error) {
    // console.error("MongoDB Connection Error", error);
    logger.error(`MongoDB Connection Error: ${error}`);
    process.exit(1); 
  }
}

const getDB = () => {
  if (!dbInstance) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return dbInstance;
};

module.exports = { connectDB, getDB };
