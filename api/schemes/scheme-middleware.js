const db = require('../../data/db-config')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    'message': 'scheme with scheme_id <actual id> not found'
  }
*/
const checkSchemeId = async (req, res, next) => {
  const {scheme_id} = req.params
  const schemeOfId = await db('schemes').where('scheme_id', scheme_id).first();
  console.log({schemeOfId})
  if (!schemeOfId === true) {
    res.status(404).json({
      'message': `scheme with scheme_id ${scheme_id} not found`
    })
  } else {
    next()
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    'message': 'invalid scheme_name'
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body
  if (scheme_name === undefined || typeof scheme_name !== 'string' || scheme_name === '' ) {
    res.status(400).json({
      'message': 'invalid scheme_name'
    })
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    'message': 'invalid step'
  }
*/
const validateStep = (req, res, next) => {
  
  const { scheme_name, step_number } = req.body
  const isUndefined = scheme_name === undefined
  const isNotAString = typeof scheme_name !== 'string'
  const isEmpty = scheme_name === ''
  const isTooSmall = isNaN(step_number)
  const isNaNStep = step_number < 1
  if (isUndefined||isNotAString||isEmpty||isTooSmall||isNaNStep) { 
    res.status(400).json({
      'message': 'invalid step'
    })
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
