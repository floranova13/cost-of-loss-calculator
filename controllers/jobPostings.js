const models = require('../models')

const getAllJobPostings = async (req, res) => {
  try {
    let jobPostings = await models.JobPosting.findAll({ attributes: ['service', 'cost', 'notes', 'slug'] })

    return res.send(jobPostings)
  } catch (error) {
    return res.status(500).send('Unable to retrieve job posting list, please try again')
  }
}

const getJobPostingBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const jobPosting = await models.JobPosting.findOne({
      where: { slug },
      attributes: ['service', 'cost', 'notes', 'slug']
    })

    return jobPosting
      ? res.send(jobPosting)
      : res.status(404).send(`no job posting with the slug of '${slug}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve job posting, please try again')
  }
}

const saveNewJobPosting = async (req, res) => {
  try {
    const {
      service, cost, notes, slug
    } = req.body

    const jobPosting = await models.JobPosting.create({
      service, cost, notes, slug
    })

    return res.status(201).send(jobPosting)
  } catch (error) {
    return res.status(500).send('Unable to save job posting, please try again')
  }
}

const patchJobPostingCost = async (req, res) => {
  try {
    const { slug } = req.params // ADD MIDDLEWARE TO CHECK THIS
    const { cost } = req.body
    const jobPosting = await models.JobPosting.findOne({
      where: { slug },
      attributes: ['service', 'cost', 'notes', 'slug']
    })

    jobPosting.cost = cost
    await jobPosting.save()

    return res.status(201).send(jobPosting)
  } catch (error) {
    return res.status(500).send('Unable to update job posting cost, please try again')
  }
}

const patchJobPostingNotes = async (req, res) => { // PRACTICE DRY CODING, COMBINE WITH OTHER PATCH AND USE MIDDLEWARE
  try {
    const { slug } = req.params // ADD MIDDLEWARE TO CHECK THIS
    const { notes } = req.body
    const jobPosting = await models.JobPosting.findOne({
      where: { slug },
      attributes: ['service', 'cost', 'notes', 'slug']
    })

    jobPosting.notes = notes
    await jobPosting.save()

    return res.status(201).send(jobPosting)
  } catch (error) {
    return res.status(500).send('Unable to update job posting notes, please try again')
  }
}

module.exports = {
  getAllJobPostings, getJobPostingBySlug, saveNewJobPosting, patchJobPostingCost, patchJobPostingNotes
}
