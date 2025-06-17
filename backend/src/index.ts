import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authMiddleware } from "./middleware/authMiddleware";
import userRoutes from "./routes/userRoutes";
import chatRouter from "./routes/chat";
import psychologistsRoutes from "./routes/psychologistsRoutes";
import availabilityRoutes from "./routes/availabilityRoutes";
import syncRoleRoutes from "./routes/syncRoleRoutes";
import appointmentRoutes from "./routes/appointmentRoutes"
/* KONFIGURACJA */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* TRASY  */
app.use("/clients", userRoutes);
app.use("/psychologists", psychologistsRoutes);
app.use("/availabilities", availabilityRoutes);
app.use("/sync-role", syncRoleRoutes);
app.use("/appointments", appointmentRoutes);
/* SERWER */
app.use('/api', chatRouter);

const port = Number(process.env.PORT);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});