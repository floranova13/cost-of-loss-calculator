const models = require('../models')

const getAllSigningBonuses = async (req, res) => {
  try {
    let signingBonuses = await models.SigningBonus.findAll({ attributes: ['company', 'amount', 'slug'] })

    return res.send(signingBonuses)
  } catch (error) {
    return res.status(500).send('Unable to retrieve signing bonus list, please try again')
  }
}

const getSigningBonusBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const signingBonus = await models.SigningBonus.findOne({
      where: { slug },
      attributes: ['company', 'amount', 'slug']
    })

    return signingBonus
      ? res.send(signingBonus)
      : res.status(404).send(`no signing bonus with the slug of '${slug}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve singing bonus, please try again')
  }
}

const saveNewSigningBonus = async (req, res) => {
  try {
    const {
      company, amount, slug
    } = req.body

    const signingBonus = await models.SigningBonus.create({
      company, amount, slug
    })

    return res.status(201).send(signingBonus)
  } catch (error) {
    return res.status(500).send('Unable to save signing bonus, please try again')
  }
}

const patchSigningBonus = async (req, res) => {
  try {
    const { slug } = req.params // ADD MIDDLEWARE TO CHECK THIS
    const { amount } = req.body
    const signingBonus = await models.SigningBonus.findOne({
      where: { slug },
      attributes: ['company', 'amount', 'slug']
    })

    signingBonus.amount = amount
    await signingBonus.save()

    return res.status(201).send(signingBonus)
  } catch (error) {
    return res.status(500).send('Unable to update recruiter fee, please try again')
  }
}

module.exports = { getAllSigningBonuses, getSigningBonusBySlug, saveNewSigningBonus, patchSigningBonus }
