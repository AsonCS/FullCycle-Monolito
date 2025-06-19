import express, {
  Request,
  Response
} from 'express'

export const checkoutRoute = express.Router()

checkoutRoute.post(
  '/',
  (req: Request, res: Response) => {
    res.status(500).send({
      error: 'Not implemented'
    })
  }
)
