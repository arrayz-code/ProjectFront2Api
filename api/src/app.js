import express from "express";
import morgan from "morgan";
import { createRoles } from "./libs/initialSetup.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Resend } from 'resend'; // Importa Resend desde la ruta correcta
import enviarCorreo from "./routes/sendEmail.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";

const app = express();




app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.post('/enviar-correo', enviarCorreo);
app.use(morgan("dev"));

app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api/products", productRoutes);

export default app;
