import request from 'supertest'
import { app } from '../../express'
import {
  sequelize,
  setupDb
} from '../../sequelize'

describe('E2E test for checkout', () => {
beforeEach(async () => {
    await setupDb(':memory:')
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a checkout', async () => {
    
  })
})