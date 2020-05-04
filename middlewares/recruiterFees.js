const recruiterFees = require('../controllers/recruiterFees')

const checkRecruiterFeesRoute = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return await (recruiterFees.getAllRecruiterFees(req, res))
    }

    next()
  } catch (error) {
    return res.status(500).send('something went wrong...')
  }
}

module.exports = { checkRecruiterFeesRoute }
