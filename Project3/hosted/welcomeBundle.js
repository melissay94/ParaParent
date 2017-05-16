'use strict';

// Handles sending login request and checks
var handleLogin = function handleLogin(e) {
	e.preventDefault();

	if ($("#email").val() == '' || $('#pass').val() == '') {
		handleError("All fields needed to make sure its you");
		return false;
	}

	sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

	return false;
};

// Handles sending signup request and checks
var handleSignup = function handleSignup(e) {
	e.preventDefault();

	if ($("#email").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '' || $("#first").val() == '' || $("#last").val() == '' || $("#phone").val() == '') {
		handleError("We need all fields filled to create a profile");
		return false;
	}

	if ($("#pass").val() !== $("#pass2").val()) {
		handleError("Passwords do not match");
		return false;
	}

	sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

	return false;
};

// Renders the login component - TODO 


// Renders the signup component 
var renderSignup = function renderSignup() {
	return React.createElement(
		'div',
		{ className: 'userSignup' },
		React.createElement(
			'form',
			{ id: 'signupUserForm', name: 'signupUserForm',
				onSubmit: this.handleSubmit,
				action: '/signup',
				method: 'POST',
				className: 'mainForm' },
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement('input', { id: 'first', className: 'form-control', type: 'text', name: 'first', placeholder: 'First Name' }),
				React.createElement('input', { id: 'last', className: 'form-control', type: 'text', name: 'last', placeholder: 'Last Name' })
			),
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement('input', { id: 'email', className: 'form-control', type: 'text', name: 'email', placeholder: 'Email Address' }),
				React.createElement('input', { id: 'phone', className: 'form-control', type: 'text', name: 'phone', placeholder: 'Phone Number' })
			),
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement('input', { id: 'pass', className: 'form-control', type: 'password', name: 'pass', placeholder: 'Password' }),
				React.createElement('input', { id: 'pass2', className: 'form-control', type: 'password', name: 'pass2', placeholder: 'Retype Password' })
			),
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement(
					'div',
					{ className: 'offset-sm-2 col-sm-4' },
					React.createElement('input', { type: 'hidden', name: '_csrf', value: this.props.csrf }),
					React.createElement('input', { className: 'formSubmit btn', type: 'submit', value: 'Sign Up Now!' })
				)
			)
		)
	);
};

// Sets up the component for the page
var createSignupComp = function createSignupComp(csrf) {

	var SignupComp = React.createClass({
		displayName: 'SignupComp',

		handleSubmit: handleSignup,
		render: renderSignup
	});

	ReactDOM.render(React.createElement(SignupComp, { csrf: csrf }), document.querySelector("#userInfo"));
};

var setup = function setup(csrf) {
	createSignupComp(csrf);
};
"use strict";

var handleError = function handleError(message) {
	$(".errorMessage").text(message);
};

var redirect = function redirect(response) {
	window.location = response.redirect;
};

// Sends the request
var sendAjax = function sendAjax(type, action, data, success) {
	$.ajax({
		cache: false,
		type: type,
		url: action,
		data: data,
		dataType: "json",
		success: success,
		error: function error(xhr, status, _error) {
			var msgObj = JSON.parse(xhr.responseText);
			handleError(msgObj.error);
		}
	});
};

// Gets a csrf token to be used
var getToken = function getToken() {
	sendAjax('GET', '/getToken', null, function (result) {
		setup(result.csrfToken);
	});
};

$(document).ready(function () {
	getToken();
});
