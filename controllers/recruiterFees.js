import models from '../models'

export const getAllRecruiterFees = async (req, res) => {
  try {
    const recruitFees = await models.RecruiterFees.findAll()

    return res.send(recruitFees)
  } catch (error) {
    return res.status(500).send('Unable to retrieve recruiter fee list, please try again')
  }
}

export const getRecruiterFeeById = async (req, res) => {
  try {
    const { id } = req.params
    const recruitFee = await models.RecruiterFees.findOne({ where: { id } })

    return recruitFee
      ? res.send(recruitFee)
      : res.status(404).send(`No recruiter fee with the id of "${id}" found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve recruiter fee, please try again')
  }
}

export const saveNewRecruiterFee = async (req, res) => {
  try {
    const { discipline, fee, salary } = req.body

    await models.RecruiterFees.create({ discipline, fee, salary })

    return res.status(201).send({ discipline, fee, salary })
  } catch (error) {
    return res.status(500).send('Unable to save recruiter fee, please try again')
  }
}

export const patchRecruiterFeeFee = async (req, res) => {
  try {
    const { id } = req.params
    const { fee } = req.body
    await models.RecruiterFees.update({ fee }, { where: { id } })

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send('Unable to patch recruiter fee fee, please try again')
  }
}

export const patchRecruiterFeeSalary = async (req, res) => {
  try {
    const { id } = req.params
    const { salary } = req.body
    await models.RecruiterFees.update({ salary }, { where: { id } })

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send('Unable to patch recruiter fee salary, please try again')
  }
}

export const deleteRecruiterFee = async (req, res) => {
  try {
    const { id } = req.params
    const success = await models.RecruiterFees.destroy({ where: { id } })

    return success
      ? res.sendStatus(200)
      : res.status(404).send('No recruiter fee with that id to delete')
  } catch (error) {
    return res.status(500).send('Unable to delete recruiter fee, please try again')
  }
}
