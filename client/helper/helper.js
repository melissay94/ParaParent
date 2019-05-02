const handleError = (message) => {
  $('.errorMessage').text(message);
};

const redirect = (response) => {
  window.location = response.redirect;
};

// Sends the request
const sendAjax = (type, action, data, success) => {
  $.ajax({
    cache: false,
    type,
    url: action,
    data,
    dataType: 'json',
    success,
    error(xhr) {
      const msgObj = JSON.parse(xhr.responseText);
      handleError(msgObj.error);
    },
  });
};

// Gets a csrf token to be used
const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(() => {
  getToken();
});
