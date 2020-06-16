import models from '../models'

export const getAllUserInputs = async (req, res) => {
  try {
    const userInputs = await models.UserInputs.findAll()

    return res.send(userInputs)
  } catch (error) {
    return res.status(500).send('Unable to retrieve user Inputs, please try again')
  }
}

export const saveNewUserInput = async (req, res) => {
  try {
    const {
      nameFirst, nameLast, periodStart, periodEnd, companyIndustry,
      occupationalSpecialty, jobTitle, laborCode, annualSalary, hourlySalary,
      weeklyWorkHours, oesSecCode, degree, externalCorporateRecruiter, signOnBonus, relocationBonus,
    } = req.body

    const userInput = await models.UserInputs.create({
      nameFirst,
      nameLast,
      periodStart,
      periodEnd,
      companyIndustry,
      occupationalSpecialty,
      jobTitle,
      laborCode,
      annualSalary,
      hourlySalary,
      weeklyWorkHours,
      oesSecCode,
      degree,
      externalCorporateRecruiter,
      signOnBonus,
      relocationBonus,
    })

    return res.status(201).send(userInput)
  } catch (error) {
    return res.status(500).send('Unable to save user Input, please try again')
  }
}
