import express, {
  Request,
  Response
} from 'express'

export const clientsRoute = express.Router()

clientsRoute.post(
  '/',
  (req: Request, res: Response) => {
    res.status(500).send({
      error: 'Not implemented'
    })
  }
)
