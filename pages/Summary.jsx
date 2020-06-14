import React, { useEffect } from 'react'
import Page from '../components/Page'
import Title from '../components/Title'
import Row from '../components/TableRow'
import * as Summary from '../utils/summary'

export default () => {
  const annualSalary = localStorage.getItem('annualSalary')
  const usingRecruiter = localStorage.getItem('usingRecruiter')
  const offeringSigningBonus = localStorage.getItem('offeringSigningBonus')
  const offeringRelocationBonus = localStorage.getItem('offeringRelocationBonus')

  let exitHidProductiveLoss
  let exitHidPersonnelExpen
  let recruitDirPersonnelExpen
  let recruitDirAdvert
  let recruitDirSignOnAndRelocate

  useEffect(() => {
    (async function calculateSummary() {
      exitHidPersonnelExpen = await Summary.exitHidden.personnelExpenses()
      exitHidProductiveLoss = await Summary.exitHidden.productivityLosses(annualSalary) // ADD FORM FOR: moraleCost + productionDelayCost
      recruitDirPersonnelExpen =
        await Summary.recruitmentAndHiringDirect.personnelExpenses(annualSalary, usingRecruiter)
      recruitDirAdvert = await Summary.recruitmentAndHiringDirect.advertising()
      recruitDirSignOnAndRelocate = await Summary.recruitmentAndHiringDirect(
        offeringRelocationBonus, offeringSigningBonus,
      )
    }())
  }, [])

  const exitDirSepPay = Summary.exitDirect.seperationPay(annualSalary)
  const exitHidProspective = Summary.exitHidden.prospectiveCosts() // ADD FORM FOR: unemploymentTaxIncrease + possibleLegalClaims
  const exitTotalSepPay = exitDirSepPay + Summary.exitHidden.seperationPay
  const exitTotalPersonnelExpen = Summary.exitDirect.personnelExpenses + exitHidPersonnelExpen
  const exitTotalProspective = Summary.exitDirect.prospectiveCosts + exitHidProspective
  const exitTotalProductiveLoss = Summary.exitDirect.productivityLosses + exitHidProductiveLoss

  const recruitHidProductiveLoss = Summary.recruitmentAndHiringHidden.productivityLosses(annualSalary) // ADD FORM FOR: lostCustomerCost
  const recruitTotalPersonnelExpen = recruitDirPersonnelExpen + Summary.recruitmentAndHiringHidden.personnelExpenses
  const recruitTotalAdvert = recruitDirAdvert + Summary.recruitmentAndHiringHidden.advertising
  const recruitTotalSignOnAndRelocate =
    recruitDirSignOnAndRelocate + Summary.recruitmentAndHiringHidden.signOnBonusesAndRelocation
  const recruitTotalProductiveLoss = Summary.recruitmentAndHiringDirect.productivityLosses + recruitHidProductiveLoss

  const onboardingDirOutsideTraining = Summary.onboardingDirect.outsideTraining() // ADD FORM FOR: travelAndRegistrationFees, outsideTrainer, workshopMaterials
  const onboardingHidProductiveLoss = Summary.onboardingHidden.productivityLosses(annualSalary)
  const onboardingTotalPersonnelExpense =
    Summary.onboardingDirect.personnelExpenses + Summary.onboardingHidden.personnelExpenses
  const onboardingTotalOutsideTraining = onboardingDirOutsideTraining + Summary.onboardingHidden.outsideTraining
  const onboardingTotalProductiveLoss = Summary.onboardingDirect.productivityLosses + onboardingHidProductiveLoss

  const snapExitDir =
    exitDirSepPay + Summary.exitDirect.personnelExpenses +
    Summary.exitDirect.prospectiveCosts + Summary.exitDirect.productivityLosses
  const snapExitHid =
    Summary.exitHidden.seperationPay + exitHidPersonnelExpen + exitHidProspective + exitHidProductiveLoss
  const snapRecruitDir =
    recruitDirPersonnelExpen + recruitDirAdvert + recruitDirSignOnAndRelocate +
    Summary.recruitmentAndHiringDirect.productivityLosses
  const snapRecruitHid =
    Summary.recruitmentAndHiringHidden.personnelExpenses + Summary.recruitmentAndHiringHidden.advertising +
    Summary.recruitmentAndHiringHidden.signOnBonusesAndRelocation + recruitHidProductiveLoss
  const snapOnboardingDir =
    Summary.onboardingDirect.personnelExpenses + onboardingDirOutsideTraining +
    Summary.onboardingDirect.productivityLosses
  const snapOnboardingHid =
    Summary.onboardingHidden.personnelExpenses + Summary.onboardingHidden.outsideTraining + onboardingHidProductiveLoss
  const snapTotalDir = snapExitDir + snapRecruitDir + snapOnboardingDir
  const snapTotalHid = snapExitHid + snapRecruitHid + snapOnboardingHid

  return (
    <Page>
      <Title />
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>Direct</th>
            <th>Hidden</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <Row valOne="" valTwo="Administrative" valThree="Prospective &amp; Productivity" valFour="" />
          <tr>
            <th>Exit</th>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          <Row
            valOne="Seperation Pay"
            valTwo={exitDirSepPay}
            valThree={Summary.exitHidden.seperationPay}
            valFour={exitTotalSepPay}
          />
          <Row
            valOne="Personnel Expenses"
            valTwo={Summary.exitDirect.personnelExpenses}
            valThree={exitHidPersonnelExpen}
            valFour={exitTotalPersonnelExpen}
          />
          <Row
            valOne="Prospective Costs"
            valTwo={Summary.exitDirect.prospectiveCosts}
            valThree={exitHidProspective}
            valFour={exitTotalProspective}
          />
          <Row
            valOne="Productivity Losses"
            valTwo={Summary.exitDirect.productivityLosses}
            valThree={exitHidProductiveLoss}
            valFour={exitTotalProductiveLoss}
          />
          <tr>
            <th>Recruitment and Hiring</th>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          <Row
            valOne="Personnel Expenses"
            valTwo={recruitDirPersonnelExpen}
            valThree={Summary.recruitmentAndHiringHidden.personnelExpenses}
            valFour={recruitTotalPersonnelExpen}
          />
          <Row
            valOne="Advertising"
            valTwo={recruitDirAdvert}
            valThree={Summary.recruitmentAndHiringHidden.advertising}
            valFour={recruitTotalAdvert}
          />
          <Row
            valOne="Sign-On Bonuses/Relocation"
            valTwo={recruitDirSignOnAndRelocate}
            valThree={Summary.recruitmentAndHiringHidden.signOnBonusesAndRelocation}
            valFour={recruitTotalSignOnAndRelocate}
          />
          <Row
            valOne="Productivity Losses"
            valTwo={Summary.recruitmentAndHiringDirect.productivityLosses}
            valThree={recruitHidProductiveLoss}
            valFour={recruitTotalProductiveLoss}
          />
          <tr>
            <th>Onboarding</th>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          <Row
            valOne="Personnel Expenses"
            valTwo={Summary.onboardingDirect.personnelExpenses}
            valThree={Summary.onboardingHidden.personnelExpenses}
            valFour={onboardingTotalPersonnelExpense}
          />
          <Row
            valOne="Outside Training"
            valTwo={onboardingDirOutsideTraining}
            valThree={Summary.onboardingHidden.outsideTraining}
            valFour={onboardingTotalOutsideTraining}
          />
          <Row
            valOne="Productivity Losses"
            valTwo={Summary.onboardingDirect.productivityLosses}
            valThree={onboardingHidProductiveLoss}
            valFour={onboardingTotalProductiveLoss}
          />
          <tr>
            <th colSpan="4">Snapshot by Type of Cost</th>
          </tr>
          <tr>
            <th>Exit</th>
            <td>{snapExitDir}</td>
            <td>{snapExitHid}</td>
            <td>{snapExitDir + snapExitHid}</td>
          </tr>
          <tr>
            <th>Recruitment and Hiring</th>
            <td>{snapRecruitDir}</td>
            <td>{snapRecruitHid}</td>
            <td>{snapExitDir + snapExitHid}</td>
          </tr>
          <tr>
            <th>Onboarding</th>
            <td>{snapOnboardingDir}</td>
            <td>{snapOnboardingHid}</td>
            <td>{snapOnboardingDir + snapOnboardingHid}</td>
          </tr>
          <tr>
            <th>Total Cost of Loss of Employee</th>
            <th>{snapTotalDir}</th>
            <th>{snapTotalHid}</th>
            <th>{snapTotalDir + snapTotalHid}</th>
          </tr>
          <tr>
            <td>OAF Program Cost</td>
            <td> </td>
            <td> </td>
            <td>{Summary.programCost}</td>
          </tr>
          <Row valOne="" valTwo="" valThree="" valFour="" />
          <Row valOne="" valTwo="" valThree="" valFour="" />
          <tr>
            <th colSpan="3">Overall Savings with OA Program</th>
            <th>{snapTotalDir + snapTotalHid - Summary.programCost}</th>
          </tr>
        </tbody>
      </table>
    </Page>
  )
}
