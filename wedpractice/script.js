const express = require("express");
const request = require("request");
const cors = require('cors');

const app = express();

app.use(cors());

const API_KEY = "922ed893d9e4d868452058259423de7c";


app.get('/weather/:lat/:lon', (req, res) => {
//   res.send('Hello World!');
  console.log("welcome to the root!");
  // obtaining lat and lon values
  let lat = req.params.lat;
  let lon = req.params.lon;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  
	request(url, (error, response, body)=>{
		
		// Printing the error if occurred
		if(error) console.log(error);
	   
		// Printing status code
		console.log(response.statusCode);
		let data = JSON.parse(body);

		let weatherStatus = data.weather[0].main; // gives us the weather status
		const temperature = data.main.temp;

		res.send({"temperature" : temperature, "weatherStatus" : weatherStatus});
		// body will look something like {"temperature" : 59, "weatherStatus" : "cloudy"}

		//console.log(temperature);
		
		 
		// Printing body
		//console.log(body);
	});
  
});

// 5 DAY FORECAST

app.get('/5day/:lat/:lon', (req, res) => {

	console.log("Welcome to the root!");

	let lat = req.params.lat;
	let lon = req.params.lon;
	let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
	
		request(url, (error, response, body)=>{
			if(error) console.log(error);

			console.log(response.statusCode);

			let data2 = JSON.parse(body);

			const week =  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			let forecast =[];
			let todaysDate = new Date().getDay(); // gets today's date, returns a num from 0-6

			for (let i = 0; i < 5; i++){
				let tempSum = 0; // sum of all temps for a day
				let count = 0; // number of data points for the day

				for (let dataPoint of data2.list){ // For each data point in the forecast
					let date = new Date(dataPoint.dt * 1000); // Converts ms to seconds and creates date
					if (date.getDay() == todaysDate){ //if the current hourly Data reference point is equal to our day:
						count++; // Add 1 to the total data points
						tempSum += dataPoint.main.temp; // add the temperature to our running total
					}
				} // second for loop ends
				let day = {"dayName": week[todaysDate], "temp": Math.round(tempSum/count)}; // Create our JSON Data point
				forecast.push(day);
				todaysDate = (todaysDate+1) % 7; // so we know we are back to sunday (end of the week): Add 1 to the current day. If we reach day 7,then set to day 0
			} // first for loop ends
			res.send(forecast); // send data
			//console.log(request.forecast);



		});

});



app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});