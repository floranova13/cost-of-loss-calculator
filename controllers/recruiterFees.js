const models = require('../models')

const getAllRecruiterFees = async (req, res) => {
  try {
    let recruitFees = await models.RecruiterFee.findAll({
      attributes: ['id', 'discipline', 'percentage', 'amount', 'salary']
    })

    return res.send(recruitFees)
  } catch (error) {
    return res.status(500).send('Unable to retrieve recruiter fee list, please try again')
  }
}

const getRecruiterFeeById = async (req, res) => {
  try {
    const { id } = req.params
    const recruitFee = await models.RecruiterFee.findOne({
      where: { id },
      attributes: ['id', 'discipline', 'percentage', 'amount', 'salary']
    })

    return recruitFee
      ? res.send(recruitFee)
      : res.status(404).send(`no recruiter fee with the id of '${id}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve recruiter fee, please try again')
  }
}

const saveNewRecruiterFee = async (req, res) => {
  try {
    const {
      discipline, percentage, amount, salary
    } = req.body

    const recruiterFee = await models.RecruiterFee.create({
      discipline, percentage, amount, salary
    })

    return res.status(201).send(recruiterFee)
  } catch (error) {
    return res.status(500).send('Unable to save recruiter fee, please try again')
  }
}

module.exports = { getAllRecruiterFees, getRecruiterFeeById, saveNewRecruiterFee }
