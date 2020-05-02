const express = require('express')
const path = require('path')

const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug')

app.get('/', (request, response) => {
  response.render('index', {})
})

app.get('*', (request, response) => {
  return response.status('404').send('404, Page not found.')
})

app.listen(16361, () => {
  console.log('Listening on port 16361...') // eslint-disable-line no-console
})
