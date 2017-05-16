

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

	ReactDOM.render(
		<ContentComp />,
		document.querySelector("#userContent")
	);
	
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
	
	// Hook up all the plus buttons
	const acceptButton = document.querySelector("#takeJob");
	const accountButton = document.querySelector("#useraccount");
	
	acceptButton.addEventListener("click", (e) => {
		e.preventDefault();
		return false;
	});
	accountButton.addEventListener("click", (e) => {
		e.preventDefault();
		ReactDOM.render(
			<OptionsWindow csrf={csrf} />,
			document.querySelector("#workerContent")
		);
		return false;
	})
	
	jobListRenderer = ReactDOM.render(
		<JobListClass csrf={csrf} />, document.querySelector('#jobs')
	);


};