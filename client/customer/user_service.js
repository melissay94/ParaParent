let jobListRenderer;
let jobForm;
let JobListClass;
let JobFormClass;
let jobListAdd = "";

// Handles "sending" a job
const handleJobs = (e) => {
	e.preventDefault();
	
	if ($("#service").val() == '' || $("#time").val() ==''
		|| $("#address").val() == '' || $("#payment").val() == '')
	{
		handleError("All fields required");
		return false;
	}
	
	sendAjax('POST', $("#jobSumbit").attr("action"), $("#jobSubmit").serialize(), function() {
		jobListRenderer.loadJobsFromServer();
	});
	
	handleError("Your job has been submitted");
	
	// Reset all the pluses and all fields to empty
	jobListAdd = "";
	document.querySelector("#addDelivery").style = "color: black;";
	document.querySelector("#addClean").style = "color: black;";
	document.querySelector("#addRides").style = "color: black;";
	document.querySelector("#addErrands").style = "color: black;";
	
	document.querySelector("#jobService").value = "";	
	document.querySelector("#jobTime").value = "";	
	document.querySelector("#jobAddress").value = "";	
	document.querySelector("#jobPayment").value = "";
	
	return false;
};

const handleJobSelect = (jobType) => {
	
	const name = "#add"+jobType;

	if (jobListAdd.indexOf(jobType) < 0) {
			jobListAdd += jobType + " ";
			document.querySelector(name).style = "color: lightgreen;";
	}
	else {
		jobListAdd = jobListAdd.replace(jobType, "");
		document.querySelector(name).style = "color: black;";
	}
	
};

// Hook up buttons
const handleJobButtons = () => {
	const deliveryButton = document.querySelector("#addDelivery");
	const cleanButton = document.querySelector("#addClean");
	const ridesButton = document.querySelector("#addRides");
	const errandsButton = document.querySelector("#addErrands");
	
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
};

// Renders the options grid to lead to the modal form
const renderJobSelect = function() {
	return (
		<div className="container-fluid">
			<h3>Select Desired Services</h3>
			<div className="row">
				<div className="col-md-6">
					<div className="col-md-10">
						<div className="row">
							<div className="col-sm-4">
								<img src="assets/img/DeliveryIcon.png" />
							</div>
							<div className="col-sm-6">
								<h3>Delivery</h3>
							</div>
							<div className="col-sm-2">
								<button id="addDelivery"><span className="glyphicon glyphicon-plus"></span></button>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="col-md-10">
						<div className="row">
							<div className="col-sm-4">
								<img src="assets/img/CleanIcon.png" />
							</div>
							<div className="col-sm-6">
								<h3>Tidy Up</h3>
							</div>
							<div className="col-sm-2">
								<button id="addClean"><span className="glyphicon glyphicon-plus"></span></button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<div className="col-md-10">
						<div className="row">
							<div className="col-sm-4">
								<img src="assets/img/RideIcon.png" />
							</div>
							<div className="col-sm-6">
								<h3>Rides</h3>
							</div>
							<div className="col-sm-2">
								<button id="addRides"><span className="glyphicon glyphicon-plus"></span></button>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="col-md-10">
						<div className="row">
							<div className="col-sm-4">
								<img src="assets/img/ErrandIcon.png" />
							</div>
							<div className="col-sm-6">
								<h3>Errands</h3>
							</div>
							<div className="col-sm-2">
								<button id="addErrands"><span className="glyphicon glyphicon-plus"></span></button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<a className="btn" href="#serviceModal" id="startForm" data-toggle="modal">Submit</a>
				</div>
			</div>
		</div>
	);
};

// Set up the login modal
const renderJobForm = function() {
	return (
			<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<h3>Submit Service Request</h3>
				</div>
				<div className="modal-body">
					<form id="jobSubmit" name="jobSumbit"
							onSubmit={this.handleSubmit}
							action="userprofile"
							method="POST"
							className="jobForm"
						>
						<div className="form-group">
							<label htmlFor="service">Services Selected: </label>
							<input id="jobService" className="form-control" type="text" name="service" value={jobListAdd} readOnly/>
						</div>
						<div className="form-group">
							<label htmlFor="time">Fill out a Time: </label>
							<input id="jobTime" className="form-control" type="text" name="time" placeholder="Enter Time (ASAP accepted)" />
						</div>
						<div className="form-group">
							<label htmlFor="address">Fill out Address: </label>
							<input id="jobAddress" className="form-control" type="text" name="address" placeholder="Enter address" />
						</div>
						<div className="form-group">
							<label htmlFor="payment">Fill out payment option: </label>
							<input id="jobPayment" className="form-control" type="text" name="payment" placeholder="Enter card number" />
						</div>
						<div className="form-group">
							<div  className="container">
								<input type="hidden" name="_csrf" value={this.props.csrf} />
								<input className="formSubmit btn" type="submit" value="Sumbit Request" />
						 </div>
						</div>
					</form>
					<div className="errorMessage"></div>
				</div>
			</div>
		</div>
	);
};

// Renders a list of old jobs
const renderJobList = function() {
	if (this.state.data.length === 0) {
		return (
			<div className="jobList row">
				<h4 className="emptyList col-md-6">No request history at this time.</h4>
			</div>
		);
	}
	console.log(this.state.data);
	
	const jobNodes = this.state.data.map(function(job){
		return (
			<div key={job._id} className="job row">
				<h4 className="service col-md-6">{job.service}</h4>
				<h4 className="service col-md-3">{job.createdDate}</h4>
				<h4 className="service col-md-3">{job.status}</h4>
			</div>
		);
	});
	
	return (
		<div className="jobList">
			{jobNodes}
		</div>
	);
};