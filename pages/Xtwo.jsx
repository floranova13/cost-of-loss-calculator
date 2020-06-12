import React, { useState } from 'react'
import Navlink from 'react-router-dom'



export default () => {
  const [quest8, setQuest8] = useState('')
  const [quest9, setQuest9] = useState('')
  const [quest10, setQuest10] = useState('')
  const [quest11, setQuest11] = useState('')
  const [quest12, setQuest12] = useState('')

    < div className = 'page' >
      <form className='masterform'>
        <p> Question 8: What is employees SOC Code? </p>
        <input name='quest8' type={number} value={quest8} onChange={e => setQuest8(e.target.value)} />
      </br>
      <p> Question 9: What is employees EIR degree?</p>
      <input name='quest9' type={text} value={quest9} onChange={e => setQuest9(e.target.value)} />
      </br >
    <p>Question 10: Is the employer using an external corporate recruiter? </p>
    <input name='quest10' type={text} value={quest10} onChange={e => setQuest10(e.target.value)} />
      </br >
    <p> Question 11: Is the employer offering a sign-on bonus?</p>
    <input name='quest11' type={text} value={quest11} onChange={e => setQuest11(e.target.value)} />
    </br >
    <p> Question 12: Is the employer offering a relocation bonus?</p>
    <input name='quest12' type={text} value={quest12} onChange={e => setQuest12(e.target.value)} />
    <button name='submit' onClick={() => this.onSubmit()} />
    </form >
  </div >