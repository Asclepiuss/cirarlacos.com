import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOURPASSWORD",
    database: "criarlacos_db",
    port: 3306
});

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});

