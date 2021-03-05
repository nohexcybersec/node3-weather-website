//Use Nodemon to RESTART the SERVER for example : nodemon app.js
// use this to also refresh views, partial files : nodemon app.js -e js,hbs
//expressjs.com   site to view API 
//SEARCH string http://127.0.0.1:3000/products?search=games&rating=5

const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//setup handlebars engine and views location
app.set('views', path.join(__dirname, '../templates/views')) 
//app.set('views', path.join(__dirname, '../templates/partials')) 
//app.set('views', path.join(__dirname, '../views')) 
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', function (req, res) {
        res.render('index', {
        title: 'Weather Page', 
        name: 'Marty created'
    })
  })

  app.get('/about', function (req, res) {
       res.render('about', {
        title: 'About Page', 
        name: 'Marty created'
    })
  })

  app.get('/help', function (req, res) {
    res.render('help', {
     title: 'Help Page', 
     name: 'Marty created',
     msg: "The HELP word of the day is we can HELP!"
 })
})

// app.get('/weather', (req, res) => {
//     res.send([{
//         location: 'Melbourne'       
//     }, {
//         forecast: '8 degrees'
//     }])
// })


app.get('/weather',(req, res)  => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
        geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
            if(error){
                return res.send({error})
            }

            forecast(lattitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address

                })

            })
        })
   
})



app.get('/products',(req, res)  => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})



app.get('/help/*', function (req, res) {
  res.render('404',{
      title: '404',
      name: 'Marty',
      errorMsg: 'Help article not found'
  })
})

app.get('*', function (req, res) {
  res.render('404',{
      title: '404',
      name: 'Marty',
      errorMsg: 'Page not Found'
  })
})



// Need to start the SERVER and listen on a specific PORT, using port 3k which is a develeopment port

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})