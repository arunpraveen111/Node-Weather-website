const request= require('request')
const geocode=(address,callback)=>{

   const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJ1bnByYXZlZW4iLCJhIjoiY2s1cWkzeDY4MDJrdTNscDl5aHNnMXVlMSJ9.6gI-74X8NQ9NNtm9hFbHeg`

   request({url,json:true},(error,response)=>{
       if(error){
           callback('Check your network connection!',{})
       }
       else if(response.body.features.length===0){
           callback('Check your input data.....!',{})
       }else{
           callback(undefined,{
               latitude: response.body.features[0].center[1],
               longitude: response.body.features[0].center[0],
               location: response.body.features[0].place_name
           })
       }
   })

}

module.exports= geocode

// //////////////////////////////OLD CODING FOR GEO-CODING REQUEST//////////////////////////////////


// //**********************************GEO-CODING REQUEST***********************************/


// const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/chennai.json?access_token=pk.eyJ1IjoiYXJ1bnByYXZlZW4iLCJhIjoiY2s1cWkzeDY4MDJrdTNscDl5aHNnMXVlMSJ9.6gI-74X8NQ9NNtm9hFbHeg';
// request({url:geourl, json:true},(error,response)=>{

//     if(error)
//     {
//         console.log(chalk.yellow('Check your network connection!'))//if response didn't invoked

//     }else if(response.body.features.length===0)
//     {

//         console.log(chalk.bold.redBright('Check your input data.....!'))//if user feeds incorrect input like location
//     }
//     else
//             {
//                 console.log(`Place: ${response.body.query[0]}, longitude: ${response.body.features[0].center[0]} latitude: ${response.body.features[0].center[1]}`)
//             }
// })
