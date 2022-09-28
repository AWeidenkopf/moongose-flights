import { Flight } from "../models/flight.js"
import { Meal } from '../models/meal.js'

function newFlight(req, res) {
  const newFlight = new Flight()

  const dt = newFlight.departs

  const departsDate = dt.toISOString().slice(0, 16)

  res.render('flights/new', {
    departsDate, 
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
    .populate('meals')
    .then(flight => {
      Meal.find({_id: {$nin: flight.meals}})
      .then(meals => {
      res.render('flights/show', { 
        title: 'Flight Detail', 
        flight,
        meals,
      })    
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
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

  function edit(req, res) {
    Flight.findById(req.params.id) 
    .then(flight => {
      res.render('flights/edit', {
        flight,
        title: 'Edit Flight'
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  function update(req, res) {
    if (req.body.departs === '') {
      delete req.body.departs
    }
    Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(flight => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  function createTicket(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
      flight.tickets.push(req.body)
      flight.save()
      .then(() => {
        res.redirect(`/flights/${flight._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  function addMeal(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
      console.log('scott')
      console.log(req.body)
      flight.meals.push(req.body.mealId)
      flight.save()
      .then(() => {
        res.redirect(`/flights/${flight._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
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
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addMeal
}