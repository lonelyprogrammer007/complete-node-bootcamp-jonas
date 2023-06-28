const express = require('express')
const app = express()

// parse incoming JSON payloads
app.use(express.json())

app.get('/api/data', (req, res) => {
  console.log(req.body) // This will print the JSON payload to the console
  throw Error(':(')
  // res.send('Data received')
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
