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
      required: true
     },
     etd: {
        type: Date,
        required: true
     },
     atd: {
        type: Date,
        required: true
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