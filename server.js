require('dotenv').config();
const express = require('express')
const ExportFlight = require('./models/ExportFlight')

const app = express()

require('./database')

const trackedFlights = ['AV218', 'AV88', 'AV646']

setTimeout(() => {
    trackedFlights.forEach(async (flight) => {
        let flightStatus = []
        try {
            const flightData = await fetch(`https://airlabs.co/api/v9/flight?flight_iata=${flight}&api_key=de700d04-0962-42e8-a7c9-79619c6c90be`)
            const jsonData = await flightData.json()
            const { flight_iata, dep_iata, dep_gate, dep_estimated, dep_actual, dep_time, arr_iata, status } = jsonData.response
            flightStatus.push({
                flight_iata,
                dep_iata,
                dep_gate,
                dep_estimated,
                dep_actual,
                dep_time,
                arr_iata,
                status,
            })

            if (jsonData.response) {
                const NewFlight = new ExportFlight({flight: flight_iata, origin: dep_iata, gate: dep_gate, etd: dep_estimated, atd: dep_actual, date: dep_time, destination: arr_iata, status: status})
                await NewFlight.save()
                console.log(`vuelo guardado: ${NewFlight}`)
            } else { 
                console.log(`cant find flight data for ${flight}`);
            }

        } catch (err) {
            console.log(err)
        }
    console.log(flightStatus);
    })
}, 20);


app.get('/', async (req, res)  => {
    const flights = await ExportFlight.find()
    res.send(flights)
})

app.listen(8080)
console.log('Server listening on port 8080');