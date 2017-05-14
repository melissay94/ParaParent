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
"use strict";

var setup = function setup(csrf) {
	var applyButton = document.querySelector("#applyButton");
	var signupButton = document.querySelector("#signupButton");

	applyButton.addEventListener("click", function (e) {
		e.preventDefault();
		createApplicationComp(csrf);
		return false;
	});

	signupButton.addEventListener("click", function (e) {
		e.preventDefault();
		createSignupComp(csrf);
		return false;
	});

	createSignupComp(csrf);
};
'use strict';

// Handles sending login request and checks for workers
var handleWorkerLogin = function handleWorkerLogin(e) {
	e.preventDefault();

	if ($("#email").val() == '' || $('#pass').val() == '') {
		handleError("All fields needed to make sure its you");
		return false;
	}

	sendAjax('POST', $("#loginWorkerForm").attr("action"), $("#loginWorkerForm").serialize(), redirect);

	return false;
};

// Handles sending application requests and checks
var handleApply = function handleApply(e) {
	e.preventDefault();

	if ($("#email").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '' || $("#first").val() == '' || $("#last").val() == '' || $("#phone").val() == '') {
		handleError("We need all fields for your application");
		return false;
	}

	if ($("#pass").val() !== $("#pass2").val()) {
		handleError("Passwords do not match");
		return false;
	}

	sendAjax('POST', $("#workerApplication").attr("action"), $("#workerApplication").serialize(), redirect);

	return false;
};

// Renders the login component for a worker
var renderWorkerLogin = function renderWorkerLogin() {
	return React.createElement(
		'form',
		{ id: 'loginWorkerForm', name: 'loginWorkerForm',
			onSubmit: this.handleSubmit,
			action: '/loginWorker',
			method: 'POST',
			className: 'mainForm' },
		React.createElement(
			'div',
			{ className: 'form-group' },
			React.createElement('input', { id: 'email', className: 'form-control', type: 'text', placeholder: 'Email Address' }),
			React.createElement('input', { id: 'pass', className: 'form-control', type: 'password', placeholder: 'Password' })
		),
		React.createElement(
			'div',
			{ className: 'form-group' },
			React.createElement(
				'div',
				{ className: 'offset-sm-2 col-sm-4' },
				React.createElement('input', { type: 'hidden', name: '_csrf', value: this.props.csrf }),
				React.createElement('input', { className: 'formSubmit btn', type: 'submit', value: 'Login' })
			)
		)
	);
};

var renderApplyTo = function renderApplyTo() {
	return React.createElement(
		'div',
		{ className: 'workerApply' },
		React.createElement(
			'form',
			{ id: 'workerApplication', name: 'workerApplication',
				onSubmit: this.handleSubmit,
				action: '/apply',
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
					React.createElement('input', { className: 'formSubmit btn', type: 'submit', value: 'Apply Now!' })
				)
			)
		)
	);
};

// Sets up the component for the page
var createApplicationComp = function createApplicationComp(csrf) {

	var ApplicationComp = React.createClass({
		displayName: 'ApplicationComp',

		handleSubmit: handleApply,
		render: renderApplyTo
	});

	ReactDOM.render(React.createElement(ApplicationComp, { csrf: csrf }), document.querySelector("#userInfo"));
};

// Sets up the component for the page
var createLoginWorkerComp = function createLoginWorkerComp(csrf) {

	var LoginComp = React.createClass({
		displayName: 'LoginComp',

		handleSubmit: handleWorkerLogin,
		render: renderLogin
	});

	ReactDOM.render(React.createElement(LoginComp, { csrf: csrf }), document.querySelector("#userPopup"));
};
'use strict';

// Handles sending login request and checks for users
var handleUserLogin = function handleUserLogin(e) {
	e.preventDefault();

	if ($("#email").val() == '' || $('#pass').val() == '') {
		handleError("All fields needed to make sure its you");
		return false;
	}

	sendAjax('POST', $("#loginUserForm").attr("action"), $("#loginUserForm").serialize(), redirect);

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

	sendAjax('POST', $("#signupUserForm").attr("action"), $("#signupUserForm").serialize(), redirect);

	return false;
};

// Renders the login component for a customer
var renderUserLogin = function renderUserLogin() {
	return React.createElement(
		'form',
		{ id: 'loginUserForm', name: 'loginUserForm',
			onSubmit: this.handleSubmit,
			action: '/loginUser',
			method: 'POST',
			className: 'mainForm' },
		React.createElement(
			'div',
			{ className: 'form-group' },
			React.createElement('input', { id: 'email', className: 'form-control', type: 'text', placeholder: 'Email Address' }),
			React.createElement('input', { id: 'pass', className: 'form-control', type: 'password', placeholder: 'Password' })
		),
		React.createElement(
			'div',
			{ className: 'form-group' },
			React.createElement(
				'div',
				{ className: 'offset-sm-2 col-sm-4' },
				React.createElement('input', { type: 'hidden', name: '_csrf', value: this.props.csrf }),
				React.createElement('input', { className: 'formSubmit btn', type: 'submit', value: 'Login' })
			)
		)
	);
};

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
				React.createElement('input', { id: 'invite', className: 'form-control', type: 'text', name: 'invite', placeholder: 'Invite Code' })
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

// Sets up the component for the page
var createLoginUserComp = function createLoginUserComp(csrf) {

	var LoginComp = React.createClass({
		displayName: 'LoginComp',

		handleSubmit: handleUserLogin,
		render: renderLogin
	});

	ReactDOM.render(React.createElement(LoginComp, { csrf: csrf }), document.querySelector("#userPopup"));
};
