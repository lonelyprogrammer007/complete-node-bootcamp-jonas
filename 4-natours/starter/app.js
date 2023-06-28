const fs = require('fs')
const path = require('path')

const express = require('express')

const app = express()

app.use(express.json())

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'dev-data', 'data', 'tours-simple.json'))
)

app
  .route('/api/v1/tours')
  .get((req, res) => {
    res
      .status(200)
      .json({status: 'success', results: tours.length, data: {tours}})
  })
  .post((req, res, next) => {
    const id = tours[tours.length - 1].id + 1
    const tour = {id, ...structuredClone(req.body)}

    tours.push(tour)
    fs.writeFile(
      path.join(__dirname, 'dev-data', 'data', 'tours-simple.json'),
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
  })

app.use((err, req, res, next) => {
  console.error('💥💥💥💥💥💥', err.stack)
  res.status(500).send('Something broke!')
})

const port = 3000

app.listen(port, () => console.log(`App running on port ${port}`))
