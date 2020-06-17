export const calculateEmployeeProductivityCost = annualSalary => Math.round((annualSalary / 26) * 15) / 100

export const calculateExitCost = (
  annualSalary, moraleCost = 0, productionDelayCost = 0,
) => calculateEmployeeProductivityCost(annualSalary) + moraleCost + productionDelayCost

export const calculateVacancyCost = annualSalary => Math.round((annualSalary / 365) * 45) / 100

export const calculateRecruitmentAndHiringCost = (
  annualSalary, lostCustomerCost = 0,
) => calculateVacancyCost(annualSalary) + lostCustomerCost

export const calculateOnboardingCost = annualSalary => Math.round((annualSalary / 365) * 15) / 100

export const calculateProductivityCost = (
  annualSalary, moraleCost, productionDelayCost, lostCustomerCost,
) => calculateExitCost(annualSalary, moraleCost, productionDelayCost) +
    calculateRecruitmentAndHiringCost(annualSalary, lostCustomerCost) +
    calculateOnboardingCost(annualSalary)
