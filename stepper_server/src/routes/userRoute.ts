import express from "express";
// Create a new router instance
const router = express.Router();

import createUser  from "../Controllers/User_Controller";

// Define a POST route to create a new user
// When a POST request is made to "/createUser", the createUser controller function is called
router.post("/createUser",createUser)

// Export the router to be used in other parts of the application
export default router;
