// Handles sending login request and checks for workers
const handleWorkerLogin = (e) => {
	e.preventDefault();

	if($("#email").val() == '' || $('#pass').val() == '') {
		handleError("All fields needed to make sure its you");
		return false;
	}

	sendAjax('POST', $("#loginWorkerForm").attr("action"), $("#loginWorkerForm").serialize(), redirect);

	return false;
};

// Handles sending application requests and checks
const handleApply = (e) => {
	e.preventDefault();
	
	if($("#email").val() == '' || $("#pass").val() == '' 
		 || $("#pass2").val() == '' || $("#first").val() == ''
		 || $("#last").val() == '' || $("#phone").val() == '')
		{
			handleError("We need all fields for your application");
			return false;
		}
	
	if($("#pass").val() !== $("#pass2").val()) {
		handleError("Passwords do not match");
		return false;
	}
	
	sendAjax('POST', $("#workerApplication").attr("action"), $("#workerApplication").serialize(), redirect);
	
	return false;
};

// Renders the login component for a worker
const renderWorkerLogin = function() {
	return(
		<div>
			<h3>Worker Login</h3>
			<form id="loginWorkerForm" name="loginWorkerForm"
				onSubmit={this.handleSubmit}
				action="/loginWorker"
				method="POST"
				className="mainForm">
				<div className="form-group">
					<input id="email" className="form-control" type="text" placeholder="Email Address" />
					<input id="pass" className="form-control" type="password" placeholder="Password" />
				</div>
				<div className="form-group">
					<div  className="offset-sm-2 col-sm-4">
						<input type="hidden" name="_csrf" value={this.props.csrf} />
		                <input className="formSubmit btn" type="submit" value="Login" />   
		             </div>
				</div>
			</form>
		</div>
	);
};

const renderApplyTo = function() {
	return (
		<div className="workerApply">
			<form id="workerApplication" name="workerApplication"
				onSubmit={this.handleSubmit}
				action="/apply"
				method="POST"
				className="mainForm">
					<div className="form-group">
						<input id="first" className="form-control top-form" type="text" name="first" placeholder="First Name"/>
						<input id="last" className="form-control bottom-form" type="text" name="last" placeholder="Last Name"/>
					</div>
					<div className="form-group">
						<input id="email" className="form-control top-form" type="text" name="email" placeholder="Email Address"/>
						<input id="phone" className="form-control bottom-form" type="text" name="phone" placeholder="Phone Number"/>
					</div>
					<div className="form-group">
						<input id="pass" className="form-control top-form" type="password" name="pass" placeholder="Password"/>
						<input id="pass2" className="form-control bottom-form" type="password" name="pass2" placeholder="Retype Password"/>
					</div>
					<div className="form-group">
						<div  className="container">
							<input type="hidden" name="_csrf" value={this.props.csrf} />
							<input className="formSubmit btn" type="submit" value="Apply Now!" />   
						</div>
					</div>
			</form>
		</div>
	);
};

// Sets up the component for the page
const createApplicationComp = function(csrf) {
	
	const ApplicationComp = React.createClass({
		handleSubmit: handleApply,
		render: renderApplyTo
	});
	
	ReactDOM.render(
		<ApplicationComp csrf={csrf} />,
		document.querySelector("#userInfo")
	);
};

// Sets up the component for the page
const createLoginWorkerComp = function(csrf) {

	const LoginComp = React.createClass({
		handleSubmit: handleWorkerLogin,
		render: renderWorkerLogin
	});

	ReactDOM.render(
		<LoginComp csrf={csrf} />,
		document.querySelector("#userPopup")
	);
};