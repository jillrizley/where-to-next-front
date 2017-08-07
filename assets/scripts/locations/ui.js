'use strict'

const store = require('../store')

const locationTitleElement = $('#location-title')

const getLocationsSuccess = function (response) {
  console.log('getLocationsSuccess')
  console.log(response)
}

const addLocationSuccess = function (response) {
  console.log('addLocationSuccess')
  console.log(response)
  selectLocation(response)
  updateLocationDisplay()
}

// Store the location so we can update it later
const selectLocation = function (response) {
  store.location = response.location
}

// Update display of location with new information
const updateLocationDisplay = function () {
  locationTitleElement.text(store.location.name)
}

module.exports = {
  getLocationsSuccess,
  addLocationSuccess
}
