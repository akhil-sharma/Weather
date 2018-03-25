const request = require('request');
const apiKey = require('./utility.js').api_key;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.render('index')
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    
    request(url, function(err, response, body){
       if (err){
           res.render('index', {weather: null, error: 'Error, please try again'});
       } else {
           let weather = JSON.parse(body)
           if (weather.main == undefined){
               res.render('index', {weather: null, error: 'Error, please try again'});
           } else{
               let weatherText = `Its ${weather.main.temp} degrees in ${weather.name}!`;
               res.render('index', {weather: weatherText, error:null});
           }
       }
    });
})

app.listen(3000, function(){
    console.log('Example app listening on port 3000!')
});