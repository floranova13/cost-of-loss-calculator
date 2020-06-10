import models from '../models'

export const getAllJobPostings = async (req, res) => {
  try {
    const jobPostings = await models.JobPostings.findAll()

    return res.send(jobPostings)
  } catch (error) {
    return res.status(500).send('Unable to retrieve job posting list, please try again')
  }
}

export const getJobPostingById = async (req, res) => {
  try {
    const { id } = req.params
    const jobPosting = await models.JobPostings.findOne({ where: { id } })

    return jobPosting
      ? res.send(jobPosting)
      : res.status(404).send(`No job posting with the id of "${id}" found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve job posting, please try again')
  }
}

export const saveNewJobPosting = async (req, res) => {
  try {
    const { service, cost, notes } = req.body
    const jobPosting = await models.JobPostings.create({ service, cost, notes })

    return res.status(201).send(jobPosting)
  } catch (error) {
    return res.status(500).send('Unable to save job posting, please try again')
  }
}

export const patchJobPostingCost = async (req, res) => {
  try {
    const { id } = req.params
    const { cost } = req.body

    await models.JobPostings.update({ cost }, { where: { id } })

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send('Unable to update job posting cost, please try again')
  }
}

export const patchJobPostingNotes = async (req, res) => {
  try {
    const { id } = req.params
    const { notes } = req.body

    await models.JobPostings.update({ notes }, { where: { id } })

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send('Unable to update job posting notes, please try again')
  }
}

export const deleteJobPosting = async (req, res) => {
  try {
    const { id } = req.params
    const success = await models.JobPostings.destroy({ where: { id } })

    return success
      ? res.sendStatus(200)
      : res.status(404).send('No job posting with that id to delete')
  } catch (error) {
    return res.status(500).send('Unable to delete job posting, please try again')
  }
}
