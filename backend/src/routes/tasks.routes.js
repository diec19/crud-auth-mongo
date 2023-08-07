import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js'
import { 
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,



} from "../controllers/tasks.controller.js";
import {validateSchema} from '../middlewares/validator.middlewares.js'
import {cretateTaskSchema} from '../schemas/task.schema.js'

const router = Router()

router.get('/tasks',authRequired,getTasks)
router.post('/tasks',authRequired,validateSchema(cretateTaskSchema),createTask)
router.get('/tasks/:id',authRequired,getTask)
router.delete('/tasks/:id',authRequired,deleteTask)
router.put('/tasks/:id',authRequired,updateTask)

export default router

