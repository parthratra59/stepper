import express from "express";

const router = express.Router();

import createUser  from "../Controllers/User_Controller.js";


router.post("/createUser",createUser)


export default router;