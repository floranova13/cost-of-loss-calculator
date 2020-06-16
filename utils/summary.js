import * as Administrative from './administrative'
import * as Salaries from './salaries'
import * as Productivity from './productivity'

export const exitlabels = [
  'Seperation Pay', 'Personnel Expenses', 'Prospective Costs', 'Productivity Losses',
]

export const exitDirect = {
  seperationPay: annualSalary => Administrative.calculateSeperationPay(annualSalary),
  personnelExpenses: 0,
  prospectiveCosts: 0,
  productivityLosses: 0,
}

export const exitHidden = {
  seperationPay: 0,
  personnelExpenses: async () => Salaries.calculateOvertimeToCoverVacancy(),
  prospectiveCosts: (
    unemploymentTaxIncrease = 0, possibleLegalClaims = 0,
  ) => unemploymentTaxIncrease + possibleLegalClaims,
  productivityLosses: async (
    annualSalary, moraleCost = 0, productionDelayCost = 0,
  ) => {
    const overtime = await Salaries.calculateOvertimeToCoverVacancy()

    return overtime + Productivity.calculateExitCost(annualSalary, moraleCost, productionDelayCost)
  },
}

export const recruitmentAndHiringlabels = [
  'Personnel Expenses', 'Advertising', 'Sign-On Bonuses/Relocation', 'Productivity Losses',
]

export const recruitmentAndHiringDirect = {
  personnelExpenses: async (
    annualSalary, usingCorporateRecruiter,
  ) => {
    const recruiterCost = await Administrative.calculateRecruiterFee(annualSalary, usingCorporateRecruiter)
    const recruitmentAndHiringCost = await Salaries.calculateRecruitmentAndHiringCost()
    const corporateRecruiterSalaryCost =
      await (usingCorporateRecruiter ? Salaries.calculateCorporateRecruiterSalary() : 0)

    return recruiterCost + recruitmentAndHiringCost + corporateRecruiterSalaryCost
  },
  advertising: async () => Administrative.calculateAdvertisingCosts(),
  signOnBonusesAndRelocation: async (offeringRelocationBonus, offeringSignOnBonus) => {
    const signOnBonus = await Administrative.calculateSignOnBonuses(offeringSignOnBonus)

    return signOnBonus + Administrative.calculateRelocationCost(offeringRelocationBonus)
  },
  productivityLosses: 0,
}

export const recruitmentAndHiringHidden = {
  personnelExpenses: 0,
  advertising: 0,
  signOnBonusesAndRelocation: 0,
  productivityLosses: (
    annualSalary, lostCustomerCost = 0,
  ) => Productivity.calculateRecruitmentAndHiringCost(annualSalary, lostCustomerCost),
}

export const onboardinglabels = [
  'Personnel Expenses', 'Outside Training', 'Productivity Losses',
]

export const onboardingDirect = {
  personnelExpenses: 1000,
  outsideTraining: (
    travelAndRegistrationFees = 0, outsideTrainer = 0, workshopMaterials = 0,
  ) => Administrative.calculateOnboardingCost(travelAndRegistrationFees, outsideTrainer, workshopMaterials),
  productivityLosses: 0,
}

export const onboardingHidden = {
  personnelExpenses: 0,
  outsideTraining: 0,
  productivityLosses: annualSalary => Productivity.calculateOnboardingCost(annualSalary),
}

export const programCost = 1300 * 12 + 5710
