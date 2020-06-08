import { retrieveJobPostings } from './jobPostings'
import { retrieveSigningBonuses } from './signingBonuses'
import { calculateCorporateRecruiterSalary } from './salaries'

const calculateSeperationPay = annualSalary => Math.ceil((annualSalary / 26) * 100) / 100

export const calculateExitCost = (
  annualSalary, outsourcedWork = 0, unemploymentTaxIncrease = 0, possibleLegalClaims = 0,
) => calculateSeperationPay(annualSalary) + outsourcedWork + unemploymentTaxIncrease + possibleLegalClaims

const calculateAdvertisingCosts = async () => {
  const jobPostings = await retrieveJobPostings()

  return jobPostings.reduce((acc, curr) => acc + curr.cost, 0)
}

const calculateRecruiterFee = async (annualSalary, usingCorporateRecruiter) => {
  if (usingCorporateRecruiter) return Math.ceil(annualSalary * 25) / 100

  const cost = await calculateCorporateRecruiterSalary()

  return cost
}

const calculateRelocationCost = offeringRelocationBonus => (offeringRelocationBonus ? 21000 : 0)

const calculateSignOnBonuses = async (offeringSignOnBonus) => {
  if (!offeringSignOnBonus) return 0

  const signOnBonuses = await retrieveSigningBonuses()
  const sum = signOnBonuses.reduce((acc, curr) => acc + Number(curr.amount), 0)

  return Math.ceil((sum / signOnBonuses.length) * 100) / 100
}

export const calculateRecruitmentAndHiringCost =
  async (annualSalary, usingCorporateRecruiter, offeringRelocationBonus, offeringSignOnBonus) => {
    const advertisingCost = await calculateAdvertisingCosts()
    const recruiterFee = await calculateRecruiterFee(annualSalary, usingCorporateRecruiter)
    const relocationCost = calculateRelocationCost(offeringRelocationBonus)
    const signOnBonus = calculateSignOnBonuses(offeringSignOnBonus)

    return advertisingCost + recruiterFee + relocationCost + signOnBonus
  }

export const calculateOnboardingCost = (
  travelAndRegistrationFees = 0, outsideTrainer = 0, workshopMaterials = 0,
) => travelAndRegistrationFees + outsideTrainer + workshopMaterials

export const calculateAdministrativeTotal = async (
  annualSalary, outsourcedWork = 0, unemploymentTaxIncrease = 0, possibleLegalClaims = 0, usingCorporateRecruiter,
  relocationCost = 0, signOnBonus = 0, travelAndRegistrationFees = 0, outsideTrainer = 0, workshopMaterials = 0,
) => {
  const exitCost = calculateExitCost(annualSalary, outsourcedWork, unemploymentTaxIncrease, possibleLegalClaims)
  const recruitmentAndHiringCost =
    await calculateRecruitmentAndHiringCost(annualSalary, usingCorporateRecruiter, relocationCost, signOnBonus)
  const onboardingCost = calculateOnboardingCost(travelAndRegistrationFees, outsideTrainer, workshopMaterials)

  return exitCost + recruitmentAndHiringCost + onboardingCost
}
