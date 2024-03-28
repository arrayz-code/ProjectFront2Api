import { z } from "zod"


//Validacion del Registro
export const registerSchema = z.object({

    username: z.string({

        required_error: "Nombre de Usuario es Requerido "
    }),

    email: z.string({

        required_error: "Email es requerido "
    }).email({
        message: "Email Invalido"
    }),

    password: z.string({

        required_error: "Contraseña requerida "
    }).min(6, {
        message: "Contraseña debe contener minimo 6 caracteres"
    })

})

//Validacion de Login

export const loginSchema = z.object({

    email: z.string({
        required_error: "Email es requerido"
    }).email({
        message: "Email invalido"
    }), 
    password: z.string({
        required_error: "Constraseña es requerida "
    }).min(6, {
        message: "Contraseña debe contener minimo 6 caracteres"
    }),





})