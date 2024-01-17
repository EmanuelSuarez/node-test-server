const { Schema, model } = require('mongoose')

const ImportFlightSchema = new Schema ({
    flight: {
        type: String,
        required: true
    },
     date: {
        type: Date,
        required: true
     },
     eta: {
        type: Date,
        required: true
     },
     ata: {
        type: Date,
        required: true
     },
     atd: {
      type: Date,
      required: true
     },
     status: {
      type: String,
      required: true
     }
}, {
   timestamps: true
})

module.exports = model('ImportFlight', ImportFlightSchema)