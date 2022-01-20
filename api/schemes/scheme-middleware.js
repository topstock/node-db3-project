const db = require('../../data/db-config')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const {scheme_id} = req.params
  const schemeOfId = await db('schemes').where('scheme_id', scheme_id).first();
  console.log({schemeOfId})
  if (!schemeOfId === true) {
    res.status(404).json({
      "message": `scheme with scheme_id ${req.params.id} not found`
    })
  } else {
    next()
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  console.log('validateScheme has started')
  next()
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  console.log('checkSchemeId has started')
  next()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
