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
