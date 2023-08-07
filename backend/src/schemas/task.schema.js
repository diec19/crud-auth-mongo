import {z} from "zod";

export const cretateTaskSchema = z.object({
    title:z.string({
        required_error: "Title is required",
    }),
    description: z.string({
        required_error:"Descripcion requierido",
    }),
    date:z.string().datetime().optional(),
})