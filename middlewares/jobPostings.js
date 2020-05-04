const jobPostings = require('../controllers/jobPostings')

const checkJobPostingsRoute = async (req, res, next) => {
  try {
    if (!req.params.slug) {
      return await (jobPostings.getAllJobPostings(req, res))
    }

    next()
  } catch (error) {
    return res.status(500).send('something went wrong...')
  }
}

module.exports = { checkJobPostingsRoute }
