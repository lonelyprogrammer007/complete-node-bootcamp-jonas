const fs = require('fs')
const path = require('path')

const tours = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '..', 'dev-data', 'data', 'tours-simple.json')
  )
)

const getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours }
  })
}

const createTour = (req, res, next) => {
  const id = tours[tours.length - 1].id + 1
  const tour = { id, ...structuredClone(value) }

  tours.push(tour)
  fs.writeFile(
    path.join(__dirname, '..', 'dev-data', 'data', 'tours-simple.json'),
    JSON.stringify(tours),
    err => {
      if (err) return next(err)
      res.status(201).json({
        status: 'success',
        data: {
          tour
        }
      })
    }
  )
}

const getTour = (req, res) => {
  const id = Number(req.params.id)
  const tour = tours.find(el => el.id === id)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Not found'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
}

const updateTour = (req, res, next) => {
  const id = Number(req.params.id)

  const tour = tours.find(el => el.id === id)
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Resource not found'
    })
  }

  const newTours = tours.map(obj =>
    obj.id === id ? { ...tour, ...valueBody, id } : obj
  )
  fs.writeFile(
    path.join(__dirname, 'dev-data', 'data', 'tours-simple.json'),
    JSON.stringify(newTours),
    err => {
      if (err) return next(err)
      res.status(202).json({
        status: 'success',
        data: {
          newTours
        }
      })
    }
  )
}

const deleteTour = (req, res, next) => {
  const id = Number(req.params.id)
  const tourIndex = tours.findIndex(el => el.id === id)

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Resource not found'
    })
  }

  tours.splice(tourIndex, 1)
  fs.writeFile(
    path.join(__dirname, 'dev-data', 'data', 'tours-simple.json'),
    JSON.stringify(tours),
    err => {
      if (err) return next(err)
      res.status(204).json({
        status: 'success',
        data: null
      })
    }
  )
}

module.exports = { getTours, createTour, getTour, updateTour, deleteTour }
