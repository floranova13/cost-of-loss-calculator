import models from '../models'

export const getAllSalaries = async (req, res) => {
  try {
    const salaries = await models.Salaries.findAll()

    return res.send(salaries)
  } catch (error) {
    return res.status(500).send('Unable to retrieve salary list, please try again')
  }
}

export const getSalaryById = async (req, res) => {
  try {
    const { id } = req.params
    const salary = await models.Salaries.findOne({ where: { id } })

    return salary
      ? res.send(salary)
      : res.status(404).send(`No salary with the id of "${id}" found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve salary, please try again')
  }
}

export const patchSalaryTotalSalary = async (req, res) => {
  try {
    const { id } = req.params
    const { totalSalary } = req.body
    await models.Salaries.update({ totalSalary }, { where: { id } })

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send('Unable to patch salary total salary, please try again')
  }
}

export const patchSalaryBenefitsPercent = async (req, res) => {
  try {
    const { id } = req.params
    const { benefitsPercent } = req.body
    await models.Salaries.update({ benefitsPercent }, { where: { id } })

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send('Unable to patch salary benefits percent, please try again')
  }
}
