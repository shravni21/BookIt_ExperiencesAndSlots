import express from "express";
import cors from "cors";
import { sequelize } from "./models"; // import from index.ts
import bookingRoutes from "./routes/bookingRoutes";
import promoRoutes from "./routes/promoRoutes";
import experienceRoutes from "./routes/experienceRoutes";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // your Vite frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('BookIt backend running'));
app.use("/api/bookings", bookingRoutes);
app.use("/api/promos", promoRoutes);
app.use("/api/experiences", experienceRoutes);

// Start server and sync DB
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true }); // auto-create tables and relationships
    console.log(`✅ Server running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Database sync error:", error);
  }
});
