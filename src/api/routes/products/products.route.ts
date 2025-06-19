import express, {
  Request,
  Response
} from 'express'
import StoreCatalogFacadeFactory from '../../../modules/store-catalog/factory/facade.factory'
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/facade.factory'
import { handler } from '..'

const storeCatalog =
  StoreCatalogFacadeFactory.create()
const productAdm =
  ProductAdmFacadeFactory.create()
export const productsRoute = express.Router()

productsRoute.get(
  '/',
  handler(async (req, res) => {
    const products = await storeCatalog.findAll()
    res.send(products)
  })
)

productsRoute.post(
  '/',
  handler(async (req, res) => {
    productAdm.addProduct(req.body)
  })
)
