'use strict'

const store = require('../store')
const api = require('./api')

// Load templates into variables
const locationsTemplate = require('../templates/locations.handlebars')
const activitiesTemplate = require('../templates/activities.handlebars')
const landmarksTemplate = require('../templates/landmarks.handlebars')
const restaurantsTemplate = require('../templates/restaurants.handlebars')
const commentsTemplate = require('../templates/comments.handlebars')

// Select the display elements for later use
const locationTitleElement = $('#location-title')
const locationsElement = $('#locations-dropdown')
const locationDisplayElement = $('#location-display')
const activitiesElement = $('#activities-display')
const landmarksElement = $('#landmarks-display')
const restaurantsElement = $('#restaurants-display')
const commentsElement = $('#comments-display')

const hideLocationDisplay = () => {
  locationDisplayElement.addClass('hidden')
}

const showLocationDisplay = () => {
  locationDisplayElement.removeClass('hidden')
}

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
  showLocationDisplay()
}

const addLocationSuccess = function (response) {
  console.log('addLocationSuccess')
  console.log(response)
  storeOneLocation(response)
  if (store.locations) {
    store.locations.push({
      name: response.location.name,
      id: response.location.id
    })
  } else {
    store.locations = [{
      name: response.location.name,
      id: response.location.id
    }]
  }
  console.log('store.locations: ', store.locations)
  updateLocations()
  updateLocationDisplay()
  showLocationDisplay()
}

const removeLocationSuccess = function (response) {
  console.log('removeLocationSuccess')
  console.log(response)
  store.locations = store.locations.filter((loc) => {
    return loc.id !== store.location.id
  })
  updateLocations()
  clearLocation()
  hideLocationDisplay()
}

const clearLocation = function () {
  store.location = undefined
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
  // console.log(store.location.activities)
  const newActivities = activitiesTemplate({activities: store.location.activities})
  activitiesElement.html('')
  activitiesElement.append(newActivities)
  // $('.removeactivity-button').on('click', (event) => {
  //   REMOVE ACTIVITY SKREEE
  // })
}

// landmarks Display
const updateLandmarksDisplay = function () {
  console.log('updateLandmarksDisplay')
  // console.log(store.location.landmarks)
  const newLandmarks = landmarksTemplate({landmarks: store.location.landmarks})
  landmarksElement.html('')
  landmarksElement.append(newLandmarks)
}

// restaurants Display
const updateRestaurantsDisplay = function () {
  console.log('updateRestaurantsDisplay')
  // console.log(store.location.food)
  const newRestaurants = restaurantsTemplate({restaurants: store.location.food})
  restaurantsElement.html('')
  restaurantsElement.append(newRestaurants)
}

// comments Display
const updateCommentsDisplay = function () {
  console.log('updateCommentsDisplay')
  // console.log(store.location.comments)
  const newComments = commentsTemplate({comments: store.location.comments})
  commentsElement.html('')
  commentsElement.append(newComments)
}

// Update display of location with the information in the store
const updateLocationDisplay = function () {
  console.log('updateLocationDisplay')
  locationTitleElement.text(store.location.name)
  updateActivityDisplay()
  updateLandmarksDisplay()
  updateRestaurantsDisplay()
  updateCommentsDisplay()
}

// Success message for new activity
const addActivitySuccess = function (response) {
  console.log('addActivitySuccess')
  console.log(response)
}

// Add activity to local store
const storeOneActivity = function (name) {
  console.log('storeOneActivity')
  store.location.activities.push(name)
  updateActivityDisplay()
}

// Success message for new landmark
const addLandmarkSuccess = function (response) {
  console.log('addLandmarkSuccess')
  console.log(response)
}

// Add landmark to local store
const storeOneLandmark = function (name) {
  console.log('storeOneLandmark')
  store.location.landmarks.push(name)
  updateLandmarksDisplay()
}

// Success message for new restaurant
const addRestaurantSuccess = function (response) {
  console.log('addRestaurantSuccess')
  console.log(response)
}

// Add restaurant to local store
const storeOneRestaurant = function (name) {
  console.log('storeOneRestaurant')
  store.location.food.push(name)
  updateRestaurantsDisplay()
}

// Success message for new comment
const addCommentSuccess = function (response) {
  console.log('addCommentSuccess')
  console.log(response)
}

// Add comment to local store
const storeOneComment = function (name) {
  console.log('storeOneComment')
  store.location.comments.push(name)
  updateCommentsDisplay()
}

const failure = function (response) {
  console.log('There was an error!')
  console.log(response)
}

module.exports = {
  getLocationsSuccess,
  addLocationSuccess,
  removeLocationSuccess,
  addActivitySuccess,
  storeOneActivity,
  addLandmarkSuccess,
  storeOneLandmark,
  addRestaurantSuccess,
  storeOneRestaurant,
  addCommentSuccess,
  storeOneComment,
  failure
}
