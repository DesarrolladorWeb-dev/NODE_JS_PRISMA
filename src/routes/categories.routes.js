import { Router } from "express";
import {prisma} from "../db.js"

const router = Router();

router.get('/categories', async (req, res)=> {
    const categories = await prisma.category.findMany({
        include :{
            // para ver los productos que contiene la categoria mas informacion 
            // esto viene del modelo prisma en la relacion - es el nombre de la relacion
            products:true
        }
    })
    res.json(categories)
})

export default router;

