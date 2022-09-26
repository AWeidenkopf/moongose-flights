import { Flight } from "../models/flight.js"

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req, res) {
  console.log(req.body)
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights/new')
  })
  .catch(err => {
    res.redirect('/flights/new')
  })
}

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/', {
      title: 'All Flights',
      flights: flights
    })
  })
    .catch(err => {
      console.log(err)
      res.redirect('/flights/new')
    })
  }

  function show(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
      res.render('flights/show', { 
        title: 'Flight Detail', 
        flight: flight,
      })    
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  }

  function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
  }


export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete
}