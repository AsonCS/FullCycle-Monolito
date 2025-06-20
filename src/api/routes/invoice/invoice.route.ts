import { Router } from 'express'
import { handler } from '..'
import InvoiceFacadeFactory from '../../../modules/invoice/factory/facade.factory'

const invoice = InvoiceFacadeFactory.create()
export const invoiceRoute = Router()

invoiceRoute.get(
  '/',
  handler(async (_, res) => {
    res.send(await invoice.findAllInvoices())
  })
)

invoiceRoute.get(
  '/:id',
  handler(async (req, res) => {
    res.send(
      await invoice.findInvoice({
        id: req.params.id
      })
    )
  })
)

invoiceRoute.post(
  '/',
  handler(async (req, res) => {
    await invoice.generateInvoice(req.body)
    res.sendStatus(204)
  })
)
