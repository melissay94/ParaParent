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
"use strict";

// Renders the navigation bar
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
					{ className: "userLink", id: "#useraccount" },
					React.createElement(
						"a",
						{ href: "#" },
						"Account"
					)
				),
				React.createElement(
					"li",
					{ className: "userLink" },
					React.createElement(
						"a",
						{ href: "/logout" },
						"Logout"
					)
				)
			)
		)
	);
};

var setup = function setup(csrf) {

	// Set up the navbar
	var NavBarComp = React.createClass({
		displayName: "NavBarComp",

		render: renderNavBar
	});

	var ContentComp = React.createClass({
		displayName: "ContentComp",

		render: renderUserService
	});

	var OptionsWindow = React.createClass({
		displayName: "OptionsWindow",

		handleSubmit: handleChange,
		render: renderChangePass
	});

	ReactDOM.render(React.createElement(NavBarComp, null), document.querySelector("#navigation"));

	ReactDOM.render(React.createElement(ContentComp, null), document.querySelector("#userContent"));

	// Set up list of past and pending jobs
	JobListClass = React.createClass({
		displayName: "JobListClass",

		loadJobsFromServer: function loadJobsFromServer() {
			sendAjax('GET', '/getJobs', null, function (data) {
				this.setState({ data: data.jobs });
			}.bind(this));
		},
		getInitialState: function getInitialState() {
			return { data: [] };
		},
		componentDidMount: function componentDidMount() {
			this.loadJobsFromServer();
		},
		render: renderJobList
	});

	// Hook up all the plus buttons
	var acceptButton = document.querySelector("#takeJob");
	var accountButton = document.querySelector("#useraccount");

	acceptButton.addEventListener("click", function (e) {
		e.preventDefault();
		return false;
	});
	accountButton.addEventListener("click", function (e) {
		e.preventDefault();
		ReactDOM.render(React.createElement(OptionsWindow, { csrf: csrf }), document.querySelector("#workerContent"));
		return false;
	});

	jobListRenderer = ReactDOM.render(React.createElement(JobListClass, { csrf: csrf }), document.querySelector('#jobs'));
};
"use strict";

// Handles the request to change password
var handleChange = function handleChange(e) {
	e.preventDefault();

	if ($("#user").val() == '' || $("#old_pass") == '' || $("new_pass") == '') {
		handleError("Excuse me, I'mma need all that info");
		return false;
	}

	sendAjax('POST', $('#changeForm').attr("action"), $("#changeForm").serialize());

	// Reset all the fields
	document.querySelector("#user").value = "";
	document.querySelector("#old_pass").value = "";
	document.querySelector("#new_pass").value = "";

	// Using handleError to let them know it succeeded
	handleError("Password has been changed");

	return false;
};

// Set up form
var renderChangePass = function renderChangePass() {
	return React.createElement(
		"form",
		{ id: "changeForm", name: "changeForm",
			onSubmit: this.handleSubmit,
			action: "/options",
			method: "POST",
			className: "changeForm" },
		React.createElement(
			"div",
			{ className: "form-group row" },
			React.createElement(
				"label",
				{ htmlFor: "username", className: "col-md-2 col-form-label" },
				"Username: "
			),
			React.createElement(
				"div",
				{ className: "col-md-10" },
				React.createElement("input", { id: "user", className: "form-control", type: "text", name: "username", placeholder: "Username" })
			)
		),
		React.createElement(
			"div",
			{ className: "form-group row" },
			React.createElement(
				"label",
				{ htmlFor: "old_pass", className: "col-md-2 col-form-label" },
				"Current Password: "
			),
			React.createElement(
				"div",
				{ className: "col-md-10" },
				React.createElement("input", { id: "old_pass", className: "form-control", type: "password", name: "old_pass", placeholder: "Current Password" })
			)
		),
		React.createElement(
			"div",
			{ className: "form-group row" },
			React.createElement(
				"label",
				{ htmlFor: "new_pass", className: "col-md-2 col-form-label" },
				"New Password: "
			),
			React.createElement(
				"div",
				{ className: "col-md-10" },
				React.createElement("input", { id: "new_pass", className: "form-control", type: "password", name: "new_pass", placeholder: "New Password" })
			)
		),
		React.createElement(
			"div",
			{ className: "form-group row" },
			React.createElement(
				"div",
				{ className: "offset-md-10 col-md-10" },
				React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
				React.createElement("input", { className: "formSubmit btn", type: "submit", value: "Reset Password" })
			)
		)
	);
};
"use strict";

// Renders a list of old jobs
var renderJobList = function renderJobList() {
	if (this.state.data.length === 0) {
		return React.createElement(
			"div",
			{ className: "jobList" },
			React.createElement(
				"h3",
				{ className: "emptyList" },
				"You have no requests"
			)
		);
	}

	var jobNodes = this.state.data.map(function (job) {
		return React.createElement(
			"div",
			{ key: job._id, className: "job" },
			React.createElement(
				"h3",
				{ className: "service" },
				job.name
			)
		);
	});

	return React.createElement(
		"div",
		{ className: "jobList" },
		jobNodes
	);
};
