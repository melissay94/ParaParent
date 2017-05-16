// Set up the nav bar 
const renderNavBar = function() {
	return (
		<div className="container">
				<div className="navbar-header">
					<h3 href="#" className="navbar-brand">ParaParent</h3>
				</div>
				<div className="collapse navbar-collapse">
					<ul className="nav navbar-nav">
						<li><a href="#userServices">Our Services</a></li>
						<li><a href="#whyUs">Why Us</a></li>
						<li id="loginLi"><a href="#loginModal" className="btn" id="login" data-toggle="modal">Login</a></li>
					</ul>
				</div>
			</div>
	);
};

// Set up the login modal
const renderLoginModal = function() {
	return (
			<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<ul className="nav row">
						<li className="nav-item col-sm-6">
							<a className="nav-link form-nav" id="userLoginButton" href="/signup">Customer</a>
						</li>
						<li className="nav-item col-sm-6">
							<a className="nav-link form-nav" id="wokerLoginButton" href="/apply">Worker</a>
						</li>
					</ul>
				</div>
				<div className="modal-body">
					<div id="userPopup"></div>
					<div className="errorMessage"></div>
				</div>
			</div>
		</div>
	);
};

// Set up the main form base
const renderMainForm = function() {
	return (
		<div>
			<div className="container-fluid">
				<ul className="nav row">
					<li className="nav-item col-sm-6">
						<a className="nav-link form-nav" id="signupButton" href="/signup">Sign Up</a>
					</li>
					<li className="nav-item col-sm-6">
						<a className="nav-link form-nav" id="applyButton" href="/apply">Apply to Us</a>
					</li>
				</ul>
			</div>
			<div id="userInfo" className="container">
			</div>
			<div className="errorMessage"></div>
		</div>
	);
};

// Set up all the buttons for the page and all the components
const setup = function(csrf) {
	
	// Set up the navbar
	const NavBarComp = React.createClass({
		render: renderNavBar
	});
	
	ReactDOM.render(
		<NavBarComp />,
		document.querySelector("#navigation")
	);
	
	// Set up the modal 
	const LoginModalComp = React.createClass({
		render: renderLoginModal
	});
	
	ReactDOM.render(
		<LoginModalComp />,
		document.querySelector("#loginModal")
	);
	
	// Set up the base form
	const MainFormComp = React.createClass({
		render: renderMainForm
	});
	
	ReactDOM.render(
		<MainFormComp />,
		document.querySelector("#mainForm")
	);
	
	const applyButton = document.querySelector("#applyButton");
	const signupButton = document.querySelector("#signupButton");
	const login = document.querySelector("#login");
	const loginCustomer = document.querySelector("#userLoginButton");
	const loginWorker = document.querySelector("#wokerLoginButton");
	
	applyButton.addEventListener("click", (e) => {
		e.preventDefault();
		createApplicationComp(csrf);
		return false;
	});
	
	signupButton.addEventListener("click", (e) => {
		e.preventDefault();
		createSignupComp(csrf);
		return false;
	});

	login.addEventListener("click", (e) => {
		e.preventDefault();
		createLoginUserComp(csrf);
		return false;
	});

	loginCustomer.addEventListener("click", (e) => {
		e.preventDefault();
		createLoginUserComp(csrf);
		return false;
	});

	loginWorker.addEventListener("click", (e) => {
		e.preventDefault();
		createLoginWorkerComp(csrf);
		return false;
	});
	
	createSignupComp(csrf);
	createServicesComp(csrf);
	checkSelected();
	
}