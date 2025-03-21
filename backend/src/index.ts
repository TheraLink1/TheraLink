import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";



/* KONFIGURACJA */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

/* TRASY  */
app.get("/", (req,res)=>{
    res.send("Home route")
});

/* SERWER*/

const port = Number(process.env.PORT) || 3002;
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
