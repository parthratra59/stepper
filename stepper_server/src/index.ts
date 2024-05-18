import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Initialize express application
const app = express();

// Import user routes
import userRoute from "./routes/userRoute";

// Load environment variables from .env file
dotenv.config();

// Define the port to run the server on, default to 3000 if not specified in environment variables
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies with a size limit of 16kb
app.use(express.json({
  limit: "16kb"
}));

// Define CORS options to restrict access to a specific origin and allow certain methods and headers

// for locally -> origin: http://localhost:5173
const corsOptions = {
  origin: "https://paymentstepper.netlify.app",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
};

// Middleware to parse URL-encoded bodies with extended option set to false
app.use(express.urlencoded({ extended: false }));

// Apply CORS options and user routes to the specified path
app.use("/api/v1/users", cors(corsOptions), userRoute);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define a simple GET route for the root path
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
