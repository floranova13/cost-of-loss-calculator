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
  personnelExpenses: () => Salaries.calculateOvertimeToCoverVacancy(),
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

export const exitTotal = {
  seperationPay: annualSalary => exitDirect.seperationPay(annualSalary) + exitHidden.seperationPay,
  personnelExpenses: async () => {
    const hidden = await exitHidden.personnelExpenses()

    return exitDirect.personnelExpenses + hidden
  },
  prospectiveCosts: (
    unemploymentTaxIncrease = 0, possibleLegalClaims = 0,
  ) => exitDirect.prospectiveCosts + exitHidden.prospectiveCosts(unemploymentTaxIncrease, possibleLegalClaims),
  productivityLosses: (
    annualSalary, moraleCost = 0, productionDelayCost = 0,
  ) => exitDirect.productivityLosses + exitHidden.productivityLosses(annualSalary, moraleCost, productionDelayCost),
}

export const recruitmentAndHiringlabels = [
  'Personnel Expenses', 'Advertising', 'Sign-On Bonuses/Relocation', 'Productivity Losses',
]

export const recruitmentAndHiringDirect = {
  personnelExpenses: async (
    annualSalary, usingCorporateRecruiter,
  ) => {
    const recruiterCost = await Administrative.calculateCorporateRecruiterSalary(annualSalary, usingCorporateRecruiter)
    const recruitmentAndHiringCost = await Salaries.calculateRecruitmentAndHiringCost()
    const corporateRecruiterSalaryCost = await (usingCorporateRecruiter
      ? Salaries.calculateCorporateRecruiterSalary() : 0)

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

export const recruitmentAndHiringTotal = {
  personnelExpenses: async (annualSalary, usingCorporateRecruiter) => {
    const direct = await recruitmentAndHiringDirect.personnelExpenses(annualSalary, usingCorporateRecruiter)

    return direct + recruitmentAndHiringHidden.personnelExpenses
  },
  advertising: async () => {
    const direct = await recruitmentAndHiringDirect.advertising()

    return direct + recruitmentAndHiringHidden.advertising
  },
  signOnBonusesAndRelocation: async (offeringRelocationBonus, offeringSignOnBonus) => {
    const direct = await recruitmentAndHiringDirect.signOnBonusesAndRelocation(
      offeringRelocationBonus, offeringSignOnBonus,
    )

    return direct + recruitmentAndHiringHidden.signOnBonusesAndRelocation
  },
  productivityLosses: (
    annualSalary, lostCustomerCost = 0,
  ) => recruitmentAndHiringDirect.productivityLosses +
    recruitmentAndHiringHidden.productivityLosses(annualSalary, lostCustomerCost),
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

export const onboardingTotal = {
  personnelExpenses: () => onboardingDirect.personnelExpenses + onboardingHidden.personnelExpenses,
  prospectiveCosts: () => onboardingDirect.prospectiveCosts + onboardingHidden.prospectiveCosts,
  productivityLosses: annualSalary => onboardingDirect.productivityLosses +
    onboardingHidden.productivityLosses(annualSalary),
}


export const snapshotMain = {
  exitDirect: annualSalary => exitDirect.seperationPay(annualSalary) + exitDirect.personnelExpenses +
    exitDirect.prospectiveCosts + exitDirect.productivityLosses,
  exitHidden: async (
    unemploymentTaxIncrease = 0, possibleLegalClaims = 0, moraleCost = 0, productionDelayCost = 0,
  ) => {
    const personnelExpenses = await exitHidden.personnelExpenses()
    const prospectiveCosts = exitHidden.prospectiveCosts(unemploymentTaxIncrease, possibleLegalClaims)
    const productivityLosses = exitHidden.productivityLosses(moraleCost, productionDelayCost)

    return exitHidden.seperationPay + personnelExpenses + prospectiveCosts + productivityLosses
  },
  exitTotal: () => exitTotal.seperationPay() + exitTotal.personnelExpenses() +
    exitTotal.prospectiveCosts() + exitTotal.productivityLosses(),
  recruitmentAndHiringDirect: async (
    annualSalary, usingCorporateRecruiter, offeringRelocationBonus, offeringSignOnBonus,
  ) => {
    const personnelExpenses = await recruitmentAndHiringDirect.personnelExpenses(annualSalary, usingCorporateRecruiter)
    const advertising = await recruitmentAndHiringDirect.advertising()
    const signOnBonusesAndRelocation =
      await recruitmentAndHiringDirect.signOnBonusesAndRelocation(offeringRelocationBonus, offeringSignOnBonus)

    return personnelExpenses + advertising + signOnBonusesAndRelocation + recruitmentAndHiringDirect.productivityLosses
  },
  recruitmentAndHiringHidden: () => recruitmentAndHiringHidden.personnelExpenses +
  recruitmentAndHiringHidden.advertising + recruitmentAndHiringHidden.signOnBonusesAndRelocation +
  recruitmentAndHiringHidden.productivityLosses(),
  recruitmentAndHiringTotal: async (
    annualSalary, usingCorporateRecruiter, offeringRelocationBonus, offeringSignOnBonus,
  ) => {
    const personnelExpenses = await recruitmentAndHiringTotal.personnelExpenses(annualSalary, usingCorporateRecruiter)
    const advertising = await recruitmentAndHiringTotal.advertising()
    const signOnBonusesAndRelocation =
      await recruitmentAndHiringTotal.signOnBonusesAndRelocation(offeringRelocationBonus, offeringSignOnBonus)

    return personnelExpenses + advertising + signOnBonusesAndRelocation + recruitmentAndHiringTotal.productivityLosses()
  },
  onboardingDirect: () => onboardingDirect.personnelExpenses +
    onboardingDirect.outsideTraining() + onboardingDirect.productivityLosses,
  onboardingHidden: () => onboardingHidden.personnelExpenses +
    onboardingHidden.outsideTraining + onboardingHidden.productivityLosses(),
  onboardingTotal: () => onboardingTotal.personnelExpenses() +
    onboardingTotal.outsideTraining() + onboardingTotal.productivityLosses(),
}

export const snapshotTotal = {
  directCost: async (
    annualSalary, usingCorporateRecruiter, offeringRelocationBonus, offeringSignOnBonus,
  ) => {
    const recruitmentAndHiring = await snapshotMain.recruitmentAndHiringDirect(
      annualSalary, usingCorporateRecruiter, offeringRelocationBonus, offeringSignOnBonus,
    )
    return snapshotMain.exitDirect(annualSalary) + recruitmentAndHiring + snapshotMain.onboardingDirect()
  },
  hiddenCost: async (unemploymentTaxIncrease = 0, possibleLegalClaims = 0, moraleCost = 0, productionDelayCost = 0) => {
    const exit =
      await snapshotMain.exitHidden(unemploymentTaxIncrease, possibleLegalClaims, moraleCost, productionDelayCost)

    return exit + snapshotMain.recruitmentAndHiringHidden() + snapshotMain.onboardingHidden()
  },
}

// export const snapshotFullTotal = () => snapshotTotal.directCost() + snapshotTotal.hiddenCost()

export const programCost = 5710 * 12 + 1300

// export const overallSavings = (snapshotFullTotal() - programCost)
