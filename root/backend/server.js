import express from "express";
import cors from "cors";
import mysql from "mysql2";
import authRoutes from "./routes/auth.js";
import activitiesRoutes from "./routes/activities.js";
import e from "express";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "criarlacos_db",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Error:", err);
    } else {
        console.log("✅ Connected to MySQL");
    }
});

app.use(cors());
app.use(express.json());
app.use(express.static("../public"));

// expose db to all routes
app.set("db", db);

// ROUTES
app.use("/auth", authRoutes);
app.use("/api/activities", activitiesRoutes);

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
export { db };