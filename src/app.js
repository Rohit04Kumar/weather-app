const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Defiene paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Rohit Kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Rohit Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText : 'This is some helpful text',
        title : 'Help',
        name : 'Rohit kumar'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'No address found'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
    // res.send({
    //     forecast : 'It is snowing',
    //     location : 'Bengaluru',
    //     address : req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'Yoy must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
 res.render('404', {
     title : '404',
     name : 'Rohit Kumar',
     errorMessage : 'Help article not found'
 })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404 !',
        errorMessage : 'Page Not Found',
        name : 'Rohit Kumar'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000.')
})