import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Page from '../components/Page'
import Title from '../components/Title'
import Continue from '../components/Continue'
import TextInput from '../components/TextInput'
import NumberInput from '../components/NumberInput'

export default () => {
  const history = useHistory()
  const [annualSalary, setAnnualSalary] = useState(0)
  const [hourlySalary, setHourlySalary] = useState(0)
  const [weeklyWorkHours, setWeeklyWorkHours] = useState(40)
  const [oesSecCode, setOesSecCode] = useState('')
  const [degree, setDegree] = useState('')

  const nextPage = () => (!annualSalary || !oesSecCode || !degree
    ? null : history.push('/formC'))

  useEffect(() => {
    localStorage.setItem('annualSalary', annualSalary)
    localStorage.setItem('hourlySalary', hourlySalary)
    localStorage.setItem('weeklyWorkHours', weeklyWorkHours)
    localStorage.setItem('oesSecCode', oesSecCode)
    localStorage.setItem('degree', degree)
  }, [annualSalary, hourlySalary, weeklyWorkHours, oesSecCode, degree])

  // if (checkbox.checked) activeElement.value = Math.round(inactiveElement.value / 2080 * 100) / 100
  // if (!checkbox.checked) activeElement.value = Math.round(inactiveElement.value * 2080 * 100) / 100

  return (
    <Page>
      <Title />
      <NumberInput getter={annualSalary} setter={setAnnualSalary} name="DOL Annual Salary:" step="0.01" />
      <NumberInput getter={hourlySalary} setter={setHourlySalary} name="DOL Hourly Salary:" step="0.01" />
      <NumberInput getter={weeklyWorkHours} setter={setWeeklyWorkHours} name="Weekly Work Hours:" step="1" />
      <TextInput
        getter={oesSecCode}
        setter={setOesSecCode}
        name="OES/SOC Code:"
      />
      <TextInput getter={degree} setter={setDegree} name="Expert-in-Residence (EIR) Degree:" />
      <Continue handleClick={nextPage} labelText="Continue" />
    </Page>
  )
}
