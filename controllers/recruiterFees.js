import models from '../models'

export const getAllRecruiterFees = async (req, res) => {
  try {
    const recruitFees = await models.RecruiterFee.findAll({
      attributes: ['id', 'discipline', 'percentage', 'amount', 'salary'],
    })

    return res.send(recruitFees)
  } catch (error) {
    return res.status(500).send('Unable to retrieve recruiter fee list, please try again')
  }
}

export const getRecruiterFeeById = async (req, res) => {
  try {
    const { id } = req.params
    const recruitFee = await models.RecruiterFee.findOne({
      where: { id },
      attributes: ['id', 'discipline', 'percentage', 'amount', 'salary'], // should the percentage be displayed as an integer or with a decimal?
    })

    return recruitFee
      ? res.send(recruitFee)
      : res.status(404).send(`no recruiter fee with the id of '${id}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve recruiter fee, please try again')
  }
}

export const saveNewRecruiterFee = async (req, res) => {
  try {
    const {
      discipline, percentage, amount, salary, // currently, percentage is entered in as a decimal and converted to an integer. Not sure of the best way to display it as a percentage, though.
    } = req.body

    const recruiterFee = await models.RecruiterFee.create({
      discipline, percentage: percentage * 100, amount, salary,
    })

    return res.status(201).send(recruiterFee)
  } catch (error) {
    return res.status(500).send('Unable to save recruiter fee, please try again')
  }
}

export const patchRecruiterFee = async (req, res) => {
  try {
    const { id } = req.params // ADD MIDDLEWARE TO CHECK THIS
    const { percentage, amount, salary } = req.body
    const recruiterFee = await models.RecruiterFee.findOne({
      where: { id },
      attributes: ['id', 'discipline', 'percentage', 'amount', 'salary'],
    })

    recruiterFee.percentage = percentage * 100
    recruiterFee.amount = amount
    recruiterFee.salary = salary
    await recruiterFee.save()

    return res.status(201).send(recruiterFee)
  } catch (error) {
    return res.status(500).send('Unable to update recruiter fee, please try again')
  }
}
