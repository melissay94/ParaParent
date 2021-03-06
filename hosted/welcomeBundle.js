'use strict';

var handleError = function handleError(message) {
  $('.errorMessage').text(message);
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
    dataType: 'json',
    success: success,
    error: function error(xhr) {
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
		'div',
		null,
		React.createElement(
			'h3',
			null,
			'Worker Login'
		),
		React.createElement(
			'form',
			{ id: 'loginWorkerForm', name: 'loginWorkerForm',
				onSubmit: this.handleSubmit,
				action: '/loginWorker',
				method: 'POST',
				className: 'mainForm' },
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement('input', { id: 'email', className: 'form-control top-form', type: 'text', name: 'email', placeholder: 'Email Address' }),
				React.createElement('input', { id: 'pass', className: 'form-control bottom-form', type: 'password', name: 'pass', placeholder: 'Password' })
			),
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement('input', { type: 'hidden', name: '_csrf', value: this.props.csrf }),
					React.createElement('input', { className: 'formSubmit btn', type: 'submit', value: 'Login' })
				)
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
				React.createElement('input', { id: 'first', className: 'form-control top-form', type: 'text', name: 'first', placeholder: 'First Name' }),
				React.createElement('input', { id: 'last', className: 'form-control bottom-form', type: 'text', name: 'last', placeholder: 'Last Name' })
			),
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement('input', { id: 'email', className: 'form-control top-form', type: 'text', name: 'email', placeholder: 'Email Address' }),
				React.createElement('input', { id: 'phone', className: 'form-control bottom-form', type: 'text', name: 'phone', placeholder: 'Phone Number' })
			),
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement('input', { id: 'pass', className: 'form-control top-form', type: 'password', name: 'pass', placeholder: 'Password' }),
				React.createElement('input', { id: 'pass2', className: 'form-control bottom-form', type: 'password', name: 'pass2', placeholder: 'Retype Password' })
			),
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement(
					'div',
					{ className: 'container' },
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
		render: renderWorkerLogin
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
		'div',
		null,
		React.createElement(
			'h3',
			null,
			'Customer Login'
		),
		React.createElement(
			'form',
			{ id: 'loginUserForm', name: 'loginUserForm',
				onSubmit: this.handleSubmit,
				action: '/loginUser',
				method: 'POST',
				className: 'loginForm' },
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement('input', { id: 'email', className: 'form-control top-form', type: 'text', name: 'email', placeholder: 'Email Address' }),
				React.createElement('input', { id: 'pass', className: 'form-control bottom-form', type: 'password', name: 'pass', placeholder: 'Password' })
			),
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement('input', { type: 'hidden', name: '_csrf', value: this.props.csrf }),
					React.createElement('input', { className: 'formSubmit btn', type: 'submit', value: 'Login' })
				)
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
				React.createElement('input', { id: 'first', className: 'form-control top-form', type: 'text', name: 'first', placeholder: 'First Name' }),
				React.createElement('input', { id: 'last', className: 'form-control bottom-form', type: 'text', name: 'last', placeholder: 'Last Name' })
			),
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement('input', { id: 'email', className: 'form-control top-form', type: 'text', name: 'email', placeholder: 'Email Address' }),
				React.createElement('input', { id: 'phone', className: 'form-control bottom-form', type: 'text', name: 'phone', placeholder: 'Phone Number' })
			),
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement('input', { id: 'pass', className: 'form-control top-form', type: 'password', name: 'pass', placeholder: 'Password' }),
				React.createElement('input', { id: 'pass2', className: 'form-control bottom-form', type: 'password', name: 'pass2', placeholder: 'Retype Password' })
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
					{ className: 'container' },
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
		render: renderUserLogin
	});

	ReactDOM.render(React.createElement(LoginComp, { csrf: csrf }), document.querySelector("#userPopup"));
};
"use strict";

var renderServicesBar = function renderServicesBar() {
	return React.createElement(
		"div",
		{ className: "services" },
		React.createElement(
			"h3",
			null,
			"Our Services"
		),
		React.createElement(
			"div",
			{ className: "row" },
			React.createElement(
				"div",
				{ className: "col-md-3 serviceIcon", id: "delivery" },
				React.createElement("img", { src: "assets/img/DeliveryIcon.png" }),
				React.createElement(
					"h3",
					null,
					"Delivery"
				)
			),
			React.createElement(
				"div",
				{ className: "col-md-3 serviceIcon", id: "cleanup" },
				React.createElement("img", { src: "assets/img/CleanIcon.png" }),
				React.createElement(
					"h3",
					null,
					"Tidy Up"
				)
			),
			React.createElement(
				"div",
				{ className: "col-md-3 serviceIcon", id: "rides" },
				React.createElement("img", { src: "assets/img/RideIcon.png" }),
				React.createElement(
					"h3",
					null,
					"Rides"
				)
			),
			React.createElement(
				"div",
				{ className: "col-md-3 serviceIcon", id: "errands" },
				React.createElement("img", { src: "assets/img/ErrandIcon.png" }),
				React.createElement(
					"h3",
					null,
					"Errands"
				)
			)
		),
		React.createElement("div", { id: "serviceExplained" })
	);
};

var renderDeliverySection = function renderDeliverySection() {
	return React.createElement(
		"div",
		{ className: "serviceExplanation jumbotron" },
		React.createElement(
			"h4",
			null,
			"Cannot get what you need from the supermarket?"
		),
		React.createElement(
			"p",
			null,
			"Let us bring you what you need for the day, including over the counter medicine"
		)
	);
};

var renderCleanSection = function renderCleanSection() {
	return React.createElement(
		"div",
		{ className: "serviceExplanation jumbotron" },
		React.createElement(
			"h4",
			null,
			"Do not have the energy to tidy up?"
		),
		React.createElement(
			"p",
			null,
			"Our workers will come over and do some light cleaning for you, like dishes or running some laundry"
		)
	);
};

var renderRidesSection = function renderRidesSection() {
	return React.createElement(
		"div",
		{ className: "serviceExplanation jumbotron" },
		React.createElement(
			"h4",
			null,
			"Need to be somewhere but cannot drive?"
		),
		React.createElement(
			"p",
			null,
			"We will gladly pick you up! We will even come get you again to take you home"
		)
	);
};

var renderErrandsSection = function renderErrandsSection() {
	return React.createElement(
		"div",
		{ className: "serviceExplanation jumbotron" },
		React.createElement(
			"h4",
			null,
			"Got some small things that just need to get done?"
		),
		React.createElement(
			"p",
			null,
			"We can do it! Deliver a package, drop off some notes at your work, we have got it."
		)
	);
};

var createServicesComp = function createServicesComp() {
	var ServicesComp = React.createClass({
		displayName: "ServicesComp",

		render: renderServicesBar
	});

	ReactDOM.render(React.createElement(ServicesComp, null), document.querySelector("#userServices"));
};

var createDeliveryComp = function createDeliveryComp() {
	var DeliveryComp = React.createClass({
		displayName: "DeliveryComp",

		render: renderDeliverySection
	});

	ReactDOM.render(React.createElement(DeliveryComp, null), document.querySelector("#serviceExplained"));
};

var createCleanUpComp = function createCleanUpComp() {
	var CleanUpComp = React.createClass({
		displayName: "CleanUpComp",

		render: renderCleanSection
	});

	ReactDOM.render(React.createElement(CleanUpComp, null), document.querySelector("#serviceExplained"));
};

var createRidesComp = function createRidesComp() {
	var RidesComp = React.createClass({
		displayName: "RidesComp",

		render: renderRidesSection
	});

	ReactDOM.render(React.createElement(RidesComp, null), document.querySelector("#serviceExplained"));
};

var createErrandsComp = function createErrandsComp() {
	var ErrandsComp = React.createClass({
		displayName: "ErrandsComp",

		render: renderErrandsSection
	});

	ReactDOM.render(React.createElement(ErrandsComp, null), document.querySelector("#serviceExplained"));
};

var checkSelected = function checkSelected(csrf) {
	var deliveryButton = document.querySelector("#delivery");
	var cleanupButton = document.querySelector("#cleanup");
	var ridesButton = document.querySelector("#rides");
	var errandsButton = document.querySelector("#errands");

	deliveryButton.addEventListener("click", function (e) {
		e.preventDefault();
		createDeliveryComp();
		return false;
	});

	cleanupButton.addEventListener("click", function (e) {
		e.preventDefault();
		createCleanUpComp();
		return false;
	});

	ridesButton.addEventListener("click", function (e) {
		e.preventDefault();
		createRidesComp();
		return false;
	});

	errandsButton.addEventListener("click", function (e) {
		e.preventDefault();
		createErrandsComp();
		return false;
	});

	createDeliveryComp();
};
"use strict";

// Set up the nav bar 
var renderNavBar = function renderNavBar() {
	return React.createElement(
		"div",
		{ className: "container" },
		React.createElement(
			"div",
			{ className: "navbar-header" },
			React.createElement(
				"h3",
				{ href: "#", className: "navbar-brand" },
				"ParaParent"
			)
		),
		React.createElement(
			"div",
			{ className: "collapse navbar-collapse" },
			React.createElement(
				"ul",
				{ className: "nav navbar-nav" },
				React.createElement(
					"li",
					null,
					React.createElement(
						"a",
						{ href: "#userServices" },
						"Our Services"
					)
				),
				React.createElement(
					"li",
					null,
					React.createElement(
						"a",
						{ href: "#whyUs" },
						"Why Us"
					)
				),
				React.createElement(
					"li",
					{ id: "loginLi" },
					React.createElement(
						"a",
						{ href: "#loginModal", className: "btn", id: "login", "data-toggle": "modal" },
						"Login"
					)
				)
			)
		)
	);
};

// Set up the login modal
var renderLoginModal = function renderLoginModal() {
	return React.createElement(
		"div",
		{ className: "modal-dialog" },
		React.createElement(
			"div",
			{ className: "modal-content" },
			React.createElement(
				"div",
				{ className: "modal-header" },
				React.createElement(
					"ul",
					{ className: "nav row" },
					React.createElement(
						"li",
						{ className: "nav-item col-sm-6" },
						React.createElement(
							"a",
							{ className: "nav-link form-nav", id: "userLoginButton", href: "/signup" },
							"Customer"
						)
					),
					React.createElement(
						"li",
						{ className: "nav-item col-sm-6" },
						React.createElement(
							"a",
							{ className: "nav-link form-nav", id: "wokerLoginButton", href: "/apply" },
							"Worker"
						)
					)
				)
			),
			React.createElement(
				"div",
				{ className: "modal-body" },
				React.createElement("div", { id: "userPopup" }),
				React.createElement("div", { className: "errorMessage" })
			)
		)
	);
};

// Set up the main form base
var renderMainForm = function renderMainForm() {
	return React.createElement(
		"div",
		null,
		React.createElement(
			"div",
			{ className: "container-fluid" },
			React.createElement(
				"ul",
				{ className: "nav row" },
				React.createElement(
					"li",
					{ className: "nav-item col-sm-6" },
					React.createElement(
						"a",
						{ className: "nav-link form-nav", id: "signupButton", href: "/signup" },
						"Sign Up"
					)
				),
				React.createElement(
					"li",
					{ className: "nav-item col-sm-6" },
					React.createElement(
						"a",
						{ className: "nav-link form-nav", id: "applyButton", href: "/apply" },
						"Apply to Us"
					)
				)
			)
		),
		React.createElement("div", { id: "userInfo", className: "container" }),
		React.createElement("div", { className: "errorMessage" })
	);
};

// Set up all the buttons for the page and all the components
var setup = function setup(csrf) {

	// Set up the navbar
	var NavBarComp = React.createClass({
		displayName: "NavBarComp",

		render: renderNavBar
	});

	ReactDOM.render(React.createElement(NavBarComp, null), document.querySelector("#navigation"));

	// Set up the modal 
	var LoginModalComp = React.createClass({
		displayName: "LoginModalComp",

		render: renderLoginModal
	});

	ReactDOM.render(React.createElement(LoginModalComp, null), document.querySelector("#loginModal"));

	// Set up the base form
	var MainFormComp = React.createClass({
		displayName: "MainFormComp",

		render: renderMainForm
	});

	ReactDOM.render(React.createElement(MainFormComp, null), document.querySelector("#mainForm"));

	var applyButton = document.querySelector("#applyButton");
	var signupButton = document.querySelector("#signupButton");
	var login = document.querySelector("#login");
	var loginCustomer = document.querySelector("#userLoginButton");
	var loginWorker = document.querySelector("#wokerLoginButton");

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

	login.addEventListener("click", function (e) {
		e.preventDefault();
		createLoginUserComp(csrf);
		return false;
	});

	loginCustomer.addEventListener("click", function (e) {
		e.preventDefault();
		createLoginUserComp(csrf);
		return false;
	});

	loginWorker.addEventListener("click", function (e) {
		e.preventDefault();
		createLoginWorkerComp(csrf);
		return false;
	});

	createSignupComp(csrf);
	createServicesComp(csrf);
	checkSelected();
};
