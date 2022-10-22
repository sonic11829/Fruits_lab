require('dotenv').config()
// Require modules
const express = require('express')
const methodOverride = require('method-override')
const db = require('./models/db')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')

// Configure the app (app.set)
/* Start Config */
app.use((req, res, next) => {
  res.locals.data = {}
  next()
})
app.engine('jsx', require('jsx-view-engine').createEngine())
app.set('view engine', 'jsx') // register the jsx view engine
db.once('open', () => {
  console.log('connected to MongoDB Atlas')
})
/* Start Middleware */
app.use(express.urlencoded({ extended: true })) // Creates req.body
app.use(cors())
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use('/fruits', require('./controllers/routeController'))
/* END Middleware */

// Tell the app to listen on a port
app.listen(PORT, () => {
  console.log('Listening on Port 3000', PORT)
})
