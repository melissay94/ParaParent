const handleError = (message) => {
	$(".errorMessage").text(message);
};

const redirect = (response) => {
	window.location = response.redirect;
};

// Sends the request
const sendAjax = (type, action, data, success) => {
	$.ajax({
		cache: false, 
		type: type, 
		url: action, 
		data: data,
		dataType: "json",
		success: success,
		error: function(xhr, status, error) {
			var msgObj = JSON.parse(xhr.responseText);
			handleError(msgObj.error);
		}
	});
};

// Gets a csrf token to be used
const getToken = () => {
	sendAjax('GET', '/getToken', null, (result) => {
		setup(result.csrfToken);
	});
}

$(document).ready(function() {
	getToken();
});