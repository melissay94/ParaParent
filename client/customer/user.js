// Renders the navigation bar
const renderNavBar = function() {
	return (
		<div className="container">
				<div className="navbar-header">
					<h3 href="#" className="navbar-brand">ParaParent</h3>
				</div>
				<div className="collapse navbar-collapse">
					<ul className="nav navbar-nav">
						<li className="userLink" id="#useraccount"><a href="#">Account</a></li>
						<li className="userLink"><a href="/logout">Logout</a></li>
					</ul>
				</div>
			</div>
	);
};

// Renders the content
const renderUserService = function() {
	return (
		<div id="jobContent">
			<div id="addJob"></div>
			<div id="jobHistory" className="container-fluid">
				<h3>Service Request History</h3>
				<div className="row" id="historyHeader">
					<div className="col-md-6">
						<h3>Services</h3>
					</div>
					<div className="col-md-3">
						<h3>Date</h3>
					</div>
					<div className="col-md-3">
						<h3>Status</h3>
					</div>
				</div>
				<div id="jobs"></div>
			</div>
		</div>
	);
};

const setup = function(csrf) {
	
	// Set up the navbar
	const NavBarComp = React.createClass({
		render: renderNavBar
	});
	
	const ContentComp = React.createClass({
		render: renderUserService
	});
	
	const OptionsWindow = React.createClass({
		handleSubmit: handleChange,
		render: renderChangePass
	});
	
	ReactDOM.render(
		<NavBarComp />,
		document.querySelector("#navigation")
	);
	
	const JobFormModal = React.createClass({
		handleSubmit: handleJobs,
		render: renderJobForm,
	});
	
	ReactDOM.render(
		<ContentComp />,
		document.querySelector("#userContent")
	);
	
	// Set up submission form
	JobFormClass = React.createClass({
			render: renderJobSelect,
	});
	
	// Set up list of past and pending jobs
	JobListClass = React.createClass({
		loadJobsFromServer: function() {
			sendAjax('GET', '/getJobs', null, function(data) {
				this.setState({ data: data.jobs });
			}.bind(this));
		},
		getInitialState: function() {
			return {data: []}
		},
		componentDidMount: function() {
			this.loadJobsFromServer();
		},
		render: renderJobList
	});
	
	jobForm = ReactDOM.render(
		<JobFormClass />, 
		document.querySelector('#addJob')
	);
	
	// Hook up all the plus buttons
	const deliveryButton = document.querySelector("#addDelivery");
	const cleanButton = document.querySelector("#addClean");
	const ridesButton = document.querySelector("#addRides");
	const errandsButton = document.querySelector("#addErrands");
	const sumbitButton = document.querySelector("#startForm");
	const accountButton = document.querySelector("#useraccount");
	
	deliveryButton.addEventListener("click", (e) => {
		e.preventDefault();
		handleJobSelect("Delivery");
		return false;
	});
	cleanButton.addEventListener("click", (e) => {
		e.preventDefault();
		handleJobSelect("Clean");
		return false;
	});
	ridesButton.addEventListener("click", (e) => {
		e.preventDefault();
		handleJobSelect("Rides");
		return false;
	});
	errandsButton.addEventListener("click", (e) => {
		e.preventDefault();
		handleJobSelect("Errands");
		return false;
	})
	startForm.addEventListener("click", (e) => {
		e.preventDefault();
		ReactDOM.render(
			<JobFormModal csrf={csrf} />,
			document.querySelector("#serviceModal")
		);
		return false;
	});
	
	jobListRenderer = ReactDOM.render(
		<JobListClass csrf={csrf} />, document.querySelector('#jobs')
	);


};