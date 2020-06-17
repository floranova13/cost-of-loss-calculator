import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Page from '../components/Page'
import Title from '../components/Title'
import Continue from '../components/Continue'
import TextInput from '../components/TextInput'
import DateInput from '../components/DateInput'

export default () => {
  const history = useHistory()
  const [periodStart, setPeriodStart] = useState('')
  const [periodEnd, setPeriodEnd] = useState('')
  const [companyIndustry, setCompanyIndustry] = useState('')
  const [occupationalSpecialty, setOccupationalSpecialty] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [laborCode, setLaborCode] = useState('')

  const nextPage = () => (!periodStart || !periodEnd || !companyIndustry || !occupationalSpecialty || !laborCode
    ? null : history.push('/formB'))

  useEffect(() => {
    localStorage.setItem('periodStart', periodStart)
    localStorage.setItem('periodEnd', periodEnd)
    localStorage.setItem('companyIndustry', companyIndustry)
    localStorage.setItem('occupationalSpecialty', occupationalSpecialty)
    localStorage.setItem('jobTitle', jobTitle)
    localStorage.setItem('laborCode', laborCode)
  }, [periodStart, periodEnd, companyIndustry, occupationalSpecialty, jobTitle, laborCode])

  return (
    <Page>
      <Title />
      <DateInput getter={periodStart} setter={setPeriodStart} name="Time Period - Start:" />
      <DateInput getter={periodEnd} setter={setPeriodEnd} name="Time Period - End:" />
      <TextInput getter={companyIndustry} setter={setCompanyIndustry} name="Company Industry:" />
      <TextInput
        getter={occupationalSpecialty}
        setter={setOccupationalSpecialty}
        name="Expert-in-Residence (EIR) Occupational Specialty:"
      />
      <TextInput getter={jobTitle} setter={setJobTitle} name="Expert-in-Residence (EIR) Job Title:" />
      <TextInput getter={laborCode} setter={setLaborCode} name="Labor NAICS Code:" />
      <Continue handleClick={nextPage} labelText="Continue" />
    </Page>
  )
}
