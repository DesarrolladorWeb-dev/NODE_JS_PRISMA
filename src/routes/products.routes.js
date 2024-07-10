import { Router } from "express";
import {prisma} from "../db.js"
// Nos conectamos a la base de dato directamente


const router = Router();


router.get('/products', async (req, res)=> {
    // todos los productos 
    const products = await prisma.product.findMany()
    res.json(products)
    // res.send('products')
})
router.get('/products/:id', async (req,res) => {
    console.log(typeof req.params.id) // veremos que es de tipo string
    // solo busca uno
    const productFound = await prisma.product.findFirst({
        where:{
            // debemos parcearlo a entero
            id: parseInt(req.params.id)
        },
        // para ver el Modelo realcionado con mas informacion
        include:{
            // esto viene del modelo prisma en la relacion - es el nombre de la relacion
            category: true
        }
    });
    if (!productFound) return res.status(404).json({error: "Product not found"})

    // nos dara solo un producto
    return res.json(productFound)
})

router.post ('/products', async(req,res)=> {
    const newProduct = await prisma.product.create({
        data:req.body
    })
    res.json(newProduct)
})

router.delete('/products/:id', async (req,res) => {
    console.log(typeof req.params.id) // veremos que es de tipo string
    // solo busca uno
    const productDeleted = await prisma.product.delete({
        where:{
            // debemos parcearlo a entero
            id: parseInt(req.params.id)
        }
    });
    if (!productDeleted) return res.status(404).json({error: "No se elimino"})

    // nos dara solo un producto
    return res.json(productDeleted)
})

router.put('/products/:id', async (req, res) => {
    const productUpdate = await prisma.product.update({
        where: {
            id: parseInt(req.params.id)
        },
        // los datos que le envio
        data: req.body 
    })
    return res.json(productUpdate)
})

export default router