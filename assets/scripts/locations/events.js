'use strict'

const ui = require('./ui')
const api = require('./api')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

const onGetLocations = function (event) {
  event.preventDefault()
  api.getLocations()
    .then(ui.getLocationsSuccess)
    .catch(ui.failure)
}

const onAddLocation = function (event) {
  console.log('onAddLocation')
  console.log('Target: ', event.delegateTarget)
  event.preventDefault()
  const name = $(event.delegateTarget).children('p').text()
  console.log('name', name)
  console.log('store.locations', store.locations)
  let index = -1
  if (store.locations) {
    index = store.locations.findIndex(loc => loc.name === name)
  }
  if (index > -1) {
    console.log('found!!!!!!!!!!!!!!!!!!!!!!!')
    console.log('index:', index)
    const id = store.locations[index].id
    api.getOneLocation(id)
      .then(ui.getOneLocationSuccess)
      .catch(ui.failure)
  } else {
    if (store.user) {
      api.addLocation(name)
        .then(ui.addLocationSuccess)
        .catch(ui.failure)
    } else {
      console.log('You must sign in!')
    }
  }
}

const onAddActivity = function (event) {
  console.log('onAddActivity')
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('Data: ', data)
  if (store.location) {
    api.addActivity(data.activity.name)
      .then(ui.addActivitySuccess)
      .then(() => ui.storeOneActivity(data.activity.name))
      .catch(ui.failure)
  } else {
    console.log('No location is selected!')
  }
}

const onAddLandmark = function (event) {
  console.log('onAddLandmark')
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('Data: ', data)
  if (store.location) {
    api.addLandmark(data.landmark.name)
      .then(ui.addLandmarkSuccess)
      .then(() => ui.storeOneLandmark(data.landmark.name))
      .catch(ui.failure)
  } else {
    console.log('No location is selected!')
  }
}

const onAddRestaurant = function (event) {
  console.log('onAddRestaurant')
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('Data: ', data)
  if (store.location) {
    api.addRestaurant(data.restaurant.name)
      .then(ui.addRestaurantSuccess)
      .then(() => ui.storeOneRestaurant(data.restaurant.name))
      .catch(ui.failure)
  } else {
    console.log('No location is selected!')
  }
}

const onAddComment = function (event) {
  console.log('onAddComment')
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('Data: ', data)
  if (store.location) {
    api.addComment(data.comment.name)
      .then(ui.addCommentSuccess)
      .then(() => ui.storeOneComment(data.comment.name))
      .catch(ui.failure)
  } else {
    console.log('No location is selected!')
  }
}

const onRemoveLocation = function (event) {
  console.log('onRemoveLocation')
  event.preventDefault()
  if (store.location) {
    api.removeLocation()
      .then(ui.removeLocationSuccess)
      .catch(ui.failure)
  } else {
    console.log('No location is selected!')
  }
}

const addHandlers = () => {
  $('.img-wrap').on('click', onAddLocation)
  $('#-addactivity-modal-form').on('submit', onAddActivity)
  $('#-addlandmark-modal-form').on('submit', onAddLandmark)
  $('#-addrestaurant-modal-form').on('submit', onAddRestaurant)
  $('#-addcomment-modal-form').on('submit', onAddComment)
  $('#removelocation-confirm').on('click', onRemoveLocation)
  $('#-signup-modal').on('hidden.bs.modal', () => {
    $('#-signup-modal input').val('')
  })
  $('#-changepwd-modal').on('hidden.bs.modal', () => {
    $('#-changepwd-modal input').val('')
  })
  $('#-addactivity-modal').on('hidden.bs.modal', () => {
    $('#-addactivity-modal input').val('')
  })
  $('#-addlandmark-modal').on('hidden.bs.modal', () => {
    $('#-addlandmark-modal input').val('')
  })
  $('#-addrestaurant-modal').on('hidden.bs.modal', () => {
    $('#-addrestaurant-modal input').val('')
  })
  $('#-addcomment-modal').on('hidden.bs.modal', () => {
    $('#-addcomment-modal input').val('')
  })
}

module.exports = {
  addHandlers,
  onGetLocations
}
