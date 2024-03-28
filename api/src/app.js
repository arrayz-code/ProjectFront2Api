import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js "
import cookieParser from "cookie-parser";
import cors from "cors"
import productRoutes from "./routes/products.routes.js";
import { createRoles } from "./libs/initialSetup.js";





const app = express()


// Llamar a createRoles() una vez al iniciar la aplicación
createRoles();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use("/api", authRoutes)
export default app;


app.use("/api/products", productRoutes);