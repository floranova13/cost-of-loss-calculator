const express = require('express')
const path = require('path')
const { checkRoute } = require('./middlewares/jobPostings')
const { getJobPostingBySlug, saveNewJobPosting } = require('./controllers/jobPostings')

const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('index', {}))

app.get('/documentation', (req, res) => res.render('index', {}))

app.get('/job-postings/:slug?', checkRoute, getJobPostingBySlug)

app.post('/job-postings', saveNewJobPosting)

app.get('*', (req, res) => res.status('404').send('404, Page not found.'))

app.listen(16361, () => { console.log('Listening on port 16361...') }) // eslint-disable-line no-console
