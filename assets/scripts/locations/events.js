'use strict'

const ui = require('./ui')
const api = require('./api')
const store = require('../store')

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
  console.log(name)
  if (store.user) {
    api.addLocation(name)
      .then(ui.addLocationSuccess)
      .catch(ui.failure)
  } else {
    console.log('You must sign in!')
  }
}

const addHandlers = () => {
  $('.img-wrap').on('click', onAddLocation)
}

module.exports = {
  addHandlers,
  onGetLocations
}
