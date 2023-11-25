import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.router.js";
import notesRoutes from "./routes/notes.router.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerOptions.js";

dotenv.config();
const app = express();

// API documentation using Swagger
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", notesRoutes);

// Starting Express Server
const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Backend Server started on http://localhost:${port}`)
);
