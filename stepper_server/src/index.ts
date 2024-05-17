import express, { Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
import userRoute from "./routes/userRoute";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json({
  limit:"16kb"
}));



app.use(cors(
  {
    origin: ["https://paymentstepper.netlify.app/"],
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
