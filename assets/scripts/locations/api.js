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

module.exports = {
  getLocations,
  getOneLocation,
  addLocation
}
