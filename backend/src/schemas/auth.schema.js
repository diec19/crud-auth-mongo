import {z} from 'zod'

export const registerSchema= z.object({
    username: z.string({
        required_error:'Usuario es requerido'
    }),
    email: z.string({
        required_error: 'Email es reuqerido',
    }),
    password: z.string({
        required_error: "Contraseña es requerido",
    })
    .min(6,{
        message: "Password debe tener mas de 6 caracteres",
    })
})

export const loginSchema= z.object({
    email: z.string({
        required_error:"Email es obligatorio"
    })
    .email({
        message:"Email no es valido",
    }),
    password: z
    .string({
        required_error: "Contraseña es requerida",
    })
    .min(6,{
        message: "El password debe tener un minimo de 6 caracteres",
    })
})