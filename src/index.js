import express from "express"
// Se utiliza al final js porque son creados por nosotros
import productsRoutes from './routes/products.routes.js'
import categoriesRoutes from './routes/categories.routes.js'

const app = express()

app.use(express.json())

app.use('/api', categoriesRoutes)
app.use('/api', productsRoutes)
app.listen(3000)
console.log("Server en el puerto", 3000)