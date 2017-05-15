
const renderServicesBar = function() {
	return (
		<div className="services">
			<h3>Our Services</h3>
			<div className="row">
				<div className="col-md-3 serviceIcon" id="delivery">
					<img src="assets/img/DeliveryIcon.png" />
					<h3>Delivery</h3>
				</div>
				<div className="col-md-3 serviceIcon" id="cleanup">
					<img src="assets/img/CleanIcon.png" />
					<h3>Tidy Up</h3>
				</div>
				<div className="col-md-3 serviceIcon" id="rides">
					<img src="assets/img/RideIcon.png" />
					<h3>Rides</h3>
				</div>
				<div className="col-md-3 serviceIcon" id="errands">
					<img src="assets/img/ErrandIcon.png" />
					<h3>Errands</h3>
				</div>
			</div>
			<div id="serviceExplained">
			</div>
		</div>
		);
};

const renderDeliverySection = () => (
	<div className="serviceExplanation jumbotron">
		<h4>Cannot get what you need from the supermarket?</h4>
		<p>Let us bring you what you need for the day, including over the counter medicine</p>
	</div>
	);

const renderCleanSection = () => (
	<div className="serviceExplanation jumbotron">
		<h4>Do not have the energy to tidy up?</h4>
		<p>Our workers will come over and do some light cleaning for you, like dishes or running some laundry</p>
	</div>
	);

const renderRidesSection = () => (
	<div className="serviceExplanation jumbotron">
		<h4>Need to be somewhere but cannot drive?</h4>
		<p>We will gladly pick you up! We will even come get you again to take you home</p>
	</div>
	);


const renderErrandsSection = () => (
	<div className="serviceExplanation jumbotron">
		<h4>Got some small things that just need to get done?</h4>
		<p>We can do it! Deliver a package, drop off some notes at your work, we have got it.</p>
	</div>
	);


const createServicesComp = function(csrf) {
	const ServicesComp = React.createClass({
		render: renderServicesBar
	});
	
	ReactDOM.render(
		<ServicesComp csrf={csrf} />,
		document.querySelector("#userServices")
		);
};

const createDeliveryComp = function(csrf) {
	const DeliveryComp = React.createClass({
		render: renderDeliverySection
	});

	ReactDOM.render(
		<DeliveryComp csrf={csrf} />,
		document.querySelector("#serviceExplained")
		);
};

const createCleanUpComp = function(csrf) {
	const CleanUpComp = React.createClass({
		render: renderCleanSection
	});

	ReactDOM.render(
		<CleanUpComp csrf={csrf} />,
		document.querySelector("#serviceExplained")
		);
};

const createRidesComp = function(csrf) {
	const RidesComp = React.createClass({
		render: renderRidesSection
	});

	ReactDOM.render(
		<RidesComp csrf={csrf} />,
		document.querySelector("#serviceExplained")
		);
};

const createErrandsComp = function(csrf) {
	const ErrandsComp = React.createClass({
		render: renderErrandsSection
	});

	ReactDOM.render(
		<ErrandsComp csrf={csrf} />,
		document.querySelector("#serviceExplained")
		);
};

const checkSelected = function(csrf) {
	const deliveryButton = document.querySelector("#delivery");
	const cleanupButton = document.querySelector("#cleanup");
	const ridesButton = document.querySelector("#rides");
	const errandsButton = document.querySelector("#errands");

	deliveryButton.addEventListener("click", (e) => {
		e.preventDefault();
		createDeliveryComp(csrf);
		return false;
	});

	cleanupButton.addEventListener("click", (e) => {
		e.preventDefault();
		createCleanUpComp(csrf);
		return false;
	})

	ridesButton.addEventListener("click", (e) => {
		e.preventDefault();
		createRidesComp(csrf);
		return false;
	});

	errandsButton.addEventListener("click", (e) => {
		e.preventDefault();
		createErrandsComp(csrf);
		return false;
	});

	createDeliveryComp(csrf);
};

const setup = function(csrf) {
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
	checkSelected(csrf);
	
}