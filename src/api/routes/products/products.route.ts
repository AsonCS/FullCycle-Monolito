import { Router } from 'express'
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/facade.factory'
import { handler } from '..'

const productAdm =
  ProductAdmFacadeFactory.create()
export const productsRoute = Router()

productsRoute.get(
  '/',
  handler(async (_, res) => {
    res.send(await productAdm.findAll())
  })
)

productsRoute.post(
  '/',
  handler(async (req, res) => {
    await productAdm.addProduct(req.body)
    res.sendStatus(204)
  })
)
