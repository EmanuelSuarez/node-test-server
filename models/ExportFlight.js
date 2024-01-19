const { Schema, model } = require('mongoose')

const ExportFlightSchema = new Schema ({
    flight: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
     },
     gate: {
      type: Date,
      required: false
     },
     etd: {
        type: Date,
        required: false
     },
     atd: {
        type: Date,
        required: false
     },
     date: {
        type: Date,
        required: true
     },
     destination: {
        type: String,
        required: true
     },
     status: {
      type: String,
      required: true
     }
}, {
   timestamps: true
})

module.exports = model('ExportFlight', ExportFlightSchema)