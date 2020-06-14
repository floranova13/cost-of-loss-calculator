import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Page from '../components/Page'
import Title from '../components/Title'
import Continue from '../components/Continue'
import TextInput from '../components/TextInput'

export default () => {
  const history = useHistory()
  const [nameFirst, setNameFirst] = useState('')
  const [nameLast, setNameLast] = useState('')

  const nextPage = () => (!nameFirst || !nameLast ? null : history.push('/formA'))

  useEffect(() => {
    localStorage.setItem('nameFirst', nameFirst)
    localStorage.setItem('nameLast', nameLast)
  }, [nameFirst, nameLast])

  return (
    <Page>
      <Title />
      <TextInput getter={nameFirst} setter={setNameFirst} name="First Name:" />
      <TextInput getter={nameLast} setter={setNameLast} name="Last Name:" />
      <Continue handleClick={nextPage} labelText="Begin" />
    </Page>
  )
}
