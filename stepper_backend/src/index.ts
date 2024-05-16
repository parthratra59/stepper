import express, { Request, Response} from "express";
import cors from "cors";
const app = express();

import dotenv from "dotenv";
import userRoute from "./routes/userRoute";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json({
  limit:"16kb"
}));



app.use(cors(
  {
    origin: ["https://stepper-17611.web.app/","http://localhost:5173"],
    credentials: true,
   
  }
))
app.use(express.urlencoded({ extended:false}))

app.use("/api/v1/users",userRoute)

app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
