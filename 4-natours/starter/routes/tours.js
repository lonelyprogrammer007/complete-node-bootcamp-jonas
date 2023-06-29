const express = require('express')

const {
  getTours,
  createTour,
  getTour,
  updateTour,
  deleteTour
} = require('../controllers/tours')
const { validateParam, validateBody } = require('../utils/validators')

const router = express.Router()

router.param('id', validateParam('id'))

router
  .route('/')
  .get(getTours)
  .post(validateBody(['name', 'price']), createTour)
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
