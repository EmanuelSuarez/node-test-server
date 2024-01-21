require('dotenv').config();
const express = require('express')
const ExportFlight = require('./models/ExportFlight')

const app = express()

require('./database')

const trackedFlights = ['AV88', 'AM31']

setInterval(() => {
    trackedFlights.forEach(async (flight) => {
        let flightStatus = []
        try {
            //fetch flight data for flights in "trackedFlights"
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
                try {
                    // look into db to find if the flight already exists
                    const dbFlight = await ExportFlight.find({flight: flight_iata}, {date: dep_time})
                    // if exists, update the document
                    if (dbFlight.length > 0) {
                        console.log('flight found in db', dbFlight);
                        const { _id } = dbFlight
                        ExportFlight.findById( { _id: _id },
                        {
                        $set: {
                            gate: NewFlight.gate,
                            etd: NewFlight.etd,
                            atd: NewFlight.atd,
                            status: NewFlight.status
                        },
                        $currentDate: { lastUpdated: true }
                        })
                        console.log(`flight ${NewFlight.flight} updated on db`);
                    } else {
                        // if not, create the document
                        await NewFlight.save()
                        console.log(`new flight created: ${NewFlight}`)
                    }
                } catch (err) {
                    console.log(err);
                }
                
            } else { 
                console.log(`cant find flight data for ${flight}`);
            }

        } catch (err) {
            console.log(err)
        }
    console.log(flightStatus);
    })
}, 1200000);


app.get('/', async (req, res)  => {
    const flights = await ExportFlight.find()
    res.send(flights)
})

app.listen(8080)
console.log('Server listening on port 8080');