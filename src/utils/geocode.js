const request = require('request')



const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibW1pbmF1cyIsImEiOiJja2w4dHQ0aHAwMDNnMnVxZWVyaTBxN2psIn0.RSV2d6JepLqUZR0HB3J12g' 
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to Connect', undefined)
        }else if (body.features.length === 0){
            callback('GEOCODE :  Unable to find location, try again', undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[0], 
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode