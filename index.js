const express = require('express')
const path = require('path')
const { checkJobPostingsRoute } = require('./middlewares/jobPostings')
const { checkRecruiterFeesRoute } = require('./middlewares/recruiterFees')
const { checkSigningBonusesRoute } = require('./middlewares/signingBonuses')
const { getJobPostingBySlug, saveNewJobPosting } = require('./controllers/jobPostings')
const { getRecruiterFeeById, saveNewRecruiterFee, patchRecruiterFee } = require('./controllers/recruiterFees')
const { getSigningBonusBySlug, saveNewSigningBonus, patchSigningBonus } = require('./controllers/signingBonuses')

const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('index', {}))

app.get('/documentation', (req, res) => res.render('index', {}))

app.get('/job-postings/:slug?', checkJobPostingsRoute, getJobPostingBySlug)

app.post('/job-postings', saveNewJobPosting)

app.get('/recruiter-fees/:id?', checkRecruiterFeesRoute, getRecruiterFeeById)

app.post('/recruiter-fees', saveNewRecruiterFee)

app.patch('/recruiter-fees/:id', patchRecruiterFee)

app.get('/signing-bonuses/:slug?', checkSigningBonusesRoute, getSigningBonusBySlug)

app.post('/signing-bonuses', saveNewSigningBonus)

app.patch('/signing-bonuses/:slug', patchSigningBonus)

app.get('*', (req, res) => res.status('404').send('404, Page not found.'))

app.listen(16361, () => { console.log('Listening on port 16361...') }) // eslint-disable-line no-console
