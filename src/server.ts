import app from "./app";
// import { connectDB } from "./app/config/database";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

// Connect to DB and start server
const startServer = async () => {
  try {
    // await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
  }
};

startServer();
