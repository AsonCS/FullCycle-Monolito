import express, {
  Request,
  Response
} from 'express'

export const invoiceRoute = express.Router()

invoiceRoute.get(
  '/:id',
  (req: Request, res: Response) => {
    res.status(500).send({
      error: 'Not implemented'
    })
  }
)
