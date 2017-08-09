const store = require('../store')

const failure = (response) => {
  console.log('There was an error!')
  console.log(response)
}

const signUpSuccess = (response) => {
  console.log('signUpSuccess')
}

const signUpError = (response) => {
  $('#sign-up-error').removeClass('hidden')
  setTimeout(() => {
    $('#sign-up-error').addClass('hidden')
  }, 1500)
}

const signInSuccess = (response) => {
  console.log('signInSuccess')
  store.user = response.user
  console.log(store.user)
  $('#-signup-modal').modal('hide')
  $('#-signup-button').addClass('hidden')
  $('#-logout-button').removeClass('hidden')
  $('#-changepwd-button').removeClass('hidden')
  $('#locations-dropdown-button').removeClass('hidden')
}

const signInError = (response) => {
  $('#sign-in-error').removeClass('hidden')
  setTimeout(() => {
    $('#sign-in-error').addClass('hidden')
  }, 1500)
}

const signOutSuccess = (response) => {
  console.log('signOutSuccess')
  store.user = undefined
  store.location = undefined
  store.locations = undefined
  $('#-signup-button').removeClass('hidden')
  $('#-logout-button').addClass('hidden')
  $('#-changepwd-button').addClass('hidden')
  $('#locations-dropdown-button').addClass('hidden')
  $('#location-display').addClass('hidden')
  forceSignIn()
}

const signOutError = (response) => {
}

const changePasswordSuccess = (response) => {
  console.log('changePasswordSuccess')
  $('#-changepwd-modal').modal('hide')
}

const changePasswordError = (response) => {
}

const forceSignIn = function () {
  if (!store.user) {
    $('#-signup-modal').modal('show')
  }
}

module.exports = {
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  signOutSuccess,
  signOutError,
  changePasswordSuccess,
  changePasswordError,
  forceSignIn,
  failure
}


// 'use strict'
//
// const store = require('../store')
//
// const success = (data) => {
//   console.log(data)
// }
//
// const failure = (error) => {
//   console.error(error)
// }
//
// const signInSuccess = (data) => {
//   store.user = data.user
//   console.log("Signed in")
// }
//
// const signOutSuccess = () => {
//   console.log("Signed out")
//   console.log(store.user)
//   delete store.user
//   console.log(store.user)
// }
//
// module.exports = {
//   success,
//   failure,
//   signInSuccess,
//   signOutSuccess,
// }
