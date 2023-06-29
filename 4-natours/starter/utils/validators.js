const validateParams = params => ({ error: null })

const validateParam = name => (req, res, next, val) => {
  const { error } = validateParams(req.params)
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid params'
    })
  }
  next()
}

const validateStructure = requiredFields => (req, res, next) => {
  const missingFields = []
  const bodyFields = Object.keys(req.body)

  requiredFields.forEach(field => {
    if (!bodyFields.includes(field)) {
      missingFields.push(field)
    }
  })

  if (missingFields.length > 0) {
    return res.status(400).json({
      status: 'fail',
      message: `Missing required fields: ${missingFields.join(', ')}`
    })
  } else {
    next()
  }
}

module.exports = {
  validateStructure,
  validateParams,
  validateParam,
  validateBody
}
