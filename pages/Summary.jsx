import React, { useState, useEffect } from 'react'
import Pdf from 'react-to-pdf'
import axios from 'axios'
import styled from 'styled-components'
import Page from '../components/Page'
import Title from '../components/Title'
import Row from '../components/TableRow'
import * as Summary from '../utils/summary'
import asDollars from '../utils'

const ref = React.createRef()

const Print = styled.button`
  font-size: 18px;
  margin: 20px auto;
  text-align: center;
  border: 3px solid #214080;
  border-radius: 3px;
  background-color: #774C9E;
  color: white;
  display: block;
  width: 210px;
`

const Readout = styled.div`
  margin: auto;
`

export default () => {
  const [exitHidPersonnelExpen, setExitHidPersonnelExpen] = useState(0)
  const [exitHidProductiveLoss, setExitHidProductiveLoss] = useState(0)
  const [recruitDirPersonnelExpen, setRecruitDirPersonnelExpen] = useState(0)
  const [recruitDirAdvert, setRecruitDirAdvert] = useState(0)
  const [recruitDirSignOnAndRelocate, setRecruitDirSignOnAndRelocate] = useState(0)

  const nameFirst = localStorage.getItem('nameFirst')
  const nameLast = localStorage.getItem('nameLast')
  const periodStart = localStorage.getItem('periodStart')
  const periodEnd = localStorage.getItem('periodEnd')
  const companyIndustry = localStorage.getItem('companyIndustry')
  const occupationalSpecialty = localStorage.getItem('occupationalSpecialty')
  const jobTitle = localStorage.getItem('jobTitle')
  const laborCode = localStorage.getItem('laborCode')
  const annualSalary = Number(localStorage.getItem('annualSalary'))
  const hourlySalary = Number(localStorage.getItem('hourlySalary'))
  const weeklyWorkHours = Number(localStorage.getItem('weeklyWorkHours'))
  const oesSecCode = localStorage.getItem('oesSecCode')
  const degree = localStorage.getItem('degree')
  const usingRecruiter = localStorage.getItem('usingRecruiter') === 'true'
  const offeringSigningBonus = localStorage.getItem('offeringSigningBonus') === 'true'
  const offeringRelocationBonus = localStorage.getItem('offeringRelocationBonus') === 'true'

  useEffect(() => {
    async function calculateSummary() {
      const eHPersonnelExpen = await Summary.exitHidden.personnelExpenses()
      const eHProductiveLoss = await Summary.exitHidden.productivityLosses(annualSalary) // ADD FORM FOR: moraleCost + productionDelayCost
      const rDPersonnelExpen =
        await Summary.recruitmentAndHiringDirect.personnelExpenses(annualSalary, usingRecruiter)
      const rDAdvert = await Summary.recruitmentAndHiringDirect.advertising()
      const rDSignOnAndRelocate =
        await Summary.recruitmentAndHiringDirect.signOnBonusesAndRelocation(
          offeringRelocationBonus, offeringSigningBonus,
        )

      setExitHidPersonnelExpen(eHPersonnelExpen)
      setExitHidProductiveLoss(eHProductiveLoss)
      setRecruitDirPersonnelExpen(rDPersonnelExpen)
      setRecruitDirAdvert(rDAdvert)
      setRecruitDirSignOnAndRelocate(rDSignOnAndRelocate)
    }
    calculateSummary()
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

  const saveEntry = async () => {
    await axios.post(`${API_BASE_URL}/userInputs`, { // eslint-disable-line no-undef
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
      externalCorporateRecruiter: usingRecruiter,
      signOnBonus: offeringSigningBonus,
      relocationBonus: offeringRelocationBonus,
    })
  }

  return (
    <Page>
      <Readout ref={ref}>
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
              valTwo={asDollars(exitDirSepPay)}
              valThree={asDollars(Summary.exitHidden.seperationPay)}
              valFour={asDollars(exitTotalSepPay)}
            />
            <Row
              valOne="Personnel Expenses"
              valTwo={asDollars(Summary.exitDirect.personnelExpenses)}
              valThree={asDollars(exitHidPersonnelExpen)}
              valFour={asDollars(exitTotalPersonnelExpen)}
            />
            <Row
              valOne="Prospective Costs"
              valTwo={asDollars(Summary.exitDirect.prospectiveCosts)}
              valThree={asDollars(exitHidProspective)}
              valFour={asDollars(exitTotalProspective)}
            />
            <Row
              valOne="Productivity Losses"
              valTwo={asDollars(Summary.exitDirect.productivityLosses)}
              valThree={asDollars(exitHidProductiveLoss)}
              valFour={asDollars(exitTotalProductiveLoss)}
            />
            <tr>
              <th>Recruitment and Hiring</th>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <Row
              valOne="Personnel Expenses"
              valTwo={asDollars(recruitDirPersonnelExpen)}
              valThree={asDollars(Summary.recruitmentAndHiringHidden.personnelExpenses)}
              valFour={asDollars(recruitTotalPersonnelExpen)}
            />
            <Row
              valOne="Advertising"
              valTwo={asDollars(recruitDirAdvert)}
              valThree={asDollars(Summary.recruitmentAndHiringHidden.advertising)}
              valFour={asDollars(recruitTotalAdvert)}
            />
            <Row
              valOne="Sign-On Bonuses/Relocation"
              valTwo={asDollars(recruitDirSignOnAndRelocate)}
              valThree={asDollars(Summary.recruitmentAndHiringHidden.signOnBonusesAndRelocation)}
              valFour={asDollars(recruitTotalSignOnAndRelocate)}
            />
            <Row
              valOne="Productivity Losses"
              valTwo={asDollars(Summary.recruitmentAndHiringDirect.productivityLosses)}
              valThree={asDollars(recruitHidProductiveLoss)}
              valFour={asDollars(recruitTotalProductiveLoss)}
            />
            <tr>
              <th>Onboarding</th>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <Row
              valOne="Personnel Expenses"
              valTwo={asDollars(Summary.onboardingDirect.personnelExpenses)}
              valThree={asDollars(Summary.onboardingHidden.personnelExpenses)}
              valFour={asDollars(onboardingTotalPersonnelExpense)}
            />
            <Row
              valOne="Outside Training"
              valTwo={asDollars(onboardingDirOutsideTraining)}
              valThree={asDollars(Summary.onboardingHidden.outsideTraining)}
              valFour={asDollars(onboardingTotalOutsideTraining)}
            />
            <Row
              valOne="Productivity Losses"
              valTwo={asDollars(Summary.onboardingDirect.productivityLosses)}
              valThree={asDollars(onboardingHidProductiveLoss)}
              valFour={asDollars(onboardingTotalProductiveLoss)}
            />
            <tr>
              <th colSpan="4">Snapshot by Type of Cost</th>
            </tr>
            <tr>
              <th>Exit</th>
              <td>{asDollars(snapExitDir)}</td>
              <td>{asDollars(snapExitHid)}</td>
              <td>{asDollars(snapExitDir + snapExitHid)}</td>
            </tr>
            <tr>
              <th>Recruitment and Hiring</th>
              <td>{asDollars(snapRecruitDir)}</td>
              <td>{asDollars(snapRecruitHid)}</td>
              <td>{asDollars(snapRecruitDir + snapRecruitHid)}</td>
            </tr>
            <tr>
              <th>Onboarding</th>
              <td>{asDollars(snapOnboardingDir)}</td>
              <td>{asDollars(snapOnboardingHid)}</td>
              <td>{asDollars(snapOnboardingDir + snapOnboardingHid)}</td>
            </tr>
            <tr>
              <th>Total Cost of Loss of Employee</th>
              <th>{asDollars(snapTotalDir)}</th>
              <th>{asDollars(snapTotalHid)}</th>
              <th>{asDollars(snapTotalDir + snapTotalHid)}</th>
            </tr>
            <tr>
              <td>OAF Program Cost</td>
              <td> </td>
              <td> </td>
              <td>{asDollars(Summary.programCost)}</td>
            </tr>
            <Row valOne="" valTwo="" valThree="" valFour="" />
            <Row valOne="" valTwo="" valThree="" valFour="" />
            <tr>
              <th colSpan="3">Overall Savings with OA Program</th>
              <th>{asDollars(snapTotalDir + snapTotalHid - Summary.programCost)}</th>
            </tr>
          </tbody>
        </table>
      </Readout>
      <Pdf targetRef={ref} filename="summary.pdf" onComplete={saveEntry}>
        {({ toPdf }) => <Print type="button" onClick={toPdf}>Generate Pdf</Print>}
      </Pdf>
    </Page>
  )
}
