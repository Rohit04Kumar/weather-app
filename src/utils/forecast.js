const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5081b2e095cb8630acf19db294ae5721&query=' + latitude + ',' + longitude ;

    request({ url, json : true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ', It is currently :' + body.current.temperature + ' degress out. And it is feelslike :' + body.current.feelslike +  ' degree. and humidity is :' + body.current.humidity)

            // callback(undefined, {
            //    temp : body.current.temperature,
            //    feelslike : body.current.feelslike,
            //    weather : body.current.weather_descriptions[0]
            // })
        }
    })
}

module.exports = forecast