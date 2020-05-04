const signingBonuses = require('../controllers/signingBonuses')

const checkSigningBonusesRoute = async (req, res, next) => {
  try {
    if (!req.params.slug) {
      return await (signingBonuses.getAllSigningBonuses(req, res))
    }

    next()
  } catch (error) {
    return res.status(500).send('something went wrong...')
  }
}

module.exports = { checkSigningBonusesRoute }
