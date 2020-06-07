import express from 'express'
import path from 'path'

// import  from './middlewares/jobPostings'
// import  from './middlewares/recruiterFees'
// import  from './middlewares/signingBonuses'
import { getAllJobPostings, getJobPostingBySlug, saveNewJobPosting } from './controllers/jobPostings'
import {
  getAllRecruiterFees, getRecruiterFeeById, saveNewRecruiterFee, patchRecruiterFee,
} from './controllers/recruiterFees'
import {
  getAllSigningBonuses, getSigningBonusBySlug, saveNewSigningBonus, patchSigningBonus,
} from './controllers/signingBonuses'
import {
  getAllSalaries, patchSalary,
} from './controllers/salaries'

const app = express()

app.use(express.static('public'))

app.get('/api/v1/documentation', (req, res) => res.render('index', {}))

app.get('/api/v1/job-postings', getAllJobPostings)
app.get('/api/v1/job-postings/:id', getJobPostingById)
app.post('/api/v1/job-postings', saveNewJobPosting)

app.get('/api/v1/recruiter-fees', getAllRecruiterFees)
app.get('/api/v1/recruiter-fees/:id', getRecruiterFeeById)
app.post('/api/v1/recruiter-fees', saveNewRecruiterFee)
app.patch('/api/v1/recruiter-fees/:id', patchRecruiterFee)

app.get('/api/v1/signing-bonuses', getAllSigningBonuses)
app.get('/api/v1/signing-bonuses/:id', getSigningBonusById)
app.post('/api/v1/signing-bonuses', saveNewSigningBonus)
app.patch('/api/v1/signing-bonuses/:id', patchSigningBonus)

app.get('/api/v1/salaries', getAllSalaries)
app.patch('/api/v1/salaries/:id', patchSalary)

app.all('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')))

// MAKE A CUSTOM 404 PAGE

app.listen(16361, () => { console.log('Listening on port 16361...') }) // eslint-disable-line no-console
