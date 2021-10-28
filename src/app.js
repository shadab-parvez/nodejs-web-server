const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

console.log(__dirname)
console.log(path.join(__dirname, '..'))

// Define paths from express config
const publicDirectoryPth = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Init the express engine
const app = express()

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('x-powered-by', false)
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPth))

// app.get('', (req, res) => {
//     res.send('Hello Express!')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shadab'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About myself',
        name: 'Shadab'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help title',
        helpmessage: 'Help text'
    })
})

// app.get('/help', (req, res) => {
//     res.sendFile('/help.html')
// })

app.get('/json', (req, res) => {
    res.send({name: 'Shadab', age: 39})
})

app.get('/products', (req, res) => {
    
    if(!req.query.search){
        return res.send({error: 'You must provide search item'})
    }
    console.log(req.query.search)
    res.send({products: []})
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Help text',
        errorMessage: 'Help article not found'
    })
})





app.get('/weather', (req, res) => {
    const url = 'http://api.weatherstack.com/current?access_key=bfc61b9137df53f89c63e9d4350f32d6&query=' + req.query.location    
    request({
        url:url, 
        json : true
    }, (error, response) => {
        if(error) {
            return res.send(error)
        }
        
        res.send({
            temperature: response.body.current.temperature,
            precipitation: response.body.current.precip,
            description: response.body.current.weather_descriptions[0]
        })
        console.log(response.body.current.temperature)
        console.log(response.body.current.precip)
        console.log(response.body.current.weather_descriptions[0])
        
    })
    
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Help text',
        errorMessage: 'Page not found'
    })
})

app.listen(3001, () => {
    console.log('Server is up on port 3001')
})