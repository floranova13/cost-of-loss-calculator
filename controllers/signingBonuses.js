import models from '../models'

export const getAllSigningBonuses = async (req, res) => {
  try {
    const signingBonuses = await models.SigningBonuses.findAll()

    return res.send(signingBonuses)
  } catch (error) {
    return res.status(500).send('Unable to retrieve signing bonus list, please try again')
  }
}

export const getSigningBonusById = async (req, res) => {
  try {
    const { id } = req.params
    const signingBonus = await models.SigningBonuses.findOne({ where: { id } })

    return signingBonus
      ? res.send(signingBonus)
      : res.status(404).send(`No signing bonus with the id of "${id}" found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve signing bonus, please try again')
  }
}

export const saveNewSigningBonus = async (req, res) => {
  try {
    const { company, amount } = req.body

    await models.SigningBonuses.create({ company, amount })

    return res.status(201).send({ company, amount })
  } catch (error) {
    return res.status(500).send('Unable to save signing bonus, please try again')
  }
}

export const patchSigningBonusAmount = async (req, res) => {
  try {
    const { id } = req.params
    const { amount } = req.body
    await models.SigningBonuses.update({ amount }, { where: { id } })

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send('Unable to patch signing bonus amount, please try again')
  }
}

export const deleteSigningBonus = async (req, res) => {
  try {
    const { id } = req.params
    const success = await models.SigningBonuses.destroy({ where: { id } })

    return success
      ? res.sendStatus(200)
      : res.status(404).send('No signing bonus with that id to delete')
  } catch (error) {
    return res.status(500).send('Unable to delete signing bonus, please try again')
  }
}
