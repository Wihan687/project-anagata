import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

export const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Anagata Backend API Server is running.");
});

// Import controllers
import authRoutes from "./routes/auth";
import menuRoutes from "./routes/menus";
import orderRoutes from "./routes/orders";
import reservationRoutes from "./routes/reservations";
import settingRoutes from "./routes/settings";

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/settings", settingRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
