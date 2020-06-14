import React from 'react'
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

  const componentDidMount = async () => {
    exitHidPersonnelExpen = await Summary.exitHidden.personnelExpenses()
    exitHidProductiveLoss = await Summary.exitHidden.productivityLosses(annualSalary) // ADD FORM FOR: moraleCost + productionDelayCost
    recruitDirPersonnelExpen = await Summary.recruitmentAndHiringDirect.personnelExpenses(annualSalary, usingRecruiter)
    recruitDirAdvert = await Summary.recruitmentAndHiringDirect.advertising()
    recruitDirSignOnAndRelocate = await Summary.recruitmentAndHiringDirect(
      offeringRelocationBonus, offeringSigningBonus,
    )
  }

  const exitDirSepPay = Summary.exitDirect.seperationPay(annualSalary)
  const exitHidProspective = Summary.exitHidden.prospectiveCosts() // ADD FORM FOR: unemploymentTaxIncrease + possibleLegalClaims
  const exitTotalSepPay = exitDirSepPay + Summary.exitHidden.seperationPay
  const exitTotalPersonnelExpen = Summary.exitDirect.personnelExpenses + exitHidPersonnelExpen
  const exitTotalProspective = Summary.exitDirect.prospectiveCosts + exitHidProspective
  const exitTotalProductiveLoss = Summary.exitDirect.productivityLosses + exitHidProductiveLoss

  const recruitHidProductiveLoss = Summary.recruitmentAndHiringHidden.productivityLosses(annualSalary) // ADD FORM FOR: lostCustomerCost
  const recruitTotalPersonnelExpen = recruitDirPersonnelExpen + Summary.recruitmentAndHiringHidden.personnelExpenses
  const recruitTotalAdvert = recruitDirAdvert + Summary.recruitmentAndHiringHidden.advertising
  const recruitTotalSignOnAndRelocate = recruitDirSignOnAndRelocate + Summary.recruitmentAndHiringHidden.signOnBonusesAndRelocation
  const recruitTotalProductiveLoss = Summary.recruitmentAndHiringDirect.productivityLosses + recruitHidProductiveLoss

  const onboardingDirOutsideTraining = Summary.onboardingDirect.outsideTraining() // ADD FORM FOR: travelAndRegistrationFees, outsideTrainer, workshopMaterials
  const onboardingHidProductiveLoss = Summary.onboardingHidden.productivityLosses(annualSalary)
  const onboardingTotalPersonnelExpense = Summary.onboardingDirect.personnelExpenses + Summary.onboardingHidden.personnelExpenses
  const onboardingTotalOutsideTraining = onboardingDirOutsideTraining + Summary.onboardingHidden.outsideTraining
  const onboardingTotalProductiveLoss = Summary.onboardingDirect.productivityLosses + onboardingHidProductiveLoss


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
          <Row valOne="Personnel Expenses" valTwo="" valThree="" valFour="" />
          <Row valOne="Prospective Costs" valTwo="" valThree="" valFour="" />
          <Row valOne="Productivity Losses" valTwo="" valThree="" valFour="" />
          <tr>
            <th>Recruitment and Hiring</th>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          <Row valOne="Personnel Expenses" valTwo="" valThree="" valFour="" />
          <Row valOne="Advertising" valTwo="" valThree="" valFour="" />
          <Row valOne="Sign-On Bonuses/Relocation" valTwo="" valThree="" valFour="" />
          <Row valOne="Productivity Losses" valTwo="" valThree="" valFour="" />
          <tr>
            <th>Onboarding</th>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          <Row valOne="Personnel Expenses" valTwo="" valThree="" valFour="" />
          <Row valOne="Outside Training" valTwo="" valThree="" valFour="" />
          <Row valOne="Productivity Losses" valTwo="" valThree="" valFour="" />
          <tr>
            <th colSpan="4">Snapshot by Type of Cost</th>
          </tr>
          <tr>
            <th>Exit</th>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          <tr>
            <th>Recruitment and Hiring</th>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          <tr>
            <th>Onboarding</th>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          <tr>
            <th>Total Cost of Loss of Employee</th>
            <th> </th>
            <th> </th>
            <th> </th>
          </tr>
          <tr>
            <th>OAF Program Cost</th>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          <Row valOne="" valTwo="" valThree="" valFour="" />
          <Row valOne="" valTwo="" valThree="" valFour="" />
          <tr>
            <th colSpan="3">Overall Savings with OA Program</th>
            <th> </th>
          </tr>
        </tbody>
      </table>
    </Page>
  )
}
