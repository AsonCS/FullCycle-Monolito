import { Router } from 'express'
import { handler } from '..'
import CheckoutFacadeFactory from '../../../modules/checkout/factory/facade.factory'

const checkout = CheckoutFacadeFactory.create()
export const checkoutRoute = Router()

checkoutRoute.get(
  '/',
  handler(async (_, res) => {
    res.send(await checkout.findAll())
  })
)

checkoutRoute.post(
  '/',
  handler(async (req, res) => {
    await checkout.placeOrder(req.body)
    res.sendStatus(204)
  })
)
