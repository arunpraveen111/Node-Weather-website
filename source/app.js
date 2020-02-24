const path = require('path') //core module of node.js for which we don't need to install it.
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() //creating a new variable called "app" to store our express application. We didn't add any arguments,instead we configure our server by using various methods provided on the application itself.
const port = process.env.PORT||3000 //only access the heroku, if we tries to run locally on our machine, it fails, so we use "|| 3000"(our local port)

//Defining paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../template/views')
const partialpath = path.join(__dirname,'../template/partial')

//setting up handlebar engine and views location 
app.set('view engine','hbs')//.set allows us to set a value for a given express setting. //to set up handlebar. 
app.set('views',viewspath)
hbs.registerPartials(partialpath)
  
//setting up static directory
app.use(express.static(publicDirectoryPath))

// //below coding is to tell our express application what to do

app.get('/',(req,res)=>{
    res.render('Home',{ //no need of mentioning the extension "Home.hbs"
        title:'Weather Application',
        version:'Version: 1.1.0',
        Author: ' @ Arun.lnc'
    })
})//accessing index.hbs file

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:`Please mention us the location you'd like to search...`
        })
    }

    geocode(req.query.address,(error,{location,latitude,longitude})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error,forecastdata)=>{
            if(error){
                return res.send(error)
            }
            res.send({
                Address: req.query.address,
                location,
                Forecast:forecastdata,
            })
        })
    })
})

app.get('/About',(req,res)=>{
    res.render('About',{ //no need of mentioning the extension "about.hbs"
        title: 'About us!',
        detail: 'Arun praveen M, software engineer',
        Author: ' @ Arun.lnc'
    })
}) //accessing about.hbs file

app.get('/Help',(req,res)=>{

    res.render('Help',{
        title:'Your help page resources!',
        msg:'This is the help page',
        Author: ' @ Arun.lnc'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('helperr',{
        title:"Check out the source help page"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Error:404'
    })
})

app.listen(port,()=>{
    console.log('Server is ON for port!' + port)
})
