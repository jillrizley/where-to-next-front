const store = require('../store')

const failure = (response) => {
}

const signUpSuccess = (response) => {
}

const signUpError = (response) => {
  $('#sign-up-error').removeClass('hidden')
  setTimeout(() => {
    $('#sign-up-error').addClass('hidden')
  }, 1500)
}

const signInSuccess = (response) => {
  store.user = response.user
  $('#-signup-modal').modal('hide')
  $('#-signup-button').addClass('hidden')
  $('#-logout-button').removeClass('hidden')
  $('#-changepwd-button').removeClass('hidden')
  $('#locations-dropdown-button').removeClass('hidden')
  $('#welcome-header').addClass('hidden')
  $('#signedin-header').removeClass('hidden')
}

const signInError = (response) => {
  $('#sign-in-error').removeClass('hidden')
  setTimeout(() => {
    $('#sign-in-error').addClass('hidden')
  }, 1500)
}

const signOutSuccess = (response) => {
  store.user = undefined
  store.location = undefined
  store.locations = undefined
  $('#-signup-button').removeClass('hidden')
  $('#-logout-button').addClass('hidden')
  $('#-changepwd-button').addClass('hidden')
  $('#locations-dropdown-button').addClass('hidden')
  $('#location-display').addClass('hidden')
  $('#welcome-header').removeClass('hidden')
  $('#signedin-header').addClass('hidden')
  forceSignIn()
}

const signOutError = (response) => {
}

const changePasswordSuccess = (response) => {
  $('#-changepwd-modal').modal('hide')
}

const changePasswordError = (response) => {
  $('#changepwd-error').removeClass('hidden')
  setTimeout(() => {
    $('#changepwd-error').addClass('hidden')
  }, 1500)
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
