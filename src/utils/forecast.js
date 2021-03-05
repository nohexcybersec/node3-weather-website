const request = require('request')

const forecast = (lat, long, callback) =>{
    //const url = 'http://api.weatherstack.com/current?access_key=01a27500bfe89b60cb4d92e2462d4c46&query=37.8267,-122.4233'
    const url = 'http://api.weatherstack.com/current?access_key=01a27500bfe89b60cb4d92e2462d4c46&query='+ lat + ',' + long + ' &units=f'
    //console.log('CHECKING MY URL  ' + url)

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to Connect', undefined)
        }else if (body.error){
            callback('Unable to find location, try again', undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0] + '.  The current Temp = ' 
            + body.current.temperature + ' degrees'+ '  BUT it FEELS like = ' + body.current.feelslike + ' degrees OUT')
        }
    })

}


module.exports = forecast