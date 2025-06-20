import { Request, Response } from 'express'

export function handler(
  handler: (
    req: Request,
    res: Response
  ) => Promise<void>
): (
  req: Request,
  res: Response
) => Promise<void> {
  return async (req, res) => {
    try {
      await handler(req, res)
    } catch (err: any) {
      //console.error(err)
      res.status(500).send({
        error: err.message
      })
    }
  }
}
