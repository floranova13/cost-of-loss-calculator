
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'



export default () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [quest2, setQuest2] = useState('')
  const [quest3, setQuest3] = useState('')
  const [quest4, setQuest4] = useState('')
  const [quest5, setQuest5] = useState('')
  const [quest6, setQuest6] = useState('')
  const [submit7, setSubmit7] = useState('')




  return (
    <div className="page">
      <Title />
      <Image />
      <div className='subtitle'> Please fill out form below to calculate the cost of losing an emplyee</div>
      <form classname='calculator'>
        <h1> Please type your answers into input box.</h1>
        <p> Question 1: PLease enter starting time-period for data.</p>
        <input name='startDate' type={number} value={startDate} onChange={e => setStartDate(e.target.value)} />
        </br>
      <p> Please enter ending time-period for data.</p>
      <input name='endDate' type={number} value={endDate} onChange={e => setEndDate(e.target.value)} />
      </br>
    <p> Question 2: What company Industry are you in?</p>
    <input name='quest2' type={text} value={quest2} onChange={e => setQuest2(e.target.value)} />
      </br >
    <p> Question 3: What is your Occupational Specialty? </p>
    <input name='quest3' type={text} value={quest3} onChange={e => setQuest3(e.target.value)} />
      </br >
    <p> Question 4: What is your job title?</p>
    <input name='quest4' type={text} value={quest4} onChange={e => setQuest4(e.target.value)} />
      </br >
    <p>Question 5: What is your NAICS code? </p>
    <input name='quest5' type={number} value={quest5} onChange={e => setQuest5(e.target.value)} />
      </br >
    <p> Question 6: What is the employees annual salary?</p>
    <input name='quest6' type={number} value={quest6} onChange={e => setQuest6(e.target.value)} />
      </br >
    <p> Question 7: What is employee hourly Salary?</p>
    <input name='quest7' type={number} value={quest7} onChange={e => setQuest7(e.target.value)} />
    <button name='next' type={NavLink}>Next</button>
      
    </form >

    </div >
  )
}
