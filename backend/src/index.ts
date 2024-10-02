import express, { Request, Response } from "express";
import cors from "cors";
import scheduleRoutes from "./app/routes/scheduleRoutes";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/schedules', scheduleRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});