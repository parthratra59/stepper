import express from "express";

const router = express.Router();

import createUser  from "../Controllers/User_Controller";


router.post("/createUser",createUser)


export default router;