import { config } from "dotenv";
import * as http from "http";
import { connectToDatabase } from "./database/mongo"; // Adjust path if needed
import app from "./app";
config(); // This should be the first thing to run

const startServer = async () => {
  try {
    await connectToDatabase();
    const server = http.createServer(app);

    server.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  } catch (error) {
    console.error("Failed to start the server", error);
  }
};

startServer();
