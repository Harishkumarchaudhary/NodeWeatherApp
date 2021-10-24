const request = require('request')


const forecast = (longitude, latitude, callback)=>{
    
    const url = 'http://api.weatherstack.com/current?access_key=52db41af169feb4ec44fb914d00f6096&query='+longitude+','+latitude+'&units=s'
   //Using destructuring & short hand syntax
    request({url, json : true},(error, {body})=>{
        if(error){
           callback('Unable to connect to weather service')
        } else if(body.error) { 
           callback(body.error)
        } else{
            const current = body.current
            const temp = current.temperature
            const feelsliketemp = current.feelslike
            callback(undefined, current.weather_descriptions[0]+". The temp is: "+temp)
            //console.log(current.weather_descriptions[0]+". The temperature is: "+temp+" and "+" temp feels like it is: "+feelsliketemp)
        }
    })
}

module.exports = forecast