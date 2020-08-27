const request= require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = `https://api.darksky.net/forecast/94bc446af8c9437128f67330ad3c15f9/${latitude},${longitude}?lang=en&units=auto`

    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to reach weather app service!',undefined)

        }else if(response.body.error){
            callback('Please check your input data...',undefined)
        }
        else{
            callback(undefined,`${response.body.currently.summary}. The temperature is ${response.body.currently.temperature}°C and the probability for rain is ${response.body.currently.precipProbability}%`)
        }

    })
}

module.exports = forecast


// //////////////////////////////OLD CODING FOR WEATHER REQUEST//////////////////////////////////



// //**********************************WEATHER REQUEST***********************************/

// const url = 'https://api.darksky.net/forecast/94bc446af8c9437128f67330ad3c15f9/9.5463,78.5907?lang=en&units=auto'
// request({url:url, json:true},(error,response)=>{

//     if(error)
//     {
//         console.log(chalk.bold.redBright('Unable to reach weather app service!'))//if user feed invalid input in website name

//     }else if(response.body.error)
//     {
//         console.log('Please check your input data...')//if user feed invalid input in location
//     }
//     else
//     {
//         console.log(`${response.body.currently.summary}. The temperature is ${response.body.currently.temperature}°C and the probability for rain is ${response.body.currently.precipProbability} %`)
        
//     }
// })