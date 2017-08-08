'use strict'

const store = require('../store')
const api = require('./api')

// Select the display elements for later use
const locationTitleElement = $('#location-title')
const locationsElement = $('#locations-dropdown')
const activitiesElement = $('#activities-display')
const landmarksElement = $('#landmarks-display')
const restaurantsElement = $('#restaurants-display')
const commentsElement = $('#comments-display')

// Load templates into variables
const locationsTemplate = require('../templates/locations.handlebars')
const activitiesTemplate = require('../templates/activities.handlebars')

const getLocationsSuccess = function (response) {
  console.log('getLocationsSuccess')
  console.log(response)
  storeLocations(response)
  updateLocations(response)
}

const getOneLocationSuccess = function (response) {
  console.log('getOneLocationSuccess')
  console.log(response)
  storeOneLocation(response)
  updateLocationDisplay()
}

const addLocationSuccess = function (response) {
  console.log('addLocationSuccess')
  console.log(response)
  storeOneLocation(response)
  updateLocationDisplay()
}

// Store location names for later use
const storeLocations = function (response) {
  console.log('storeLocations')
  store.locations = response.locations.map((loc) => {
    return {
      name: loc.name,
      id: loc.id
    }
  })
  console.log('store.locations: ', store.locations)
}

// Add locations to the dropdown menu
const updateLocations = function () {
  console.log('updateLocations')
  if (store.locations.length > 0) {
    locationsElement.html('')
    const newLocations = locationsTemplate({locations: store.locations})
    locationsElement.append(newLocations)
    $('.location-link').on('click', (event) => {
      api.getOneLocation(event.target.dataset.id)
        .then(getOneLocationSuccess)
        .catch(failure)
    })
  } else {
    locationsElement.html('<li class="dropdown-header">No locations yet!</li>')
  }
}

// Store the location so we can update it later
const storeOneLocation = function (response) {
  console.log('storeOneLocation')
  store.location = response.location
}

// Update activities display with the activities in the store
const updateActivityDisplay = function () {
  console.log('updateActivityDisplay')
  console.log(store.location.activities)
  const newActivities = activitiesTemplate({activities: store.location.activities})
  activitiesElement.html('')
  activitiesElement.append(newActivities)
}

// Update display of location with the information in the store
const updateLocationDisplay = function () {
  console.log('updateLocationDisplay')
  locationTitleElement.text(store.location.name)
  updateActivityDisplay()
}

const failure = function (response) {
  console.log('There was an error!')
  console.log(response)
}

module.exports = {
  getLocationsSuccess,
  addLocationSuccess
}
