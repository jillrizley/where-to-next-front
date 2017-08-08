'use strict'

const config = require('../config')
const store = require('../store')

const getLocations = () => {
  return $.ajax({
    url: config.apiOrigin + '/locations',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getOneLocation = (id) => {
  return $.ajax({
    url: config.apiOrigin + '/locations/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const addLocation = (name) => {
  return $.ajax({
    url: config.apiOrigin + '/locations',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: { location: {name} }
  })
}

const addActivity = (name) => {
  return $.ajax({
    url: config.apiOrigin + '/activities/' + store.location.id,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: { activity: {name} }
  })
}

const addLandmark = (name) => {
  return $.ajax({
    url: config.apiOrigin + '/landmarks/' + store.location.id,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: { landmark: {name} }
  })
}

const addRestaurant = (name) => {
  return $.ajax({
    url: config.apiOrigin + '/foods/' + store.location.id,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: { restaurant: {name} }
  })
}

const addComment = (name) => {
  return $.ajax({
    url: config.apiOrigin + '/comments/' + store.location.id,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: { comment: {name} }
  })
}

module.exports = {
  getLocations,
  getOneLocation,
  addLocation,
  addActivity,
  addLandmark,
  addRestaurant,
  addComment
}
