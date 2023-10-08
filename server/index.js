import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import pbRouter from "./routes/pbRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.disable('x-powered-by'); // to hide the stack used.

// Router
app.use("/", pbRouter);

/** MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;

mongoose.Promise = global.Promise; 
mongoose
  .connect(
    process.env.MONGO_URL,
    // provide db name for connection
    {
      dbName: 'PhoneBook'
    },
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Starting Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} - Did not connect`));

