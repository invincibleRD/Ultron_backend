import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import multer from "multer";
import fs from 'fs'
import { fileURLToPath } from "url";
import path,{ dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import requestRoutes from "./routes/request.js";
// import imageRoutes from "./routes/image.js";
import {requestHandler} from './controllers/requestFinal.js'
const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
  secret:  process.env.SESSION_SECRET || '2c74596242c4bdaa27e111f2adf65e0b00f4791242d91dfd37096c7a11850c9b',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 60000 
  }
}));
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
  // limits: { fileSize: 1024 * 1024 }
});

/*POST ROUTES WITH FILES*/
app.post('/request/upload',upload.single("image"),requestHandler);

/* ROUTES */
// app.use('/image',imageRoutes)
app.use("/request", requestRoutes);

/*GET IMAGE ROUTE*/

app.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "uploads", filename);
  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.status(404).send("File not found");
    } else {
      res.contentType("image/jpeg");
      res.send(data);
    }
  });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send("File upload error");
  } else if (err) {
    res.status(400).send(err.message);
  } else {
    next();
  }
});


const MONGODB_URI = process.env.MONGODB_URI|| `mongodb+srv://admin:Dikush@cluster0.nnh08zd.mongodb.net/METABRIX-ULTRON-DEV?retryWrites=true&w=majority`;
const PORT = 3001;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server port : ${PORT}`);
    })
  )
  .catch((error) => console.log(`${error} :DID NOT CONNECT`));

