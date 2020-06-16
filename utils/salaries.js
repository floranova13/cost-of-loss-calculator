import fetchSalaries from '../actions/salaries'

const salaryKeys = {
  corporateRecruiter: 'Corporate Recruiter',
  directorOfEngineering: 'Director of Engineering (Hiring Manager)',
  itTechnician: 'IT Technician',
  humanResourcesManager: 'Human Resources Manager',
  executives: 'CEO, Executives/Decision-Maker',
  peerWorker: 'Peer Worker (Estimated 3 people)',
}

export const retrieveSalaries = async () => {
  const salaries = await fetchSalaries()

  return salaries
}

export const exitLabels = [
  'Conducting Exit Interview', 'Completing Exit Paperwork', 'Overtime to Cover Employee Vacancy',
]

const exitHours = {
  conductingExitInterview: {
    corporateRecruiter: 2,
    directorOfEngineering: 0,
    itTechnician: 0,
    humanResourcesManager: 2,
    executives: 0,
    peerWorker: 0,
  },
  completingExitPaperwork: {
    corporateRecruiter: 1,
    directorOfEngineering: 0,
    itTechnician: 0,
    humanResourcesManager: 2,
    executives: 0,
    peerWorker: 0,
  },
  vacencyOvertime: {
    corporateRecruiter: 0,
    directorOfEngineering: 0,
    itTechnician: 0,
    humanResourcesManager: 0,
    executives: 0,
    peerWorker: 64,
  },
}

export const recruitmentAndHiringLabels = [
  'Position Description', 'Posting & Marketing', 'Resume Screening', 'Internal Meetings & Phone Screening',
  'References, Background and Certification/Degree Checks', 'Interviewing',
  'Benefits Packages, Relocation Coordination',
]

const recruitmentAndHiringHours = {
  positionDescription: {
    corporateRecruiter: 2,
    directorOfEngineering: 2,
    itTechnician: 0,
    humanResourcesManager: 2,
    executives: 0,
    peerWorker: 0,
  },
  postingAndMarketing: {
    corporateRecruiter: 5,
    directorOfEngineering: 0,
    itTechnician: 0,
    humanResourcesManager: 0,
    executives: 0,
    peerWorker: 0,
  },
  resumeScreening: {
    corporateRecruiter: 15,
    directorOfEngineering: 0,
    itTechnician: 0,
    humanResourcesManager: 0,
    executives: 0,
    peerWorker: 0,
  },
  internalMeetingsAndPhoneScreening: {
    corporateRecruiter: 20,
    directorOfEngineering: 0,
    itTechnician: 0,
    humanResourcesManager: 0,
    executives: 0,
    peerWorker: 0,
  },
  referencesBackgroundAndChecks: {
    corporateRecruiter: 0,
    directorOfEngineering: 0,
    itTechnician: 0,
    humanResourcesManager: 4,
    executives: 0,
    peerWorker: 0,
  },
  interviewing: {
    corporateRecruiter: 0,
    directorOfEngineering: 24,
    itTechnician: 0,
    humanResourcesManager: 12,
    executives: 9,
    peerWorker: 9,
  },
  benefitsPackagesRelocationCoordination: {
    corporateRecruiter: 0,
    directorOfEngineering: 0,
    itTechnician: 0,
    humanResourcesManager: 2,
    executives: 0,
    peerWorker: 0,
  },
}

const totalrecruitmentAndHiringHours = title => Object.values(recruitmentAndHiringHours).reduce(
  (acc, curr) => acc + curr[title], 0,
)

export const onboardingLabels = [
  'Technical Training', 'Orientation',
]

export const onboarding = {
  technicalTraining: {
    corporateRecruiter: 0,
    directorOfEngineering: 20,
    itTechnician: 0,
    humanResourcesManager: 0,
    executives: 0,
    peerWorker: 30,
  },
  orientation: {
    corporateRecruiter: 0,
    directorOfEngineering: 0,
    itTechnician: 2,
    humanResourcesManager: 5,
    executives: 0,
    peerWorker: 0,
  },
}

const totalHours = {
  corporateRecruiter: 42,
  directorOfEngineering: 46,
  itTechnician: 2,
  humanResourcesManager: 29,
  executives: 9,
  peerWorker: 103,
}

// const overtimeHours = salaryKeys.keys.reduce((acc, curr) => acc + exitHours.vacencyOvertime[curr], 0) // WHY ISNT THIS USED?

export const calculateCorporateRecruiterSalary = async () => {
  const salaries = await retrieveSalaries()
  const recruiter = salaries.find(salary => salary.title === 'Corporate Recruiter')
  const hourlyCost =
    Math.ceil(recruiter.totalSalary * (100 + recruiter.benefitsPercent) * totalHours.corporateRecruiter) / 100

  return hourlyCost
}

export const calculateOvertimeToCoverVacancy = async () => {
  const salaries = await retrieveSalaries()

  const cost = Object.entries(salaryKeys).reduce((acc, curr) => {
    const salary = salaries.find(currSalary => currSalary.title === curr[1])

    return acc + (Math.ceil(
      (salary.totalSalary * (100 + salary.benefitsPercent)) * exitHours.vacencyOvertime[curr[0]],
    ) / 100)
  }, 0)

  return Math.ceil(cost * 100) / 100
}

export const calculateRecruitmentAndHiringCost = async () => {
  const salaries = await retrieveSalaries()

  const cost = Object.entries(salaryKeys).reduce((acc, curr) => {
    const salary = salaries.find(currSalary => currSalary.title === curr[1])
    console.log(`totalrecruitmentAndHiringHours[curr[0]]: ${totalrecruitmentAndHiringHours(curr[0])}`)
    return acc + (Math.ceil(
      (salary.totalSalary * (100 + salary.benefitsPercent)) * totalrecruitmentAndHiringHours(curr[0]),
    ) / 100)
  }, 0)

  return Math.ceil(cost * 100) / 100
}
