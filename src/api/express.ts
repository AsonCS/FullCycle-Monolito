import express, { Express } from 'express'

import { productsRoute } from './routes/products/products.route'
import { checkoutRoute } from './routes/checkout.route'
import { clientsRoute } from './routes/clients/clients.route'
import { invoiceRoute } from './routes/invoice.route'
import { setupDb } from './sequelize'

export const app: Express = express()
app.use(express.json())
app.use('/checkout', checkoutRoute)
app.use('/clients', clientsRoute)
app.use('/invoice', invoiceRoute)
app.use('/products', productsRoute)

setupDb()
