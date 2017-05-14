
const renderServices = function() {
	return (
		<div className="services">
		</div>
	);
};

const setup = function(csrf) {
	const applyButton = document.querySelector("#applyButton");
	const signupButton = document.querySelector("#signupButton");
	
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
	
	createSignupComp(csrf);
	
}