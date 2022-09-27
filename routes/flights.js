import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

router.get('/new', flightsCtrl.new)

router.get('/', flightsCtrl.index)

router.get('/:id', flightsCtrl.show)

router.get('/:id/edit', flightsCtrl.edit)

router.post('/', flightsCtrl.create)

router.post('/:id/tickets', flightsCtrl.createTicket)

router.post('/:id/meals', flightsCtrl.addMeal)

router.delete('/:id', flightsCtrl.delete)

export {
  router
}
