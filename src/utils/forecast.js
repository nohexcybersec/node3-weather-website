const request = require('request')

const forecast = (lattitude=40, longitude, callback) =>{
    //const url = 'http://api.weatherstack.com/current?access_key=01a27500bfe89b60cb4d92e2462d4c46&query=37.8267,-122.4233'
    const url = 'http://api.weatherstack.com/current?access_key=01a27500bfe89b60cb4d92e2462d4c46&query='+ lattitude + ',' + longitude + '&units=f'
   
    request({url, json: true}, (error, {body}) => {
        //console.log('FORECAST: myBody',body)
        if(error){
            callback('Unable to Connect', undefined)
        }else if (body.error){
            callback('Forecast : Unable to find location, try again', undefined)
        }else {
            callback(undefined,  body.current.weather_descriptions[0] + '|'+ ' Temp is '+ body.current.temperature +' degrees' + '  feels like  = ' + body.current.feelslike + ' degrees')
        }
    })
}
module.exports = forecast