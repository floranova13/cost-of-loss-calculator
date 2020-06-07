export const exitlabels = [
  'Seperation Pay', 'Personnel Expenses', 'Prospective Costs', 'Productivity Losses',
]

const exitDirect = {
  seperationPay: 0,
  personnelExpenses: 0,
  prospectiveCosts: 0,
  productivityLosses: 0,
}

const exitHidden = {
  seperationPay: 0,
  personnelExpenses: 0,
  prospectiveCosts: 0,
  productivityLosses: 0,
}

export const exitTotal = {
  seperationPay: () => exitDirect.seperationPay + exitHidden.seperationPay,
  personnelExpenses: () => exitDirect.personnelExpenses + exitHidden.personnelExpenses,
  prospectiveCosts: () => exitDirect.prospectiveCosts + exitHidden.prospectiveCosts,
  productivityLosses: () => exitDirect.productivityLosses + exitHidden.productivityLosses,
}

export const recruitmentAndHiringlabels = [
  'Personnel Expenses', 'Advertising', 'Sign-On Bonuses/Relocation', 'Productivity Losses',
]

const recruitmentAndHiringDirect = {
  personnelExpenses: 0,
  advertising: 0,
  signOnBonusesAndRelocation: 0,
  productivityLosses: 0,
}

const recruitmentAndHiringHidden = {
  personnelExpenses: 0,
  advertising: 0,
  signOnBonusesAndRelocation: 0,
  productivityLosses: 0,
}

export const recruitmentAndHiringTotal = {
  personnelExpenses: () => recruitmentAndHiringDirect.personnelExpenses +
  recruitmentAndHiringHidden.personnelExpenses,
  advertising: () => recruitmentAndHiringDirect.advertising +
  recruitmentAndHiringHidden.advertising,
  signOnBonusesAndRelocation: () => recruitmentAndHiringDirect.signOnBonusesAndRelocation +
  recruitmentAndHiringHidden.signOnBonusesAndRelocation,
  productivityLosses: () => recruitmentAndHiringDirect.productivityLosses +
  recruitmentAndHiringHidden.productivityLosses,
}

export const onboardinglabels = [
  'Personnel Expenses', 'Outside Training', 'Productivity Losses',
]

const onboardingDirect = {
  personnelExpenses: 0,
  outsideTraining: 0,
  productivityLosses: 0,
}

const onboardingHidden = {
  personnelExpenses: 0,
  outsideTraining: 0,
  productivityLosses: 0,
}

export const onboardingTotal = {
  personnelExpenses: () => onboardingHidden.personnelExpenses,
  prospectiveCosts: () => onboardingHidden.prospectiveCosts,
  productivityLosses: () => onboardingDirect.productivityLosses + onboardingHidden.productivityLosses,
}


export const snapshotMain = {
  exitDirect: () => exitDirect.seperationPay + exitDirect.personnelExpenses +
    exitDirect.prospectiveCosts + exitDirect.productivityLosses,
  exitHidden: () => exitHidden.seperationPay + exitHidden.personnelExpenses +
    exitHidden.prospectiveCosts + exitHidden.productivityLosses,
  exitTotal: () => exitTotal.seperationPay() + exitTotal.personnelExpenses() +
    exitTotal.prospectiveCosts() + exitTotal.productivityLosses(),
  recruitmentAndHiringDirect: () => recruitmentAndHiringDirect.personnelExpenses +
  recruitmentAndHiringDirect.advertising + recruitmentAndHiringDirect.signOnBonusesAndRelocation +
  recruitmentAndHiringDirect.productivityLosses,
  recruitmentAndHiringHidden: () => recruitmentAndHiringHidden.personnelExpenses +
  recruitmentAndHiringHidden.advertising + recruitmentAndHiringHidden.signOnBonusesAndRelocation +
  recruitmentAndHiringHidden.productivityLosses,
  recruitmentAndHiringTotal: () => recruitmentAndHiringTotal.personnelExpenses() +
  recruitmentAndHiringTotal.advertising() + recruitmentAndHiringTotal.signOnBonusesAndRelocation() +
  recruitmentAndHiringTotal.productivityLosses(),
  onboardingDirect: () => onboardingDirect.personnelExpenses +
    onboardingDirect.outsideTraining + onboardingDirect.productivityLosses,
  onboardingHidden: () => onboardingHidden.personnelExpenses +
    onboardingHidden.outsideTraining + onboardingHidden.productivityLosses,
  onboardingTotal: () => onboardingTotal.personnelExpenses() +
    onboardingTotal.outsideTraining() + onboardingTotal.productivityLosses(),
}

export const snapshotTotal = {
  directCost: () => snapshotMain.exitDirect() + snapshotMain.recruitmentAndHiringDirect() +
    snapshotTotal.onboardingDirect(),
  hiddenCost: () => snapshotMain.exitHidden() + snapshotMain.recruitmentAndHiringHidden() +
    snapshotTotal.onboardingHidden(),
}

export const snapshotFullTotal = () => snapshotTotal.directCost() + snapshotTotal.hiddenCost()

export const programCost = 5710 * 12 + 1300

export const overallSavings = (snapshotFullTotal() - programCost)
