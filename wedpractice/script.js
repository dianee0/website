const express = require('express');
const request = require("request");

const app = express();

const API_KEY = "922ed893d9e4d868452058259423de7c";
//coords for SF
var lat = 37.77493;
var lon = -122.41942;

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log("welcome to the root!");
  


  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  
	request(url, (error, response, body)=>{
		
		// Printing the error if occurred
		if(error) console.log(error);
	   
		// Printing status code
		console.log(response.statusCode);
		const data = JSON.parse(body);
		const temperature = data.main.temp;
		console.log(`Current temperature: ${temperature}°F`);
		
		 
		// Printing body
		//console.log(body);
	});
  
});

// // 5 DAY FORECAST

// app.get('/5day', (req, res) => {
// 	let lat1 = 37.77493;
// 	let lon1 = -122.41942;

// 	var url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
	

// });


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});