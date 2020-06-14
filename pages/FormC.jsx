import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Page from '../components/Page'
import Title from '../components/Title'
import Continue from '../components/Continue'
import Checkbox from '../components/Checkbox'

export default () => {
  const history = useHistory()
  const [usingRecruiter, setUsingRecruiter] = useState(false)
  const [offeringSigningBonus, setOfferingSigningBonus] = useState(false)
  const [offeringRelocationBonus, setOfferingRelocationBonus] = useState(false)

  const nextPage = () => history.push('/summary')

  useEffect(() => {
    localStorage.setItem('usingRecruiter', usingRecruiter)
    localStorage.setItem('offeringSigningBonus', offeringSigningBonus)
    localStorage.setItem('offeringRelocationBonus', offeringRelocationBonus)
  }, [usingRecruiter, offeringSigningBonus, offeringRelocationBonus])

  return (
    <Page>
      <Title />
      <Checkbox
        getter={usingRecruiter}
        setter={setUsingRecruiter}
        name="Is the Employer using an external corporate recruiter?"
      />
      <Checkbox
        getter={offeringSigningBonus}
        setter={setOfferingSigningBonus}
        name="Is the Employer offering a sign-on bonus?"
      />
      <Checkbox
        getter={offeringRelocationBonus}
        setter={setOfferingRelocationBonus}
        name="Is the Employer offering a relocation bonus?"
      />
      <Continue handleClick={nextPage} labelText="Continue" />
    </Page>
  )
}
