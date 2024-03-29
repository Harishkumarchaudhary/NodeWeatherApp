const request = require('request')

const geoCode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3VtYXJoYXJpc2giLCJhIjoiY2t1eTR2MWxxNGwzYTJ3bzZxa2Z1aWJjeSJ9.Z--s6WJNPwmKKLiWGO07ug'
  //Using destructuring & short hand syntax
    request({url, json : true}, (error, {body})=>{
           if(error){
               callback('Unable to connect')
           } else if(body.features.length == 0) {
               callback('Invalid Location', undefined)
           } else {
               callback(undefined, {
                   longitude :body.features[0].center[1],
                   latitude : body.features[0].center[0],
                   location : body.features[0].place_name
                })
           }
    })
 
 }

 module.exports = geoCode
 