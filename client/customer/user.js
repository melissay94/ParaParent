let jobListRenderer;
let jobForm;
let JobListClass;
let JobFormClass;

// Handles "sending" a job
const handleJobs = (e) => {
	e.preventDefault();
	
	// Where the check will go once I have a check
	
	sendAjax('POST', $("#jobSumbit").attr("action"), $("#jobSubmit").serialize(), function() {
		jobListRenderer.loadJobsFromServer();
	});
	
	handleError("Your job has been submitted");
	
	return false;
};

// Renders the navigation bar
const renderNavBar = function() {
	return (
		<div className="container">
				<div className="navbar-header">
					<h3 href="#" className="navbar-brand">ParaParent</h3>
				</div>
				<div className="collapse navbar-collapse">
					<ul className="nav navbar-nav">
						<li className="userLink"><a href="/useraccount">Account</a></li>
						<li className="userLink"><a href="/logout">Logout</a></li>
					</ul>
				</div>
			</div>
	);
};
// Renders the options grid to lead to the modal form
const renderJobSelect = function() {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-6">
					<div className="row">
						<div className="col-sm-8">
							
						</div>
						<div className="col-sm-4">
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="row">
						<div className="col-sm-8">
						</div>
						<div className="col-sm-4">
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<div className="row">
						<div className="col-sm-8">
						</div>
						<div className="col-sm-4">
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="row">
						<div className="col-sm-8">
						</div>
						<div className="col-sm-4">
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// Renders the jobs form for submitting a new request
const renderJobForm = function() {
	return (
		<div>
			<h3>Pick a Service</h3>
		</div>
	);
};

// Renders a list of old jobs
const renderJobList = function() {
	if (this.state.data.length === 0) {
		return (
			<div className="jobList">
				<h3 className="emptyList">You have no requests</h3>
			</div>
		);
	}
	
	const jobNodes = this.state.data.map(function(job){
		return (
			<div key={job._id} className="job">
				<h3 className="service">{job.name}</h3>
			</div>
		);
	});
	
	return (
		<div className="jobList">
			{jobNodes}
		</div>
	);
};

const setup = function(csrf) {
	
	// Set up the navbar
	const NavBarComp = React.createClass({
		render: renderNavBar
	});
	
	ReactDOM.render(
		<NavBarComp />,
		document.querySelector("#navigation")
	);
	
	// Set up submission form
	JobFormClass = React.createClass({
			render: renderJobForm,
	});
	
	// Set up list of past and pending jobs
	JobListClass = React.createClass({
		loadJobsFromServer: function() {
			sendAjax('GET', '/getJobs', null, function(data) {
				this.setState({ data: data.jobs });
				console.log(data);
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
		<JobFormClass csrf={csrf} />, document.querySelector('#addJob')
	);
	
	jobListRenderer = ReactDOM.render(
		<JobListClass csrf={csrf} />, document.querySelector('#jobs')
	);
};