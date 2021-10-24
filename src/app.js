const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))


//index.html is a special file that will show at root of our project
const app = express()
const port = process.env.PORT || 3000

const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Static directory to serve
app.use(express.static(publicPathDirectory))

//Set up handle bars and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Harish'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title : 'About',
        name : 'Harish'
    })
})


app.get('/help', (req, res)=>{
    res.render('help',{
        title : "Help",
        name : 'Harish',
        helpmsg : "For help please contact 911!"
    })
})

//app.com
/*app.get('', (req, res)=>{
       res.send('<h1>Weather</h1>')
})  //when we use index.html above this becomes useless
*/
//get first argument route. 2nd argument request (what we want to do). 3rd argument response from server

//app.com/help
/*app.get('/help',(req, res)=>{
      res.send([{   //Instead of an object, we can have array of objects as well
          name : 'Harish',
          age : 27  //it will be stringified to json and sent back to requester
      },{
          name : 'Manish'
      }])
})

app.get('/about', (req, res)=>{
    res.send('<h1>About</h1')
})*/

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Please provide an address in the query field'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location}={})=>{
          if(error){
              return res.send({error})
          }
          forecast(longitude, latitude, (error, forecastData)=>{
              if(error) {
                  return res.send({error})
              }
              res.send({
                  forecast : forecastData,
                  location,
                  address : req.query.address
              })
          })
    })


})

app.get('/products', (req, res)=>{

    if(!req.query.search){
        return res.send({
            error : 'You must provide the search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        errormsg : 'Help Not found',
        name : 'Harish',
        title : 'Help Not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        errormsg : '404 Page Not found',
        name : 'Harish',
        title : '404'
    })
})

app.listen(port, ()=>{
    console.log('server is up on port '+port)
})