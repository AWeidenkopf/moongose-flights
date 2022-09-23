import mongoose, { Schema } from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  arline: String,
  airport: String,
  flightNo: Number,
  departs: Date,
}, {
  timestamps: true
})

const Flight = mongoose.Model('Flight', flightSchema)

export {
  Flight
}

