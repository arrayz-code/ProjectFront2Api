import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js "
import cookieParser from "cookie-parser";
import cors from "cors"
import productRoutes from "./routes/products.routes.js";
import { createRoles } from "./libs/initialSetup.js";
import { Resend } from 'resend';

const resend = new Resend('re_dm5Fm9PF_CU83b6RaFRmmrz5VPSHuMG5X');





const app = express()



// Llamar a createRoles() una vez al iniciar la aplicación
createRoles();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.post('/enviar-correo', async (req, res) => {
    try {
      // Envía el correo electrónico utilizando la instancia de Resend
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'arraizangel5@gmail.com',
        subject: 'Asunto del correo',
        html: '<p>Contenido del correo electrónico</p>'
      });
      
      // Envía una respuesta al cliente indicando que el correo electrónico se ha enviado correctamente
      res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      // Envía una respuesta de error al cliente si ocurre algún problema al enviar el correo electrónico
      res.status(500).json({ error: 'Ocurrió un error al enviar el correo electrónico' });
    }
  });
  

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use("/api", authRoutes)
export default app;


app.use("/api/products", productRoutes);