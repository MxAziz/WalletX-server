import app from "./app";
import { connectDB } from "./app/config/database";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

// Connect to DB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
  }
};

startServer();



// server error handler
// ===================== signal termination / sigterm =====================
process.on("SIGTERM", () => {
    console.log("SIGTERM signal received-- server shutting down...");

    if (server) {
        server.close(() => {
            process.exit(1);
        });
        process.exit(1);
    }
})

// ===================== SIGINT =====================
// amora manual e server bondho korle ai function trigger hobe
process.on("SIGINT", () => {
    console.log("SIGINT signal received-- server shutting down...");

    if (server) {
        server.close(() => {
            process.exit(1);
        });
        process.exit(1);
    }
})

// ===================== unhandled rejection error =====================
// ata promise ar sathe connected
process.on("unhandledRejection", (err) => {
    console.log("unhandled rejection detected-- server shutting down...", err);

    if (server) {
        server.close(() => {
            process.exit(1);
        });
        process.exit(1);
    }
})
// promise.reject(new Error("forgot to catch this promise"))


// ===================== uncaught rejection error =====================
// local kono problem-- jeta try-catch diye handle kora hoi ni (development code)
process.on("uncaughtException", (err) => {
    console.log("uncaught exception detected-- server shutting down...", err);

    if (server) {
        server.close(() => {
            process.exit(1);
        });
        process.exit(1);
    }
})
// throw new Error("forgot to handle this local error");