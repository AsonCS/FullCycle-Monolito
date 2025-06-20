import { Router } from 'express'
import { handler } from '..'
import ClientAdmFacadeFactory from '../../../modules/client-adm/factory/client-adm.facade.factory'

const clientAdm = ClientAdmFacadeFactory.create()
export const clientsRoute = Router()

clientsRoute.get(
  '/',
  handler(async (_, res) => {
    res.send(await clientAdm.findAll())
  })
)

clientsRoute.get(
  '/:id',
  handler(async (req, res) => {
    res.send(
      await clientAdm.find({ id: req.params.id })
    )
  })
)

clientsRoute.post(
  '/',
  handler(async (req, res) => {
    await clientAdm.add(req.body)
    res.sendStatus(204)
  })
)
