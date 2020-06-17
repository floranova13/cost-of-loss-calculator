import express from 'express'
import path from 'path'

// import  from './middlewares/jobPostings'
// import  from './middlewares/recruiterFees'
// import  from './middlewares/signingBonuses'
import {
  getAllJobPostings, getJobPostingById, saveNewJobPosting, patchJobPostingCost, patchJobPostingNotes, deleteJobPosting,
} from './controllers/jobPostings'
import {
  getAllRecruiterFees, getRecruiterFeeById, saveNewRecruiterFee,
  patchRecruiterFeeFee, patchRecruiterFeeSalary, deleteRecruiterFee,
} from './controllers/recruiterFees'
import {
  getAllSigningBonuses, getSigningBonusById, saveNewSigningBonus, patchSigningBonusAmount, deleteSigningBonus,
} from './controllers/signingBonuses'
import { getAllSalaries, getSalaryById } from './controllers/salaries'
import { getAllUserInputs, saveNewUserInput } from './controllers/userInputs'

const app = express()

app.use(express.static('public'))

// app.get('/api/v1/documentation', (req, res) => res.render('index', {}))

app.get('/api/v1/job-postings', getAllJobPostings)
app.get('/api/v1/job-postings/:id', getJobPostingById)
app.post('/api/v1/job-postings', express.json(), saveNewJobPosting)
app.patch('/api/v1/job-postings/cost/:id', express.json(), patchJobPostingCost)
app.patch('/api/v1/job-postings/notes/:id', express.json(), patchJobPostingNotes)
app.delete('/api/v1/job-postings/:id', deleteJobPosting)

app.get('/api/v1/recruiter-fees', getAllRecruiterFees)
app.get('/api/v1/recruiter-fees/:id', getRecruiterFeeById)
app.post('/api/v1/recruiter-fees', express.json(), saveNewRecruiterFee)
app.patch('/api/v1/recruiter-fees/fee/:id', express.json(), patchRecruiterFeeFee)
app.patch('/api/v1/recruiter-fees/salary/:id', express.json(), patchRecruiterFeeSalary)
app.delete('/api/v1/recruiter-fees/:id', deleteRecruiterFee)

app.get('/api/v1/signing-bonuses', getAllSigningBonuses)
app.get('/api/v1/signing-bonuses/:id', getSigningBonusById)
app.post('/api/v1/signing-bonuses', express.json(), saveNewSigningBonus)
app.patch('/api/v1/signing-bonuses/:id', express.json(), patchSigningBonusAmount)
app.delete('/api/v1/signing-bonuses/:id', deleteSigningBonus)

app.get('/api/v1/salaries', getAllSalaries)
app.get('/api/v1/salaries/:id', getSalaryById)

app.get('/api/v1/userInputs', getAllUserInputs)
app.post('/api/v1/userInputs', express.json(), saveNewUserInput)

app.all('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')))

app.listen(9633, () => { console.log('Listening on port 9633...') }) // eslint-disable-line no-console
