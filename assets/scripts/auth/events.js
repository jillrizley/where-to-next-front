'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

// prevents page from refreshing and calls a function from ./api
// the function it calls from ./api sends an ajax request to sign a new user up
const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .then(() => api.signIn(data))
    .then(ui.signInSuccess)
    .catch(ui.failure)
}

// prevents page from refreshing and calls function from ./api
// the function it calls from ./api checks to see if user exists, if they do it
// logs them in
const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .done(ui.signInSuccess)
    .catch(ui.failure)
}

// prevents page from refreshing and calls function from ./api
// the function it calls from ./api checks to see if old password is correct. if
// it is it changes the value to the new password
const onChangePassword = function (event) {
  const data = getFormFields(event.target)
  event.preventDefault()
  api.changePassword(data)
    .done(ui.changePasswordSuccess)
    .catch(ui.failure)
}

// prevents page from refreshing and calls function from ./api
// the function it calls from ./api deletes the token attached to the user
const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .done(ui.signOutSuccess)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('#-signup-modal-form').on('submit', onSignUp)
  $('#-signin-modal-form').on('submit', onSignIn)
  $('#-logout-button').on('click', onSignOut)
  $('#-changepwd-modal-form').on('submit', onChangePassword)
}

module.exports = {
  addHandlers
}
