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

// Renders the content
var renderUserService = function renderUserService() {
	return React.createElement(
		"div",
		null,
		React.createElement("div", { id: "addJob" }),
		React.createElement("div", { id: "jobs" })
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

	var JobFormModal = React.createClass({
		displayName: "JobFormModal",

		handleSubmit: handleJobs,
		render: renderJobForm
	});

	ReactDOM.render(React.createElement(ContentComp, null), document.querySelector("#userContent"));

	// Set up submission form
	JobFormClass = React.createClass({
		displayName: "JobFormClass",

		render: renderJobSelect
	});

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

	jobForm = ReactDOM.render(React.createElement(JobFormClass, null), document.querySelector('#addJob'));

	// Hook up all the plus buttons
	var deliveryButton = document.querySelector("#addDelivery");
	var cleanButton = document.querySelector("#addClean");
	var ridesButton = document.querySelector("#addRides");
	var errandsButton = document.querySelector("#addErrands");
	var sumbitButton = document.querySelector("#startForm");
	var accountButton = document.querySelector("#useraccount");

	deliveryButton.addEventListener("click", function (e) {
		e.preventDefault();
		handleJobSelect("Delivery");
		return false;
	});
	cleanButton.addEventListener("click", function (e) {
		e.preventDefault();
		handleJobSelect("Clean");
		return false;
	});
	ridesButton.addEventListener("click", function (e) {
		e.preventDefault();
		handleJobSelect("Rides");
		return false;
	});
	errandsButton.addEventListener("click", function (e) {
		e.preventDefault();
		handleJobSelect("Errands");
		return false;
	});
	startForm.addEventListener("click", function (e) {
		e.preventDefault();
		ReactDOM.render(React.createElement(JobFormModal, { csrf: csrf }), document.querySelector("#serviceModal"));
		return false;
	});
	accountButton.addEventListener("click", function (e) {
		e.preventDefault();
		ReactDOM.render(React.createElement(OptionsWindow, { csrf: csrf }), document.querySelector("#userContent"));
		return false;
	});

	jobListRenderer = ReactDOM.render(React.createElement(JobListClass, { csrf: csrf }), document.querySelector('#jobs'));
};
"use strict";

var jobListRenderer = void 0;
var jobForm = void 0;
var JobListClass = void 0;
var JobFormClass = void 0;
var jobListAdd = "";

// Handles "sending" a job
var handleJobs = function handleJobs(e) {
	e.preventDefault();

	if ($("#service").val() == '' || $("#time").val() == '' || $("#address").val() == '' || $("#payment").val() == '') {
		handleError("All fields required");
		return false;
	}

	sendAjax('POST', $("#jobSumbit").attr("action"), $("#jobSubmit").serialize(), function () {
		jobListRenderer.loadJobsFromServer();
	});

	handleError("Your job has been submitted");

	return false;
};

var handleJobSelect = function handleJobSelect(jobType) {

	var name = "#add" + jobType;

	if (jobListAdd.indexOf(jobType) < 0) {
		jobListAdd += jobType + " ";
		document.querySelector(name).style = "color: lightgreen;";
	} else {
		console.log("hi ", jobListAdd.indexOf(jobType));
		jobListAdd.replace(jobType, "");
		document.querySelector(name).style = "color: black;";
	}

	console.log(jobListAdd);
};

// Renders the options grid to lead to the modal form
var renderJobSelect = function renderJobSelect() {
	return React.createElement(
		"div",
		{ className: "container-fluid" },
		React.createElement(
			"div",
			{ className: "row" },
			React.createElement(
				"div",
				{ className: "col-md-6" },
				React.createElement(
					"div",
					{ className: "col-md-10" },
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-sm-4" },
							React.createElement("img", { src: "assets/img/DeliveryIcon.png" })
						),
						React.createElement(
							"div",
							{ className: "col-sm-6" },
							React.createElement(
								"h3",
								null,
								"Delivery"
							)
						),
						React.createElement(
							"div",
							{ className: "col-sm-2" },
							React.createElement(
								"button",
								{ id: "addDelivery" },
								React.createElement("span", { className: "glyphicon glyphicon-plus" })
							)
						)
					)
				)
			),
			React.createElement(
				"div",
				{ className: "col-md-6" },
				React.createElement(
					"div",
					{ className: "col-md-10" },
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-sm-4" },
							React.createElement("img", { src: "assets/img/CleanIcon.png" })
						),
						React.createElement(
							"div",
							{ className: "col-sm-6" },
							React.createElement(
								"h3",
								null,
								"Tidy Up"
							)
						),
						React.createElement(
							"div",
							{ className: "col-sm-2" },
							React.createElement(
								"button",
								{ id: "addClean" },
								React.createElement("span", { className: "glyphicon glyphicon-plus" })
							)
						)
					)
				)
			)
		),
		React.createElement(
			"div",
			{ className: "row" },
			React.createElement(
				"div",
				{ className: "col-md-6" },
				React.createElement(
					"div",
					{ className: "col-md-10" },
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-sm-4" },
							React.createElement("img", { src: "assets/img/RideIcon.png" })
						),
						React.createElement(
							"div",
							{ className: "col-sm-6" },
							React.createElement(
								"h3",
								null,
								"Rides"
							)
						),
						React.createElement(
							"div",
							{ className: "col-sm-2" },
							React.createElement(
								"button",
								{ id: "addRides" },
								React.createElement("span", { className: "glyphicon glyphicon-plus" })
							)
						)
					)
				)
			),
			React.createElement(
				"div",
				{ className: "col-md-6" },
				React.createElement(
					"div",
					{ className: "col-md-10" },
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-sm-4" },
							React.createElement("img", { src: "assets/img/ErrandIcon.png" })
						),
						React.createElement(
							"div",
							{ className: "col-sm-6" },
							React.createElement(
								"h3",
								null,
								"Errands"
							)
						),
						React.createElement(
							"div",
							{ className: "col-sm-2" },
							React.createElement(
								"button",
								{ id: "addErrands" },
								React.createElement("span", { className: "glyphicon glyphicon-plus" })
							)
						)
					)
				)
			)
		),
		React.createElement(
			"div",
			{ className: "row" },
			React.createElement(
				"a",
				{ className: "btn", href: "#serviceModal", id: "startForm", "data-toggle": "modal" },
				"Submit"
			)
		)
	);
};

// Set up the login modal
var renderJobForm = function renderJobForm() {
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
					"h3",
					null,
					"Submit Service Request"
				)
			),
			React.createElement(
				"div",
				{ className: "modal-body" },
				React.createElement(
					"form",
					{ id: "jobSubmit", name: "jobSumbit",
						onSubmit: this.handleSubmit,
						action: "userprofile",
						method: "POST",
						className: "jobForm"
					},
					React.createElement(
						"div",
						{ className: "form-group" },
						React.createElement(
							"label",
							{ htmlFor: "service" },
							"Services Selected: "
						),
						React.createElement("input", { id: "jobService", className: "form-control", type: "text", name: "service", value: jobListAdd, readOnly: true })
					),
					React.createElement(
						"div",
						{ className: "form-group" },
						React.createElement(
							"label",
							{ htmlFor: "time" },
							"Fill out a Time: "
						),
						React.createElement("input", { className: "form-control", type: "text", name: "payment", placeholder: "Enter card number" })
					),
					React.createElement(
						"div",
						{ className: "form-group" },
						React.createElement(
							"label",
							{ htmlFor: "address" },
							"Fill out Address: "
						),
						React.createElement("input", { id: "jobAddress", className: "form-control", type: "text", name: "address", placeholder: "Enter address" })
					),
					React.createElement(
						"div",
						{ className: "form-group" },
						React.createElement(
							"label",
							{ htmlFor: "payment" },
							"Fill out payment option: "
						),
						React.createElement("input", { className: "form-control", type: "text", name: "payment", placeholder: "Enter card number" })
					),
					React.createElement(
						"div",
						{ className: "form-group" },
						React.createElement(
							"div",
							{ className: "container" },
							React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
							React.createElement("input", { className: "formSubmit btn", type: "submit", value: "Sumbit Request" })
						)
					)
				),
				React.createElement("div", { className: "errorMessage" })
			)
		)
	);
};

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
