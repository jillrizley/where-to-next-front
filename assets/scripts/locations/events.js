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
  event.preventDefault()
  const name = $(event.delegateTarget).children('p').text()
  let index = -1
  if (store.locations) {
    index = store.locations.findIndex(loc => loc.name === name)
  }
  if (index > -1) {
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
    }
  }
}

const onAddActivity = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (store.location) {
    api.addActivity(data.activity.name)
      .then(ui.addActivitySuccess)
      .then(() => ui.storeOneActivity(data.activity.name))
      .catch(ui.failure)
  } else {
  }
}

const onAddLandmark = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (store.location) {
    api.addLandmark(data.landmark.name)
      .then(ui.addLandmarkSuccess)
      .then(() => ui.storeOneLandmark(data.landmark.name))
      .catch(ui.failure)
  } else {
  }
}

const onAddRestaurant = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (store.location) {
    api.addRestaurant(data.restaurant.name)
      .then(ui.addRestaurantSuccess)
      .then(() => ui.storeOneRestaurant(data.restaurant.name))
      .catch(ui.failure)
  } else {
  }
}

const onAddComment = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (store.location) {
    api.addComment(data.comment.name)
      .then(ui.addCommentSuccess)
      .then(() => ui.storeOneComment(data.comment.name))
      .catch(ui.failure)
  } else {
  }
}

const onRemoveLocation = function (event) {
  event.preventDefault()
  if (store.location) {
    api.removeLocation()
      .then(ui.removeLocationSuccess)
      .catch(ui.failure)
  } else {
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
