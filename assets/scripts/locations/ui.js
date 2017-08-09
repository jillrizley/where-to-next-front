'use strict'

const store = require('../store')
const api = require('./api')
const googleMapsLoader = require('google-maps')
const coords = require('../coordinates')

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

let map = null
let google = null
googleMapsLoader.KEY = 'AIzaSyBgd164CNRCK3IZM0yQdU5-FhkEkGFRx_Y'
googleMapsLoader.load((api) => {
  google = api
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 0, lng: 0}
  })
})

// const initMap = function () {
//   map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 12,
//     center: {lat: 0, lng: 0}
//   })
// }

const getLocationsSuccess = function (response) {
  console.log('getLocationsSuccess')
  console.log(response)
  storeLocations(response)
  updateLocations(response)
}

const centerMap = function () {
  console.log('Setting map')
  google.maps.event.trigger(map, 'resize')
  const index = coords.findIndex(loc => loc.name === store.location.name)
  console.log('location index: ', index)
  console.log('location coords: ', coords[index].lat, ',', coords[index].long)
  if (index > -1) {
    map.setCenter(new google.maps.LatLng(coords[index].lat, coords[index].long))
  }
  map.setZoom(12)
}

const locationSelected = function () {
  updateLocationDisplay()
  showLocationDisplay()
  $('html, body').animate({ scrollTop: 0 }, 'slow')
  centerMap()
  $('#signedin-header').addClass('hidden')
}

const getOneLocationSuccess = function (response) {
  console.log('getOneLocationSuccess')
  console.log(response)
  storeOneLocation(response)
  locationSelected()
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
  locationSelected()
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
  $('#-removelocation-modal').modal('hide')
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
  $('.removeactivity-button').on('click', (event) => {
    console.log('remove activity click!')
    const name = $(event.delegateTarget).parent().data('name')
    console.log('Name:', name)
    api.removeActivity(name)
      .then(removeActivitySuccess)
      .then(() => removeActivityFromStore(name))
      .catch(failure)
  })
}

// landmarks Display
const updateLandmarksDisplay = function () {
  console.log('updateLandmarksDisplay')
  // console.log(store.location.landmarks)
  const newLandmarks = landmarksTemplate({landmarks: store.location.landmarks})
  landmarksElement.html('')
  landmarksElement.append(newLandmarks)
  $('.removelandmark-button').on('click', (event) => {
    console.log('remove landmark click!')
    const name = $(event.delegateTarget).parent().data('name')
    console.log('Name:', name)
    api.removeLandmark(name)
      .then(removeLandmarkSuccess)
      .then(() => removeLandmarkFromStore(name))
      .catch(failure)
  })
}

// restaurants Display
const updateRestaurantsDisplay = function () {
  console.log('updateRestaurantsDisplay')
  // console.log(store.location.food)
  const newRestaurants = restaurantsTemplate({restaurants: store.location.food})
  restaurantsElement.html('')
  restaurantsElement.append(newRestaurants)
  $('.removerestaurant-button').on('click', (event) => {
    console.log('remove restaurant click!')
    const name = $(event.delegateTarget).parent().data('name')
    console.log('Name:', name)
    api.removeRestaurant(name)
      .then(removeRestaurantSuccess)
      .then(() => removeRestaurantFromStore(name))
      .catch(failure)
  })
}

// comments Display
const updateCommentsDisplay = function () {
  console.log('updateCommentsDisplay')
  // console.log(store.location.comments)
  const newComments = commentsTemplate({comments: store.location.comments})
  commentsElement.html('')
  commentsElement.append(newComments)
  $('.removecomment-button').on('click', (event) => {
    console.log('remove comment click!')
    const name = $(event.delegateTarget).parent().data('name')
    console.log('Name:', name)
    api.removeComment(name)
      .then(removeCommentSuccess)
      .then(() => removeCommentFromStore(name))
      .catch(failure)
  })
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
  $('#-addactivity-modal').modal('hide')
}

const removeActivitySuccess = function (response) {
  console.log('removeActivitySuccess')
  console.log(response)
}

const removeActivityFromStore = function (name) {
  console.log('removeActivityFromStore')
  const index = store.location.activities.indexOf(name.toString())
  console.log('Index:', index)
  store.location.activities.splice(index, 1)
  updateActivityDisplay()
}

const removeLandmarkSuccess = function (response) {
  console.log('removeLandmarkSuccess')
  console.log(response)
}

const removeLandmarkFromStore = function (name) {
  console.log('removeLandmarkFromStore')
  const index = store.location.landmarks.indexOf(name.toString())
  console.log('Index:', index)
  store.location.landmarks.splice(index, 1)
  updateLandmarksDisplay()
}

const removeRestaurantSuccess = function (response) {
  console.log('removeRestaurantSuccess')
  console.log(response)
}

const removeRestaurantFromStore = function (name) {
  console.log('removeRestaurantFromStore')
  const index = store.location.food.indexOf(name.toString())
  console.log('Index:', index)
  store.location.food.splice(index, 1)
  updateRestaurantsDisplay()
}

const removeCommentSuccess = function (response) {
  console.log('removeCommentSuccess')
  console.log(response)
}

const removeCommentFromStore = function (name) {
  console.log('removeCommentFromStore')
  const index = store.location.comments.indexOf(name.toString())
  console.log('Index:', index)
  store.location.comments.splice(index, 1)
  updateCommentsDisplay()
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
  $('#-addlandmark-modal').modal('hide')
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
  $('#-addrestaurant-modal').modal('hide')
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
  $('#-addcomment-modal').modal('hide')
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
  getOneLocationSuccess,
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
