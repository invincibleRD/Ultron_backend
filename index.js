import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
const app = express();
import requestRoutes from "./routes/request.js";

app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 60000 
  }
}));
// app.use(session(sessionOptions));

/* ROUTES */

app.use("/request", requestRoutes);


const MONGO_URI = process.env.MONGO_URI;
const PORT = 3001;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server port : ${PORT}`);
    })
  )
  .catch((error) => console.log(`${error} :DID NOT CONNECT`));

