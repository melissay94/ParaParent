// Handles sending login request and checks for users
const handleUserLogin = (e) => {
	e.preventDefault();

	if($("#email").val() == '' || $('#pass').val() == '') {
		handleError("All fields needed to make sure its you");
		return false;
	}

	sendAjax('POST', $("#loginUserForm").attr("action"), $("#loginUserForm").serialize(), redirect);

	return false;
};

// Handles sending signup request and checks
const handleSignup = (e) => {
	e.preventDefault();

	if($("#email").val() == '' || $("#pass").val() == '' 
		 || $("#pass2").val() == '' || $("#first").val() == ''
		 || $("#last").val() == '' || $("#phone").val() == '')
	{
		handleError("We need all fields filled to create a profile");
		return false;
	}

	if($("#pass").val() !== $("#pass2").val()) {
		handleError("Passwords do not match");
		return false;
	}

	sendAjax('POST', $("#signupUserForm").attr("action"), $("#signupUserForm").serialize(), redirect);

	return false;
};
	
// Renders the login component for a customer
const renderUserLogin = function() {
	return(
		<form id="loginUserForm" name="loginUserForm"
			onSubmit={this.handleSubmit}
			action="/loginUser"
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
	);
};
		
// Renders the signup component 
const renderSignup = function() {
	return (
		<div className="userSignup">
			<form id="signupUserForm" name="signupUserForm" 
				onSubmit={this.handleSubmit}
				action="/signup" 
				method="POST" 
				className="mainForm">
	            <div className="form-group">
	           		<input id="first" className="form-control" type="text" name="first" placeholder="First Name"/>
								<input id="last" className="form-control" type="text" name="last" placeholder="Last Name"/>
	            </div>
	            <div className="form-group">
	           		<input id="email" className="form-control" type="text" name="email" placeholder="Email Address"/>
								<input id="phone" className="form-control" type="text" name="phone" placeholder="Phone Number"/>
	            </div>
	            <div className="form-group">
								<input id="pass" className="form-control" type="password" name="pass" placeholder="Password"/>
								<input id="pass2" className="form-control" type="password" name="pass2" placeholder="Retype Password"/>
	            </div>
	            <div className="form-group">
	            	<input id="invite" className="form-control" type="text" name="invite" placeholder="Invite Code"/>
	            </div>
	            <div className="form-group">
	              <div  className="offset-sm-2 col-sm-4">
									<input type="hidden" name="_csrf" value={this.props.csrf} />
	                <input className="formSubmit btn" type="submit" value="Sign Up Now!" />   
	              </div>
	            </div>
	          </form>
          </div>
	);
};
	
// Sets up the component for the page
const createSignupComp = function(csrf) {
	
	const SignupComp = React.createClass({
		handleSubmit: handleSignup,
		render: renderSignup
	});
	
	ReactDOM.render(
		<SignupComp csrf={csrf} />,
		document.querySelector("#userInfo")
	);
};


// Sets up the component for the page
const createLoginUserComp = function(csrf) {

	const LoginComp = React.createClass({
		handleSubmit: handleUserLogin,
		render: renderLogin
	});

	ReactDOM.render(
		<LoginComp csrf={csrf} />,
		document.querySelector("#userPopup")
	);
};
