import React, { useState } from 'react'



export default () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [quest2, setQuest2] = useState('')
  const [quest3, setQuest3] = useState('')
  const [quest4, setQuest4] = useState('')
  const [quest5, setQuest5] = useState('')
  const [quest6, setQuest6] = useState('')
  const [submit, setSubmit] = useState('')




  return (
    <div className="page">
      <div className="title">Open Avenues Foundation</div>
      <img src="openAvenues.png" alt="Logo" width="500" height="600"></img>
      <div className='subtitle'> Please fill out form below to calculate the cost of losing an emplyee</div>
      <form classname='calculator'>
        <h1> Please type your answers into input box.</h1>
        <p> Question 1: PLease enter starting time-period for data.</p>
        <input name='startDate' type={Number} value={this.state.startDate} onChange={e => setStartDate(e.target.value)} />
        </br>
      <p> Please enter ending time-period for data.</p>
      <input name='endDate' type={Number} value={this.state.startDate} onChange={e => setEndDate(e.target.value)} />
      </br>
    <p> Question 2: What company Industry are you in?</p>
    <input name='quest2' type={Text} value={this.state.quest2} onChange={e => setQuest2(e.target.value)} />
      </br >
    <p> Question 3: What is your Occupational Specialty? </p>
    <input name='quest3' type={text} value={this.state.quest3} onChange={e => setQuest3(e.target.value)} />
      </br >
    <p> Question 4: What is your job title?</p>
    <input name='quest4' type={text} value={this.state.quest4} onChange={e => setQuest4(e.target.value)} />
      </br >
    <p>Question 5: What is your NAICS code? </p>
    <input name='quest5' type={Number} value={this.state.quest5} onChange={e => setQuest5(e.target.value)} />
      </br >
    <p> Question 6: What is the emplyees annual salary?</p>
    <input name='quest6' type={Number} value={this.state.quest6} onChange={e => setQuest6(e.target.value)} />
      </br >
    <button name='submit' onClick={() => this.onSubmit()} />
      
</ form >

    </div >
  )
}
