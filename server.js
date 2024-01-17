require('dotenv').config();
const express = require('express')

const app = express()

require('./database')

const trackedFlights = ['AV218', 'AV88', 'AV646']

setInterval(() => {
    trackedFlights.forEach(async (flight) => {
        let flightStatus = []
        try {
            const flightData = await fetch(`https://airlabs.co/api/v9/flight?flight_iata=${flight}&api_key=07715c29-94a2-4407-b386-1e3cb1c3b4ab`)
            const jsonData = await flightData.json()
            flightStatus.push(jsonData.response)
        } catch (err) {
            console.log(err)
        }
    console.log(flightStatus);
    })
}, 20000);


app.get('/', (req, res) =>{
    res.send('Hello World!!')
})

app.listen(8080)
console.log('Server listening on port 8080');