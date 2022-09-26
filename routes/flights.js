import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

router.get('/new', flightsCtrl.new)

router.get('/', flightsCtrl.index)

router.get('/:id', flightsCtrl.show)

router.post('/', flightsCtrl.create)

router.delete('/:id', flightsCtrl.delete)

export {
  router
}
