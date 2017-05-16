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

var jobListRenderer = void 0;
var jobForm = void 0;
var JobListClass = void 0;
var JobFormClass = void 0;

// Handles "sending" a job
var handleJobs = function handleJobs(e) {
	e.preventDefault();

	// Where the check will go once I have a check

	sendAjax('POST', $("#jobSumbit").attr("action"), $("#jobSubmit").serialize(), function () {
		jobListRenderer.loadJobsFromServer();
	});

	handleError("Your job has been submitted");

	return false;
};

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
					{ className: "userLink" },
					React.createElement(
						"a",
						{ href: "/useraccount" },
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

// Renders the jobs form for submitting a new request
var renderJobForm = function renderJobForm() {
	return React.createElement(
		"div",
		null,
		React.createElement(
			"h3",
			null,
			"Pick a Service"
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

var setup = function setup(csrf) {

	// Set up the navbar
	var NavBarComp = React.createClass({
		displayName: "NavBarComp",

		render: renderNavBar
	});

	ReactDOM.render(React.createElement(NavBarComp, null), document.querySelector("#navigation"));

	// Set up submission form
	JobFormClass = React.createClass({
		displayName: "JobFormClass",

		render: renderJobForm
	});

	// Set up list of past and pending jobs
	JobListClass = React.createClass({
		displayName: "JobListClass",

		loadJobsFromServer: function loadJobsFromServer() {
			sendAjax('GET', '/getJobs', null, function (data) {
				this.setState({ data: data.jobs });
				console.log(data);
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

	jobForm = ReactDOM.render(React.createElement(JobFormClass, { csrf: csrf }), document.querySelector('#addJob'));

	jobListRenderer = ReactDOM.render(React.createElement(JobListClass, { csrf: csrf }), document.querySelector('#jobs'));
};
